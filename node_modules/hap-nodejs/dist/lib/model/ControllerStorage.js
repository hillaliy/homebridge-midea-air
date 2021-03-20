"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ControllerStorage = void 0;
var util_1 = __importDefault(require("util"));
var debug_1 = __importDefault(require("debug"));
var HAPStorage_1 = require("./HAPStorage");
var debug = debug_1.default("HAP-NodeJS:ControllerStorage");
var ControllerStorage = /** @class */ (function () {
    function ControllerStorage(accessory) {
        this.initialized = false;
        this.fileCreated = false;
        this.purgeUnidentifiedAccessoryData = true;
        // ---------------------------------------------------------
        this.trackedControllers = []; // used to track controllers before data was loaded from disk
        this.controllerData = {};
        this.accessoryUUID = accessory.UUID;
    }
    ControllerStorage.prototype.linkAccessory = function (accessory) {
        if (!this.linkedAccessories) {
            this.linkedAccessories = [];
        }
        var storage = accessory.controllerStorage;
        this.linkedAccessories.push(storage);
        storage.parent = this;
        var saved = this.restoredAccessories && this.restoredAccessories[accessory.UUID];
        if (this.initialized) {
            storage.init(saved);
        }
    };
    ControllerStorage.prototype.trackController = function (controller) {
        controller.setupStateChangeDelegate(this.handleStateChange.bind(this, controller)); // setup delegate
        if (!this.initialized) { // track controller if data isn't loaded yet
            this.trackedControllers.push(controller);
        }
        else {
            this.restoreController(controller);
        }
    };
    ControllerStorage.prototype.purgeControllerData = function (controller) {
        var _this = this;
        delete this.controllerData[controller.controllerType];
        if (this.initialized) {
            setTimeout(function () { return _this.save(); }, 0);
        }
    };
    ControllerStorage.prototype.handleStateChange = function (controller) {
        var _this = this;
        var serialized = controller.serialize();
        if (!serialized) { // can be undefined when controller wishes to delete data
            delete this.controllerData[controller.controllerType];
        }
        else {
            var controllerData = this.controllerData[controller.controllerType];
            if (!controllerData) {
                this.controllerData[controller.controllerType] = {
                    data: serialized,
                };
            }
            else {
                controllerData.data = serialized;
            }
        }
        if (this.initialized) { // only save if data was loaded
            // run save data "async", as handleStateChange call will probably always be caused by a http request
            // this should improve our response time
            setTimeout(function () { return _this.save(); }, 0);
        }
    };
    ControllerStorage.prototype.restoreController = function (controller) {
        if (!this.initialized) {
            throw new Error("Illegal state. Controller data wasn't loaded yet!");
        }
        var controllerData = this.controllerData[controller.controllerType];
        if (controllerData) {
            controller.deserialize(controllerData.data);
            controllerData.purgeOnNextLoad = false;
        }
    };
    /**
     * Called when this particular Storage object is feed with data loaded from disk.
     * This method is only called once.
     *
     * @param data - array of {@link StoredControllerData}. undefined if nothing was stored on disk for this particular storage object
     */
    ControllerStorage.prototype.init = function (data) {
        var _this = this;
        if (this.initialized) {
            throw new Error("ControllerStorage for accessory " + this.accessoryUUID + " was already initialized!");
        }
        this.initialized = true;
        // storing data into our local controllerData Record
        data && data.forEach(function (saved) { return _this.controllerData[saved.type] = saved.controllerData; });
        var restoredControllers = [];
        this.trackedControllers.forEach(function (controller) {
            _this.restoreController(controller);
            restoredControllers.push(controller.controllerType);
        });
        this.trackedControllers = []; // clear tracking list
        Object.entries(this.controllerData).forEach(function (_a) {
            var type = _a[0], data = _a[1];
            if (data.purgeOnNextLoad) {
                delete _this.controllerData[type];
                return;
            }
            if (!restoredControllers.includes(type)) {
                data.purgeOnNextLoad = true;
            }
        });
    };
    ControllerStorage.prototype.load = function (username) {
        if (this.username) {
            throw new Error("ControllerStorage was already loaded!");
        }
        this.username = username;
        var key = ControllerStorage.persistKey(username);
        var saved = HAPStorage_1.HAPStorage.storage().getItem(key);
        var ownData;
        if (saved) {
            this.fileCreated = true;
            ownData = saved.accessories[this.accessoryUUID];
            delete saved.accessories[this.accessoryUUID];
        }
        this.init(ownData);
        if (this.linkedAccessories) {
            this.linkedAccessories.forEach(function (linkedStorage) {
                var savedData = saved && saved.accessories[linkedStorage.accessoryUUID];
                linkedStorage.init(savedData);
                if (saved) {
                    delete saved.accessories[linkedStorage.accessoryUUID];
                }
            });
        }
        if (saved && Object.keys(saved.accessories).length > 0) {
            if (!this.purgeUnidentifiedAccessoryData) {
                this.restoredAccessories = saved.accessories; // save data for controllers which aren't linked yet
            }
            else {
                debug("Purging unidentified controller data for bridge %s", username);
            }
        }
    };
    ControllerStorage.prototype.save = function () {
        var _a;
        if (this.parent) {
            this.parent.save();
            return;
        }
        if (!this.initialized) {
            throw new Error("ControllerStorage has not yet been loaded!");
        }
        if (!this.username) {
            throw new Error("Cannot save controllerData for a storage without a username!");
        }
        var accessories = (_a = {},
            _a[this.accessoryUUID] = this.controllerData,
            _a);
        if (this.linkedAccessories) { // grab data from all linked storage objects
            this.linkedAccessories.forEach(function (accessory) { return accessories[accessory.accessoryUUID] = accessory.controllerData; });
        }
        var accessoryData = this.restoredAccessories || {};
        Object.entries(accessories).forEach(function (_a) {
            var uuid = _a[0], controllerData = _a[1];
            var entries = Object.entries(controllerData);
            if (entries.length > 0) {
                accessoryData[uuid] = entries.map(function (_a) {
                    var type = _a[0], data = _a[1];
                    return ({
                        type: type,
                        controllerData: data,
                    });
                });
            }
        });
        var key = ControllerStorage.persistKey(this.username);
        if (Object.keys(accessoryData).length > 0) {
            var saved = {
                accessories: accessoryData,
            };
            this.fileCreated = true;
            HAPStorage_1.HAPStorage.storage().setItemSync(key, saved);
        }
        else if (this.fileCreated) {
            this.fileCreated = false;
            HAPStorage_1.HAPStorage.storage().removeItemSync(key);
        }
    };
    ControllerStorage.persistKey = function (username) {
        return util_1.default.format("ControllerStorage.%s.json", username.replace(/:/g, "").toUpperCase());
    };
    ControllerStorage.remove = function (username) {
        var key = ControllerStorage.persistKey(username);
        HAPStorage_1.HAPStorage.storage().removeItemSync(key);
    };
    return ControllerStorage;
}());
exports.ControllerStorage = ControllerStorage;
//# sourceMappingURL=ControllerStorage.js.map