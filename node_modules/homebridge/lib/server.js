"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const fs_1 = __importDefault(require("fs"));
const node_persist_1 = __importDefault(require("node-persist"));
const chalk_1 = __importDefault(require("chalk"));
const qrcode_terminal_1 = __importDefault(require("qrcode-terminal"));
const hap_nodejs_1 = require("hap-nodejs");
const logger_1 = require("./logger");
const user_1 = require("./user");
const api_1 = require("./api");
const platformAccessory_1 = require("./platformAccessory");
const version_1 = __importDefault(require("./version"));
const mac = __importStar(require("./util/mac"));
const pluginManager_1 = require("./pluginManager");
const accessoryStorage = node_persist_1.default.create();
const log = logger_1.Logger.internal;
class Server {
    constructor(options = {}) {
        this.cachedPlatformAccessories = [];
        this.cachedAccessoriesFileCreated = false;
        this.publishedExternalAccessories = new Map();
        accessoryStorage.initSync({ dir: user_1.User.cachedAccessoryPath() }); // Setup Accessory Cache Storage
        this.config = options.config || Server._loadConfig();
        this.keepOrphanedCachedAccessories = options.keepOrphanedCachedAccessories || false;
        this.hideQRCode = options.hideQRCode || false;
        // Server is "secure by default", meaning it creates a top-level Bridge accessory that
        // will not allow unauthenticated requests. This matches the behavior of actual HomeKit
        // accessories. However you can set this to true to allow all requests without authentication,
        // which can be useful for easy hacking. Note that this will expose all functions of your
        // bridged accessories, like changing characteristics (i.e. flipping your lights on and off).
        this.allowInsecureAccess = options.insecureAccess || false;
        this.externalPorts = this.config.ports;
        this.api = new api_1.HomebridgeAPI(); // object we feed to Plugins
        this.api.on("registerPlatformAccessories" /* REGISTER_PLATFORM_ACCESSORIES */, this.handleRegisterPlatformAccessories.bind(this));
        this.api.on("updatePlatformAccessories" /* UPDATE_PLATFORM_ACCESSORIES */, this.handleUpdatePlatformAccessories.bind(this));
        this.api.on("unregisterPlatformAccessories" /* UNREGISTER_PLATFORM_ACCESSORIES */, this.handleUnregisterPlatformAccessories.bind(this));
        this.api.on("publishExternalAccessories" /* PUBLISH_EXTERNAL_ACCESSORIES */, this.handlePublishExternalAccessories.bind(this));
        const pluginManagerOptions = {
            activePlugins: this.config.plugins,
            customPluginPath: options.customPluginPath,
        };
        this.pluginManager = new pluginManager_1.PluginManager(this.api, pluginManagerOptions);
        this.bridge = new hap_nodejs_1.Bridge(this.config.bridge.name, hap_nodejs_1.uuid.generate("HomeBridge"));
    }
    async start() {
        const promises = [];
        this.loadCachedPlatformAccessoriesFromDisk();
        this.pluginManager.initializeInstalledPlugins();
        if (this.config.platforms.length > 0) {
            promises.push(...this.loadPlatforms());
        }
        if (this.config.accessories.length > 0) {
            this._loadAccessories();
        }
        this.restoreCachedPlatformAccessories();
        this.api.signalFinished();
        // wait for all platforms to publish their accessories before we publish the bridge
        await Promise.all(promises)
            .then(() => this.publishBridge());
    }
    publishBridge() {
        const bridgeConfig = this.config.bridge;
        const info = this.bridge.getService(hap_nodejs_1.Service.AccessoryInformation);
        info.setCharacteristic(hap_nodejs_1.Characteristic.Manufacturer, bridgeConfig.manufacturer || "homebridge.io");
        info.setCharacteristic(hap_nodejs_1.Characteristic.Model, bridgeConfig.model || "homebridge");
        info.setCharacteristic(hap_nodejs_1.Characteristic.SerialNumber, bridgeConfig.username);
        info.setCharacteristic(hap_nodejs_1.Characteristic.FirmwareRevision, version_1.default());
        this.bridge.on("listening" /* LISTENING */, (port) => {
            log.info("Homebridge is running on port %s.", port);
        });
        const publishInfo = {
            username: bridgeConfig.username,
            port: bridgeConfig.port,
            pincode: bridgeConfig.pin,
            category: 2 /* BRIDGE */,
            mdns: this.config.mdns,
        };
        if (bridgeConfig.setupID && bridgeConfig.setupID.length === 4) {
            publishInfo.setupID = bridgeConfig.setupID;
        }
        this.bridge.publish(publishInfo, this.allowInsecureAccess);
        this.printSetupInfo(publishInfo.pincode);
    }
    static _loadConfig() {
        // Look for the configuration file
        const configPath = user_1.User.configPath();
        const defaultBridge = {
            name: "Homebridge",
            username: "CC:22:3D:E3:CE:30",
            pin: "031-45-154",
        };
        if (!fs_1.default.existsSync(configPath)) {
            log.warn("config.json (%s) not found.", configPath);
            return {
                bridge: defaultBridge,
                accessories: [],
                platforms: [],
            };
        }
        let config;
        try {
            config = JSON.parse(fs_1.default.readFileSync(configPath, { encoding: "utf8" }));
        }
        catch (err) {
            log.error("There was a problem reading your config.json file.");
            log.error("Please try pasting your config.json file here to validate it: http://jsonlint.com");
            log.error("");
            throw err;
        }
        if (config.ports !== undefined) {
            if (config.ports.start && config.ports.end) {
                if (config.ports.start > config.ports.end) {
                    log.error("Invalid port pool configuration. End should be greater than or equal to start.");
                    config.ports = undefined;
                }
            }
            else {
                log.error("Invalid configuration for 'ports'. Missing 'start' and 'end' properties! Ignoring it!");
                config.ports = undefined;
            }
        }
        const bridge = config.bridge || defaultBridge;
        bridge.name = bridge.name || defaultBridge.name;
        bridge.username = bridge.username || defaultBridge.username;
        bridge.pin = bridge.pin || defaultBridge.pin;
        config.bridge = bridge;
        const username = config.bridge.username;
        if (!mac.validMacAddress(username)) {
            throw new Error(`Not a valid username: ${username}. Must be 6 pairs of colon-separated hexadecimal chars (A-F 0-9), like a MAC address.`);
        }
        config.accessories = config.accessories || [];
        config.platforms = config.platforms || [];
        log.info("Loaded config.json with %s accessories and %s platforms.", config.accessories.length, config.platforms.length);
        log.info("---");
        return config;
    }
    loadCachedPlatformAccessoriesFromDisk() {
        const cachedAccessories = accessoryStorage.getItem("cachedAccessories");
        if (cachedAccessories) {
            this.cachedPlatformAccessories = cachedAccessories.map(serialized => {
                return platformAccessory_1.PlatformAccessory.deserialize(serialized);
            });
            this.cachedAccessoriesFileCreated = true;
        }
    }
    restoreCachedPlatformAccessories() {
        this.cachedPlatformAccessories = this.cachedPlatformAccessories.filter(accessory => {
            let plugin = this.pluginManager.getPlugin(accessory._associatedPlugin);
            if (!plugin) { // a little explainer here. This section is basically here to resolve plugin name changes of dynamic platform plugins
                try {
                    // resolve platform accessories by searching for plugins which registered a dynamic platform for the given name
                    plugin = this.pluginManager.getPluginByActiveDynamicPlatform(accessory._associatedPlatform);
                    if (plugin) { // if it's undefined the no plugin was found
                        // could improve on this by calculating the Levenshtein distance to only allow platform ownership changes
                        // when something like a typo happened. Are there other reasons the name could change?
                        // And how would we define the threshold?
                        log.info("When searching for the associated plugin of the accessory '" + accessory.displayName + "' " +
                            "it seems like the plugin name changed from '" + accessory._associatedPlugin + "' to '" +
                            plugin.getPluginIdentifier() + "'. Plugin association is now being transformed!");
                        accessory._associatedPlugin = plugin.getPluginIdentifier(); // update the assosicated plugin to the new one
                    }
                }
                catch (error) { // error is thrown if multiple plugins where found for the given platform name
                    log.info("Could not find the associated plugin for the accessory '" + accessory.displayName + "'. " +
                        "Tried to find the plugin by the platform name but " + error.message);
                }
            }
            const platformPlugins = plugin && plugin.getActiveDynamicPlatform(accessory._associatedPlatform);
            if (!platformPlugins) {
                log.info(`Failed to find plugin to handle accessory ${accessory._associatedHAPAccessory.displayName}`);
                if (!this.keepOrphanedCachedAccessories) {
                    log.info(`Removing orphaned accessory ${accessory._associatedHAPAccessory.displayName}`);
                    return false; // filter it from the list
                }
            }
            else {
                // we set the current plugin version before configureAccessory is called, so the dev has the opportunity to override it
                accessory.getService(hap_nodejs_1.Service.AccessoryInformation)
                    .setCharacteristic(hap_nodejs_1.Characteristic.FirmwareRevision, plugin.version);
                platformPlugins.configureAccessory(accessory);
            }
            this.bridge.addBridgedAccessory(accessory._associatedHAPAccessory);
            return true; // keep it in the list
        });
    }
    saveCachedPlatformAccessoriesOnDisk() {
        if (this.cachedPlatformAccessories.length > 0) {
            this.cachedAccessoriesFileCreated = true;
            const serializedAccessories = this.cachedPlatformAccessories.map(accessory => platformAccessory_1.PlatformAccessory.serialize(accessory));
            accessoryStorage.setItemSync("cachedAccessories", serializedAccessories);
        }
        else if (this.cachedAccessoriesFileCreated) {
            this.cachedAccessoriesFileCreated = false;
            accessoryStorage.removeItemSync("cachedAccessories");
        }
    }
    _loadAccessories() {
        log.info("Loading " + this.config.accessories.length + " accessories...");
        this.config.accessories.forEach((accessoryConfig, index) => {
            if (!accessoryConfig.accessory) {
                log.warn("Your config.json contains an illegal accessory configuration object at position %d. " +
                    "Missing property 'accessory'. Skipping entry...", index + 1); // we rather count from 1 for the normal people?
                return;
            }
            const accessoryIdentifier = accessoryConfig.accessory;
            const displayName = accessoryConfig.name;
            if (!displayName) {
                log.warn("Could not load accessory %s at position %d as it is missing the required 'name' property!", accessoryIdentifier, index + 1);
                return;
            }
            let plugin;
            let constructor;
            try {
                plugin = this.pluginManager.getPluginForAccessory(accessoryIdentifier);
                constructor = plugin.getAccessoryConstructor(accessoryIdentifier);
            }
            catch (error) {
                log.warn("Error loading accessory requested in your config.json at position %d", index + 1);
                throw error; // error message contains more information
            }
            const logger = logger_1.Logger.withPrefix(displayName);
            logger("Initializing %s accessory...", accessoryIdentifier);
            const accessoryInstance = new constructor(logger, accessoryConfig, this.api);
            //pass accessoryIdentifier for UUID generation, and optional parameter uuid_base which can be used instead of displayName for UUID generation
            const accessory = this.createHAPAccessory(plugin, accessoryInstance, displayName, accessoryIdentifier, accessoryConfig.uuid_base);
            if (accessory) {
                this.bridge.addBridgedAccessory(accessory);
            }
            else {
                logger("Accessory %s returned empty set of services. Won't adding it to the bridge!", accessoryIdentifier);
            }
        });
    }
    loadPlatforms() {
        log.info("Loading " + this.config.platforms.length + " platforms...");
        const promises = [];
        this.config.platforms.forEach((platformConfig, index) => {
            if (!platformConfig.platform) {
                log.warn("Your config.json contains an illegal platform configuration object at position %d. " +
                    "Missing property 'platform'. Skipping entry...", index + 1); // we rather count from 1 for the normal people?
                return;
            }
            const platformIdentifier = platformConfig.platform;
            const displayName = platformConfig.name || platformIdentifier;
            let plugin;
            let constructor;
            try {
                plugin = this.pluginManager.getPluginForPlatform(platformIdentifier);
                constructor = plugin.getPlatformConstructor(platformIdentifier);
            }
            catch (error) {
                log.warn("Error loading platform requested in your config.json at position %d", index + 1);
                throw error; // error message contains more information
            }
            const logger = logger_1.Logger.withPrefix(displayName);
            logger("Initializing %s platform...", platformIdentifier);
            const platform = new constructor(logger, platformConfig, this.api);
            if (api_1.HomebridgeAPI.isDynamicPlatformPlugin(platform)) {
                plugin.assignDynamicPlatform(platformIdentifier, platform);
            }
            else if (api_1.HomebridgeAPI.isStaticPlatformPlugin(platform)) { // Plugin 1.0, load accessories
                promises.push(this.loadPlatformAccessories(plugin, platform, platformIdentifier, logger));
            }
            else {
                // otherwise it's a IndependentPlatformPlugin which doesn't expose any methods at all.
                // We just call the constructor and let it be enabled.
            }
        });
        return promises;
    }
    async loadPlatformAccessories(plugin, platformInstance, platformType, logger) {
        // Plugin 1.0, load accessories
        return new Promise(resolve => {
            platformInstance.accessories(hap_nodejs_1.once((accessories) => {
                // loop through accessories adding them to the list and registering them
                accessories.forEach((accessoryInstance, index) => {
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    const accessoryName = accessoryInstance.name; // assume this property was set
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    const uuidBase = accessoryInstance.uuid_base; // optional base uuid
                    log.info("Initializing platform accessory '%s'...", accessoryName);
                    const accessory = this.createHAPAccessory(plugin, accessoryInstance, accessoryName, platformType, uuidBase);
                    if (accessory) {
                        this.bridge.addBridgedAccessory(accessory);
                    }
                    else {
                        logger("Platform %s returned an accessory at index %d with an empty set of services. Won't adding it to the bridge!", platformType, index);
                    }
                });
                resolve();
            }));
        });
    }
    createHAPAccessory(plugin, accessoryInstance, displayName, accessoryType, uuidBase) {
        const services = (accessoryInstance.getServices() || [])
            .filter(service => !!service); // filter out undefined values; a common mistake
        const controllers = (accessoryInstance.getControllers && accessoryInstance.getControllers() || [])
            .filter(controller => !!controller);
        if (services.length === 0 && controllers.length === 0) { // check that we only add valid accessory with at least one service
            return undefined;
        }
        if (!(services[0] instanceof hap_nodejs_1.Service)) {
            // The returned "services" for this accessory is assumed to be the old style: a big array
            // of JSON-style objects that will need to be parsed by HAP-NodeJS's AccessoryLoader.
            return hap_nodejs_1.AccessoryLoader.parseAccessoryJSON({
                displayName: displayName,
                services: services,
            });
        }
        else {
            // The returned "services" for this accessory are simply an array of new-API-style
            // Service instances which we can add to a created HAP-NodeJS Accessory directly.
            const accessoryUUID = hap_nodejs_1.uuid.generate(accessoryType + ":" + (uuidBase || displayName));
            const accessory = new hap_nodejs_1.Accessory(displayName, accessoryUUID);
            // listen for the identify event if the accessory instance has defined an identify() method
            if (accessoryInstance.identify) {
                accessory.on("identify" /* IDENTIFY */, (paired, callback) => {
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    // eslint-disable-next-line @typescript-eslint/no-empty-function
                    accessoryInstance.identify(() => { }); // empty callback for backwards compatibility
                    callback();
                });
            }
            const informationService = accessory.getService(hap_nodejs_1.Service.AccessoryInformation);
            services.forEach(service => {
                // if you returned an AccessoryInformation service, merge its values with ours
                if (service instanceof hap_nodejs_1.Service.AccessoryInformation) {
                    service.setCharacteristic(hap_nodejs_1.Characteristic.Name, displayName); // ensure display name is set
                    // ensure the plugin has not hooked already some listeners (some weird ones do).
                    // Otherwise they would override our identify listener registered by the HAP-NodeJS accessory
                    service.getCharacteristic(hap_nodejs_1.Characteristic.Identify).removeAllListeners("set" /* SET */);
                    // pull out any values and listeners (get and set) you may have defined
                    informationService.replaceCharacteristicsFromService(service);
                }
                else {
                    accessory.addService(service);
                }
            });
            if (informationService.getCharacteristic(hap_nodejs_1.Characteristic.FirmwareRevision).value === "0.0.0") {
                // overwrite the default value with the actual plugin version
                informationService.setCharacteristic(hap_nodejs_1.Characteristic.FirmwareRevision, plugin.version);
            }
            controllers.forEach(controller => {
                accessory.configureController(controller);
            });
            return accessory;
        }
    }
    handleRegisterPlatformAccessories(accessories) {
        const hapAccessories = accessories.map(accessory => {
            this.cachedPlatformAccessories.push(accessory);
            const plugin = this.pluginManager.getPlugin(accessory._associatedPlugin);
            if (plugin) {
                const informationService = accessory.getService(hap_nodejs_1.Service.AccessoryInformation);
                if (informationService.getCharacteristic(hap_nodejs_1.Characteristic.FirmwareRevision).value === "0.0.0") {
                    // overwrite the default value with the actual plugin version
                    informationService.setCharacteristic(hap_nodejs_1.Characteristic.FirmwareRevision, plugin.version);
                }
                const platforms = plugin.getActiveDynamicPlatform(accessory._associatedPlatform);
                if (!platforms) {
                    log.warn("The plugin '%s' registered a new accessory for the platform '%s'. The platform couldn't be found though!", accessory._associatedPlugin, accessory._associatedPlatform);
                }
            }
            else {
                log.warn("A platform configured a new accessory under the plugin name '%s'. However no loaded plugin could be found for the name!", accessory._associatedPlugin);
            }
            return accessory._associatedHAPAccessory;
        });
        this.bridge.addBridgedAccessories(hapAccessories);
        this.saveCachedPlatformAccessoriesOnDisk();
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    handleUpdatePlatformAccessories(accessories) {
        // Update persisted accessories
        this.saveCachedPlatformAccessoriesOnDisk();
    }
    handleUnregisterPlatformAccessories(accessories) {
        const hapAccessories = accessories.map(accessory => {
            const index = this.cachedPlatformAccessories.indexOf(accessory);
            if (index >= 0) {
                this.cachedPlatformAccessories.splice(index, 1);
            }
            return accessory._associatedHAPAccessory;
        });
        this.bridge.removeBridgedAccessories(hapAccessories);
        this.saveCachedPlatformAccessoriesOnDisk();
    }
    handlePublishExternalAccessories(accessories) {
        const accessoryPin = this.config.bridge.pin;
        accessories.forEach(accessory => {
            let accessoryPort = 0;
            if (this.externalPorts) {
                if (this.nextExternalPort === undefined) {
                    this.nextExternalPort = this.externalPorts.start;
                }
                if (this.nextExternalPort <= this.externalPorts.end) {
                    accessoryPort = this.nextExternalPort++;
                }
                else {
                    // accessoryPort is still zero
                    log.warn("External port pool ran out of ports. Fallback to random assign.");
                }
            }
            const hapAccessory = accessory._associatedHAPAccessory;
            const advertiseAddress = mac.generate(hapAccessory.UUID);
            if (this.publishedExternalAccessories.has(advertiseAddress)) {
                throw new Error(`Accessory ${hapAccessory.displayName} experienced an address collision.`);
            }
            else {
                this.publishedExternalAccessories.set(advertiseAddress, accessory);
            }
            const plugin = this.pluginManager.getPlugin(accessory._associatedPlugin);
            if (plugin) {
                const informationService = hapAccessory.getService(hap_nodejs_1.Service.AccessoryInformation);
                if (informationService.getCharacteristic(hap_nodejs_1.Characteristic.FirmwareRevision).value === "0.0.0") {
                    // overwrite the default value with the actual plugin version
                    informationService.setCharacteristic(hap_nodejs_1.Characteristic.FirmwareRevision, plugin.version);
                }
            }
            else if (pluginManager_1.PluginManager.isQualifiedPluginIdentifier(accessory._associatedPlugin)) { // we did already complain in api.ts if it wasn't a qualified name
                log.warn("A platform configured a external accessory under the plugin name '%s'. However no loaded plugin could be found for the name!", accessory._associatedPlugin);
            }
            hapAccessory.on("listening" /* LISTENING */, (port) => {
                log.info("%s is running on port %s.", hapAccessory.displayName, port);
                log.info("Please add [%s] manually in Home app. Setup Code: %s", hapAccessory.displayName, accessoryPin);
            });
            hapAccessory.publish({
                username: advertiseAddress,
                pincode: accessoryPin,
                category: accessory.category,
                port: accessoryPort,
                mdns: this.config.mdns,
            }, this.allowInsecureAccess);
        });
    }
    teardown() {
        this.saveCachedPlatformAccessoriesOnDisk();
        this.bridge.unpublish();
        for (const accessory of this.publishedExternalAccessories.values()) {
            accessory._associatedHAPAccessory.unpublish();
        }
        this.api.signalShutdown();
    }
    printSetupInfo(pin) {
        console.log("Setup Payload:");
        console.log(this.bridge.setupURI());
        if (!this.hideQRCode) {
            console.log("Scan this code with your HomeKit app on your iOS device to pair with Homebridge:");
            qrcode_terminal_1.default.setErrorLevel("M"); // HAP specifies level M or higher for ECC
            qrcode_terminal_1.default.generate(this.bridge.setupURI());
            console.log("Or enter this code with your HomeKit app on your iOS device to pair with Homebridge:");
        }
        else {
            console.log("Enter this code with your HomeKit app on your iOS device to pair with Homebridge:");
        }
        console.log(chalk_1.default.black.bgWhite("                       "));
        console.log(chalk_1.default.black.bgWhite("    ┌────────────┐     "));
        console.log(chalk_1.default.black.bgWhite("    │ " + pin + " │     "));
        console.log(chalk_1.default.black.bgWhite("    └────────────┘     "));
        console.log(chalk_1.default.black.bgWhite("                       "));
    }
}
exports.Server = Server;
//# sourceMappingURL=server.js.map