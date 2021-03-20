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
exports.HomebridgeAPI = exports.InternalAPIEvent = exports.APIEvent = exports.PluginType = void 0;
const events_1 = require("events");
const hapNodeJs = __importStar(require("hap-nodejs"));
const version_1 = __importDefault(require("./version"));
const platformAccessory_1 = require("./platformAccessory");
const user_1 = require("./user");
const logger_1 = require("./logger");
const pluginManager_1 = require("./pluginManager");
const log = logger_1.Logger.internal;
var PluginType;
(function (PluginType) {
    PluginType["ACCESSORY"] = "accessory";
    PluginType["PLATFORM"] = "platform";
})(PluginType = exports.PluginType || (exports.PluginType = {}));
var APIEvent;
(function (APIEvent) {
    /**
     * Event is fired once homebridge has finished with booting up and initializing all components and plugins.
     * When this event is fired it is possible that the Bridge accessory isn't published yet, if homebridge still needs
     * to wait for some {@see StaticPlatformPlugin | StaticPlatformPlugins} to finish accessory creation.
     */
    APIEvent["DID_FINISH_LAUNCHING"] = "didFinishLaunching";
    /**
     * This event is fired when homebridge got shutdown. This could be a regular shutdown or a unexpected crash.
     * At this stage all Accessories are already unpublished and all PlatformAccessories are already saved to disk!
     */
    APIEvent["SHUTDOWN"] = "shutdown";
})(APIEvent = exports.APIEvent || (exports.APIEvent = {}));
var InternalAPIEvent;
(function (InternalAPIEvent) {
    InternalAPIEvent["REGISTER_ACCESSORY"] = "registerAccessory";
    InternalAPIEvent["REGISTER_PLATFORM"] = "registerPlatform";
    InternalAPIEvent["PUBLISH_EXTERNAL_ACCESSORIES"] = "publishExternalAccessories";
    InternalAPIEvent["REGISTER_PLATFORM_ACCESSORIES"] = "registerPlatformAccessories";
    InternalAPIEvent["UPDATE_PLATFORM_ACCESSORIES"] = "updatePlatformAccessories";
    InternalAPIEvent["UNREGISTER_PLATFORM_ACCESSORIES"] = "unregisterPlatformAccessories";
})(InternalAPIEvent = exports.InternalAPIEvent || (exports.InternalAPIEvent = {}));
class HomebridgeAPI extends events_1.EventEmitter {
    // ------------------------------------------------------------------------
    constructor() {
        super();
        this.version = 2.6; // homebridge API version
        this.serverVersion = version_1.default(); // homebridge node module version
        // ------------------ LEGACY EXPORTS FOR PRE TYPESCRIPT  ------------------
        this.user = user_1.User;
        this.hap = hapNodeJs;
        this.hapLegacyTypes = hapNodeJs.LegacyTypes; // used for older accessories/platforms
        this.platformAccessory = platformAccessory_1.PlatformAccessory;
    }
    static isDynamicPlatformPlugin(platformPlugin) {
        return "configureAccessory" in platformPlugin;
    }
    static isStaticPlatformPlugin(platformPlugin) {
        return "accessories" in platformPlugin;
    }
    signalFinished() {
        this.emit("didFinishLaunching" /* DID_FINISH_LAUNCHING */);
    }
    signalShutdown() {
        this.emit("shutdown" /* SHUTDOWN */);
    }
    registerAccessory(pluginIdentifier, accessoryName, constructor) {
        if (typeof accessoryName === "function") {
            constructor = accessoryName;
            accessoryName = pluginIdentifier;
            this.emit("registerAccessory" /* REGISTER_ACCESSORY */, accessoryName, constructor);
        }
        else {
            this.emit("registerAccessory" /* REGISTER_ACCESSORY */, accessoryName, constructor, pluginIdentifier);
        }
    }
    registerPlatform(pluginIdentifier, platformName, constructor) {
        if (typeof platformName === "function") {
            constructor = platformName;
            platformName = pluginIdentifier;
            this.emit("registerPlatform" /* REGISTER_PLATFORM */, platformName, constructor);
        }
        else {
            this.emit("registerPlatform" /* REGISTER_PLATFORM */, platformName, constructor, pluginIdentifier);
        }
    }
    publishCameraAccessories(pluginIdentifier, accessories) {
        this.publishExternalAccessories(pluginIdentifier, accessories);
    }
    publishExternalAccessories(pluginIdentifier, accessories) {
        if (!pluginManager_1.PluginManager.isQualifiedPluginIdentifier(pluginIdentifier)) {
            log.info(`One of your plugins incorrectly registered an external accessory using the platform name (${pluginIdentifier}) and not the plugin identifier. Please report this to the developer!`);
        }
        accessories.forEach(accessory => {
            // noinspection SuspiciousTypeOfGuard
            if (!(accessory instanceof platformAccessory_1.PlatformAccessory)) {
                throw new Error(`${pluginIdentifier} attempt to register an accessory that isn't PlatformAccessory!`);
            }
            accessory._associatedPlugin = pluginIdentifier;
        });
        this.emit("publishExternalAccessories" /* PUBLISH_EXTERNAL_ACCESSORIES */, accessories);
    }
    registerPlatformAccessories(pluginIdentifier, platformName, accessories) {
        accessories.forEach(accessory => {
            // noinspection SuspiciousTypeOfGuard
            if (!(accessory instanceof platformAccessory_1.PlatformAccessory)) {
                throw new Error(`${pluginIdentifier} - ${platformName} attempt to register an accessory that isn't PlatformAccessory!`);
            }
            accessory._associatedPlugin = pluginIdentifier;
            accessory._associatedPlatform = platformName;
        });
        this.emit("registerPlatformAccessories" /* REGISTER_PLATFORM_ACCESSORIES */, accessories);
    }
    updatePlatformAccessories(accessories) {
        this.emit("updatePlatformAccessories" /* UPDATE_PLATFORM_ACCESSORIES */, accessories);
    }
    unregisterPlatformAccessories(pluginIdentifier, platformName, accessories) {
        accessories.forEach(accessory => {
            // noinspection SuspiciousTypeOfGuard
            if (!(accessory instanceof platformAccessory_1.PlatformAccessory)) {
                throw new Error(`${pluginIdentifier} - ${platformName} attempt to unregister an accessory that isn't PlatformAccessory!`);
            }
        });
        this.emit("unregisterPlatformAccessories" /* UNREGISTER_PLATFORM_ACCESSORIES */, accessories);
    }
}
exports.HomebridgeAPI = HomebridgeAPI;
//# sourceMappingURL=api.js.map