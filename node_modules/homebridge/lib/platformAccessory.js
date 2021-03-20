"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlatformAccessory = exports.PlatformAccessoryEvent = void 0;
const events_1 = require("events");
const hap_nodejs_1 = require("hap-nodejs");
var PlatformAccessoryEvent;
(function (PlatformAccessoryEvent) {
    PlatformAccessoryEvent["IDENTIFY"] = "identify";
})(PlatformAccessoryEvent = exports.PlatformAccessoryEvent || (exports.PlatformAccessoryEvent = {}));
class PlatformAccessory extends events_1.EventEmitter {
    constructor(displayName, uuid, category) {
        super();
        this.services = [];
        /**
         * @deprecated reachability has no effect and isn't supported anymore
         */
        this.reachable = false;
        // ------------------------------------------------------
        /**
         * This is a way for Plugin developers to store custom data with their accessory
         */
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        this.context = {}; // providing something to store
        this._associatedHAPAccessory = PlatformAccessory.injectedAccessory
            ? PlatformAccessory.injectedAccessory
            : new hap_nodejs_1.Accessory(displayName, uuid);
        if (category) {
            this._associatedHAPAccessory.category = category;
        }
        this.displayName = this._associatedHAPAccessory.displayName;
        this.UUID = this._associatedHAPAccessory.UUID;
        this.category = category || 1 /* OTHER */;
        this.services = this._associatedHAPAccessory.services;
        // forward identify event
        this._associatedHAPAccessory.on("identify" /* IDENTIFY */, (paired, callback) => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            this.emit("identify" /* IDENTIFY */, paired, () => { }); // empty callback for backwards compatibility
            callback();
        });
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    addService(service, ...constructorArgs) {
        return this._associatedHAPAccessory.addService(service, ...constructorArgs);
    }
    removeService(service) {
        this._associatedHAPAccessory.removeService(service);
    }
    getService(name) {
        return this._associatedHAPAccessory.getService(name);
    }
    /**
     *
     * @param uuid
     * @param subType
     * @deprecated use {@link getServiceById} directly
     */
    getServiceByUUIDAndSubType(uuid, subType) {
        return this.getServiceById(uuid, subType);
    }
    getServiceById(uuid, subType) {
        return this._associatedHAPAccessory.getServiceById(uuid, subType);
    }
    /**
     *
     * @param reachable
     * @deprecated reachability has no effect and isn't supported anymore
     */
    updateReachability(reachable) {
        this.reachable = reachable;
    }
    /**
     *
     * @param cameraSource
     * @deprecated see {@link Accessory.configureCameraSource}
     */
    configureCameraSource(cameraSource) {
        return this._associatedHAPAccessory.configureCameraSource(cameraSource);
    }
    configureController(controller) {
        this._associatedHAPAccessory.configureController(controller);
    }
    // private
    static serialize(accessory) {
        return {
            plugin: accessory._associatedPlugin,
            platform: accessory._associatedPlatform,
            context: accessory.context,
            ...hap_nodejs_1.Accessory.serialize(accessory._associatedHAPAccessory),
        };
    }
    static deserialize(json) {
        const accessory = hap_nodejs_1.Accessory.deserialize(json);
        PlatformAccessory.injectedAccessory = accessory;
        const platformAccessory = new PlatformAccessory(accessory.displayName, accessory.UUID);
        PlatformAccessory.injectedAccessory = undefined;
        platformAccessory._associatedPlugin = json.plugin;
        platformAccessory._associatedPlatform = json.platform;
        platformAccessory.context = json.context;
        platformAccessory.category = json.category;
        return platformAccessory;
    }
}
exports.PlatformAccessory = PlatformAccessory;
//# sourceMappingURL=platformAccessory.js.map