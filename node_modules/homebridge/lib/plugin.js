"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Plugin = void 0;
const path_1 = __importDefault(require("path"));
const assert_1 = __importDefault(require("assert"));
const semver_1 = require("semver");
const version_1 = __importDefault(require("./version"));
const logger_1 = require("./logger");
const pluginManager_1 = require("./pluginManager");
const log = logger_1.Logger.internal;
/**
 * Represents a loaded Homebridge plugin.
 */
class Plugin {
    constructor(name, path, packageJSON, scope) {
        this.registeredAccessories = new Map();
        this.registeredPlatforms = new Map();
        this.activeDynamicPlatforms = new Map();
        this.pluginName = name;
        this.scope = scope;
        this.pluginPath = path;
        this.version = packageJSON.version || "0.0.0";
        this.main = packageJSON.main || "./index.js"; // figure out the main module - index.js unless otherwise specified
        // very temporary fix for first wave of plugins
        if (packageJSON.peerDependencies && (!packageJSON.engines || !packageJSON.engines.homebridge)) {
            packageJSON.engines = packageJSON.engines || {};
            packageJSON.engines.homebridge = packageJSON.peerDependencies.homebridge;
        }
        this.loadContext = {
            engines: packageJSON.engines,
            dependencies: packageJSON.dependencies,
        };
    }
    getPluginIdentifier() {
        return (this.scope ? this.scope + "/" : "") + this.pluginName;
    }
    getPluginPath() {
        return this.pluginPath;
    }
    registerAccessory(name, constructor) {
        if (this.registeredAccessories.has(name)) {
            throw new Error(`Plugin '${this.getPluginIdentifier()}' tried to register an accessory '${name}' which has already been registered!`);
        }
        log.info("Registering accessory '%s'", this.getPluginIdentifier() + "." + name);
        this.registeredAccessories.set(name, constructor);
    }
    registerPlatform(name, constructor) {
        if (this.registeredPlatforms.has(name)) {
            throw new Error(`Plugin '${this.getPluginIdentifier()}' tried to register a platform '${name}' which has already been registered!`);
        }
        log.info("Registering platform '%s'", this.getPluginIdentifier() + "." + name);
        this.registeredPlatforms.set(name, constructor);
    }
    getAccessoryConstructor(accessoryIdentifier) {
        const name = pluginManager_1.PluginManager.getAccessoryName(accessoryIdentifier);
        const constructor = this.registeredAccessories.get(name);
        if (!constructor) {
            throw new Error(`The requested accessory '${name}' was not registered by the plugin '${this.getPluginIdentifier()}'.`);
        }
        return constructor;
    }
    getPlatformConstructor(platformIdentifier) {
        const name = pluginManager_1.PluginManager.getPlatformName(platformIdentifier);
        const constructor = this.registeredPlatforms.get(name);
        if (!constructor) {
            throw new Error(`The requested platform '${name}' was not registered by the plugin '${this.getPluginIdentifier()}'.`);
        }
        if (this.activeDynamicPlatforms.has(name)) { // if it's a dynamic platform check that it is not enabled multiple times
            log.error("The dynamic platform " + name + " from the plugin " + this.getPluginIdentifier() + " seems to be configured " +
                "multiple times in your config.json. This behaviour was deprecated in homebridge v1.0.0 and will be removed in v2.0.0!");
        }
        return constructor;
    }
    assignDynamicPlatform(platformIdentifier, platformPlugin) {
        const name = pluginManager_1.PluginManager.getPlatformName(platformIdentifier);
        let platforms = this.activeDynamicPlatforms.get(name);
        if (!platforms) {
            platforms = [];
            this.activeDynamicPlatforms.set(name, platforms);
        }
        // the last platform published should be at the first position for easy access
        // we just try to mimic pre 1.0.0 behavior
        platforms.unshift(platformPlugin);
    }
    getActiveDynamicPlatform(platformName) {
        const platforms = this.activeDynamicPlatforms.get(platformName);
        // we always use the last registered
        return platforms && platforms[0];
    }
    load() {
        const context = this.loadContext;
        assert_1.default(context, "Reached illegal state. Plugin state is undefined!");
        this.loadContext = undefined; // free up memory
        // pluck out the HomeBridge version requirement
        if (!context.engines || !context.engines.homebridge) {
            throw new Error(`Plugin ${this.pluginPath} does not contain the 'homebridge' package in 'engines'.`);
        }
        const versionRequired = context.engines.homebridge;
        const nodeVersionRequired = context.engines.node;
        // make sure the version is satisfied by the currently running version of HomeBridge
        if (!semver_1.satisfies(version_1.default(), versionRequired, { includePrerelease: true })) {
            // TODO - change this back to an error
            log.error(`The plugin "${this.pluginName}" requires a Homebridge version of ${versionRequired} which does \
not satisfy the current Homebridge version of ${version_1.default()}. You may need to update this plugin (or Homebridge) to a newer version. \
You may face unexpected issues or stability problems running this plugin.`);
        }
        // make sure the version is satisfied by the currently running version of Node
        if (nodeVersionRequired && !semver_1.satisfies(process.version, nodeVersionRequired)) {
            log.warn(`The plugin "${this.pluginName}" requires Node version of ${nodeVersionRequired} which does \
not satisfy the current Node version of ${process.version}. You may need to upgrade your installation of Node.`);
        }
        const dependencies = context.dependencies || {};
        if (dependencies.homebridge || dependencies["hap-nodejs"]) {
            log.error(`The plugin "${this.pluginName}" defines 'homebridge' and/or 'hap-nodejs' in their 'dependencies' section, \
meaning they carry an additional copy of homebridge and hap-nodejs. This not only wastes disk space, but also can cause \
major incompatibility issues and thus is considered bad practice. Please inform the developer to update their plugin!`);
        }
        const mainPath = path_1.default.join(this.pluginPath, this.main);
        // try to require() it and grab the exported initialization hook
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const pluginModules = require(mainPath);
        if (typeof pluginModules === "function") {
            this.pluginInitializer = pluginModules;
        }
        else if (pluginModules && typeof pluginModules.default === "function") {
            this.pluginInitializer = pluginModules.default;
        }
        else {
            throw new Error(`Plugin ${this.pluginPath} does not export a initializer function from main.`);
        }
    }
    initialize(api) {
        if (!this.pluginInitializer) {
            throw new Error("Tried to initialize a plugin which hasn't been loaded yet!");
        }
        this.pluginInitializer(api);
    }
}
exports.Plugin = Plugin;
//# sourceMappingURL=plugin.js.map