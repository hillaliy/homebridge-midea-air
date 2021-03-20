"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
exports.Accessory = exports.ResourceTypes = exports.AccessoryEventTypes = exports.Categories = void 0;
var crypto_1 = __importDefault(require("crypto"));
var debug_1 = __importDefault(require("debug"));
var uuid = __importStar(require("./util/uuid"));
var clone_1 = require("./util/clone");
var Service_1 = require("./Service");
var Characteristic_1 = require("./Characteristic");
var Advertiser_1 = require("./Advertiser");
var HAPServer_1 = require("./HAPServer");
var AccessoryInfo_1 = require("./model/AccessoryInfo");
var IdentifierCache_1 = require("./model/IdentifierCache");
// noinspection JSDeprecatedSymbols
var camera_1 = require("./camera");
var EventEmitter_1 = require("./EventEmitter");
var controller_1 = require("./controller");
var HomeKit_1 = require("./gen/HomeKit");
var ControllerStorage_1 = require("./model/ControllerStorage");
var debug = debug_1.default('HAP-NodeJS:Accessory');
var MAX_ACCESSORIES = 149; // Maximum number of bridged accessories per bridge.
var MAX_SERVICES = 100;
// Known category values. Category is a hint to iOS clients about what "type" of Accessory this represents, for UI only.
var Categories;
(function (Categories) {
    Categories[Categories["OTHER"] = 1] = "OTHER";
    Categories[Categories["BRIDGE"] = 2] = "BRIDGE";
    Categories[Categories["FAN"] = 3] = "FAN";
    Categories[Categories["GARAGE_DOOR_OPENER"] = 4] = "GARAGE_DOOR_OPENER";
    Categories[Categories["LIGHTBULB"] = 5] = "LIGHTBULB";
    Categories[Categories["DOOR_LOCK"] = 6] = "DOOR_LOCK";
    Categories[Categories["OUTLET"] = 7] = "OUTLET";
    Categories[Categories["SWITCH"] = 8] = "SWITCH";
    Categories[Categories["THERMOSTAT"] = 9] = "THERMOSTAT";
    Categories[Categories["SENSOR"] = 10] = "SENSOR";
    Categories[Categories["ALARM_SYSTEM"] = 11] = "ALARM_SYSTEM";
    Categories[Categories["SECURITY_SYSTEM"] = 11] = "SECURITY_SYSTEM";
    Categories[Categories["DOOR"] = 12] = "DOOR";
    Categories[Categories["WINDOW"] = 13] = "WINDOW";
    Categories[Categories["WINDOW_COVERING"] = 14] = "WINDOW_COVERING";
    Categories[Categories["PROGRAMMABLE_SWITCH"] = 15] = "PROGRAMMABLE_SWITCH";
    Categories[Categories["RANGE_EXTENDER"] = 16] = "RANGE_EXTENDER";
    Categories[Categories["CAMERA"] = 17] = "CAMERA";
    Categories[Categories["IP_CAMERA"] = 17] = "IP_CAMERA";
    Categories[Categories["VIDEO_DOORBELL"] = 18] = "VIDEO_DOORBELL";
    Categories[Categories["AIR_PURIFIER"] = 19] = "AIR_PURIFIER";
    Categories[Categories["AIR_HEATER"] = 20] = "AIR_HEATER";
    Categories[Categories["AIR_CONDITIONER"] = 21] = "AIR_CONDITIONER";
    Categories[Categories["AIR_HUMIDIFIER"] = 22] = "AIR_HUMIDIFIER";
    Categories[Categories["AIR_DEHUMIDIFIER"] = 23] = "AIR_DEHUMIDIFIER";
    Categories[Categories["APPLE_TV"] = 24] = "APPLE_TV";
    Categories[Categories["HOMEPOD"] = 25] = "HOMEPOD";
    Categories[Categories["SPEAKER"] = 26] = "SPEAKER";
    Categories[Categories["AIRPORT"] = 27] = "AIRPORT";
    Categories[Categories["SPRINKLER"] = 28] = "SPRINKLER";
    Categories[Categories["FAUCET"] = 29] = "FAUCET";
    Categories[Categories["SHOWER_HEAD"] = 30] = "SHOWER_HEAD";
    Categories[Categories["TELEVISION"] = 31] = "TELEVISION";
    Categories[Categories["TARGET_CONTROLLER"] = 32] = "TARGET_CONTROLLER";
    Categories[Categories["ROUTER"] = 33] = "ROUTER";
    Categories[Categories["AUDIO_RECEIVER"] = 34] = "AUDIO_RECEIVER";
    Categories[Categories["TV_SET_TOP_BOX"] = 35] = "TV_SET_TOP_BOX";
    Categories[Categories["TV_STREAMING_STICK"] = 36] = "TV_STREAMING_STICK";
})(Categories = exports.Categories || (exports.Categories = {}));
var AccessoryEventTypes;
(function (AccessoryEventTypes) {
    AccessoryEventTypes["IDENTIFY"] = "identify";
    AccessoryEventTypes["LISTENING"] = "listening";
    AccessoryEventTypes["SERVICE_CONFIGURATION_CHANGE"] = "service-configurationChange";
    AccessoryEventTypes["SERVICE_CHARACTERISTIC_CHANGE"] = "service-characteristic-change";
    AccessoryEventTypes["PAIRED"] = "paired";
    AccessoryEventTypes["UNPAIRED"] = "unpaired";
})(AccessoryEventTypes = exports.AccessoryEventTypes || (exports.AccessoryEventTypes = {}));
var ResourceTypes;
(function (ResourceTypes) {
    ResourceTypes["IMAGE"] = "image";
})(ResourceTypes = exports.ResourceTypes || (exports.ResourceTypes = {}));
var WriteRequestState;
(function (WriteRequestState) {
    WriteRequestState[WriteRequestState["REGULAR_REQUEST"] = 0] = "REGULAR_REQUEST";
    WriteRequestState[WriteRequestState["TIMED_WRITE_AUTHENTICATED"] = 1] = "TIMED_WRITE_AUTHENTICATED";
    WriteRequestState[WriteRequestState["TIMED_WRITE_REJECTED"] = 2] = "TIMED_WRITE_REJECTED";
})(WriteRequestState || (WriteRequestState = {}));
/**
 * Accessory is a virtual HomeKit device. It can publish an associated HAP server for iOS devices to communicate
 * with - or it can run behind another "Bridge" Accessory server.
 *
 * Bridged Accessories in this implementation must have a UUID that is unique among all other Accessories that
 * are hosted by the Bridge. This UUID must be "stable" and unchanging, even when the server is restarted. This
 * is required so that the Bridge can provide consistent "Accessory IDs" (aid) and "Instance IDs" (iid) for all
 * Accessories, Services, and Characteristics for iOS clients to reference later.
 *
 * @event 'identify' => function(paired, callback(err)) { }
 *        Emitted when an iOS device wishes for this Accessory to identify itself. If `paired` is false, then
 *        this device is currently browsing for Accessories in the system-provided "Add Accessory" screen. If
 *        `paired` is true, then this is a device that has already paired with us. Note that if `paired` is true,
 *        listening for this event is a shortcut for the underlying mechanism of setting the `Identify` Characteristic:
 *        `getService(Service.AccessoryInformation).getCharacteristic(Characteristic.Identify).on('set', ...)`
 *        You must call the callback for identification to be successful.
 *
 * @event 'service-characteristic-change' => function({service, characteristic, oldValue, newValue, context}) { }
 *        Emitted after a change in the value of one of the provided Service's Characteristics.
 */
var Accessory = /** @class */ (function (_super) {
    __extends(Accessory, _super);
    function Accessory(displayName, UUID) {
        var _this = _super.call(this) || this;
        _this.displayName = displayName;
        _this.UUID = UUID;
        // NOTICE: when adding/changing properties, remember to possibly adjust the serialize/deserialize functions
        _this.aid = null; // assigned by us in assignIDs() or by a Bridge
        _this._isBridge = false; // true if we are a Bridge (creating a new instance of the Bridge subclass sets this to true)
        _this.bridged = false; // true if we are hosted "behind" a Bridge Accessory
        _this.bridgedAccessories = []; // If we are a Bridge, these are the Accessories we are bridging
        _this.reachable = true;
        _this.category = 1 /* OTHER */;
        _this.services = [];
        _this.shouldPurgeUnusedIDs = true; // Purge unused ids by default
        _this.controllers = {};
        _this._setupID = null;
        _this.controllerStorage = new ControllerStorage_1.ControllerStorage(_this);
        _this._identificationRequest = function (paired, callback) {
            debug("[%s] Identification request", _this.displayName);
            if (_this.listeners("identify" /* IDENTIFY */).length > 0) {
                // allow implementors to identify this Accessory in whatever way is appropriate, and pass along
                // the standard callback for completion.
                _this.emit("identify" /* IDENTIFY */, paired, callback);
            }
            else {
                debug("[%s] Identification request ignored; no listeners to 'identify' event", _this.displayName);
                callback();
            }
        };
        _this.addService = function (serviceParam) {
            var constructorArgs = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                constructorArgs[_i - 1] = arguments[_i];
            }
            // service might be a constructor like `Service.AccessoryInformation` instead of an instance
            // of Service. Coerce if necessary.
            var service = typeof serviceParam === 'function'
                ? new serviceParam(constructorArgs[0], constructorArgs[1], constructorArgs[2])
                : serviceParam;
            // check for UUID+subtype conflict
            for (var index in _this.services) {
                var existing = _this.services[index];
                if (existing.UUID === service.UUID) {
                    // OK we have two Services with the same UUID. Check that each defines a `subtype` property and that each is unique.
                    if (!service.subtype)
                        throw new Error("Cannot add a Service with the same UUID '" + existing.UUID + "' as another Service in this Accessory without also defining a unique 'subtype' property.");
                    if (service.subtype === existing.subtype)
                        throw new Error("Cannot add a Service with the same UUID '" + existing.UUID + "' and subtype '" + existing.subtype + "' as another Service in this Accessory.");
                }
            }
            if (_this.services.length >= MAX_SERVICES) {
                throw new Error("Cannot add more than " + MAX_SERVICES + " services to a single accessory!");
            }
            _this.services.push(service);
            if (service.isPrimaryService) { // check if a primary service was added
                if (_this.primaryService !== undefined) {
                    _this.primaryService.isPrimaryService = false;
                }
                _this.primaryService = service;
            }
            if (!_this.bridged) {
                _this._updateConfiguration();
            }
            else {
                _this.emit("service-configurationChange" /* SERVICE_CONFIGURATION_CHANGE */, clone_1.clone({ accessory: _this, service: service }));
            }
            service.on("service-configurationChange" /* SERVICE_CONFIGURATION_CHANGE */, function (change) {
                if (!service.isPrimaryService && service === _this.primaryService) {
                    // service changed form primary to non primary service
                    _this.primaryService = undefined;
                }
                else if (service.isPrimaryService && service !== _this.primaryService) {
                    // service changed from non primary to primary service
                    if (_this.primaryService !== undefined) {
                        _this.primaryService.isPrimaryService = false;
                    }
                    _this.primaryService = service;
                }
                if (!_this.bridged) {
                    _this._updateConfiguration();
                }
                else {
                    _this.emit("service-configurationChange" /* SERVICE_CONFIGURATION_CHANGE */, clone_1.clone({ accessory: _this, service: service }));
                }
            });
            // listen for changes in characteristics and bubble them up
            service.on("characteristic-change" /* CHARACTERISTIC_CHANGE */, function (change) {
                _this.emit("service-characteristic-change" /* SERVICE_CHARACTERISTIC_CHANGE */, clone_1.clone(change, { service: service }));
                // if we're not bridged, when we'll want to process this event through our HAPServer
                if (!_this.bridged)
                    _this._handleCharacteristicChange(clone_1.clone(change, { accessory: _this, service: service }));
            });
            return service;
        };
        /**
         * @deprecated use {@link Service.setPrimaryService} directly
         */
        _this.setPrimaryService = function (service) {
            service.setPrimaryService();
        };
        _this.removeService = function (service) {
            var index = _this.services.indexOf(service);
            if (index >= 0) {
                _this.services.splice(index, 1);
                if (_this.primaryService === service) { // check if we are removing out primary service
                    _this.primaryService = undefined;
                }
                if (!_this.bridged) {
                    _this._updateConfiguration();
                }
                else {
                    _this.emit("service-configurationChange" /* SERVICE_CONFIGURATION_CHANGE */, clone_1.clone({ accessory: _this, service: service }));
                }
                service.removeAllListeners();
            }
        };
        _this.getService = function (name) {
            for (var index in _this.services) {
                var service = _this.services[index];
                if (typeof name === 'string' && (service.displayName === name || service.name === name || service.subtype === name))
                    return service;
                else if (typeof name === 'function' && ((service instanceof name) || (name.UUID === service.UUID)))
                    return service;
            }
        };
        /**
         * Returns the bridging accessory if this accessory is bridged.
         * Otherwise returns itself.
         *
         * @returns the primary accessory
         */
        _this.getPrimaryAccessory = function () {
            return _this.bridged ? _this.bridge : _this;
        };
        _this.updateReachability = function (reachable) {
            if (!_this.bridged)
                throw new Error("Cannot update reachability on non-bridged accessory!");
            _this.reachable = reachable;
            debug('Reachability update is no longer being supported.');
        };
        _this.addBridgedAccessory = function (accessory, deferUpdate) {
            if (deferUpdate === void 0) { deferUpdate = false; }
            if (accessory._isBridge)
                throw new Error("Cannot Bridge another Bridge!");
            // check for UUID conflict
            for (var index in _this.bridgedAccessories) {
                var existing = _this.bridgedAccessories[index];
                if (existing.UUID === accessory.UUID)
                    throw new Error("Cannot add a bridged Accessory with the same UUID as another bridged Accessory: " + existing.UUID);
            }
            // A bridge too far...
            if (_this.bridgedAccessories.length >= MAX_ACCESSORIES) {
                throw new Error("Cannot Bridge more than " + MAX_ACCESSORIES + " Accessories");
            }
            // listen for changes in ANY characteristics of ANY services on this Accessory
            accessory.on("service-characteristic-change" /* SERVICE_CHARACTERISTIC_CHANGE */, function (change) {
                _this._handleCharacteristicChange(clone_1.clone(change, { accessory: accessory }));
            });
            accessory.on("service-configurationChange" /* SERVICE_CONFIGURATION_CHANGE */, function () {
                _this._updateConfiguration();
            });
            accessory.bridged = true;
            accessory.bridge = _this;
            _this.bridgedAccessories.push(accessory);
            _this.controllerStorage.linkAccessory(accessory); // init controllers of bridged accessory
            if (!deferUpdate) {
                _this._updateConfiguration();
            }
            return accessory;
        };
        _this.addBridgedAccessories = function (accessories) {
            for (var index in accessories) {
                var accessory = accessories[index];
                _this.addBridgedAccessory(accessory, true);
            }
            _this._updateConfiguration();
        };
        _this.removeBridgedAccessory = function (accessory, deferUpdate) {
            if (accessory._isBridge)
                throw new Error("Cannot Bridge another Bridge!");
            var foundMatchAccessory = false;
            // check for UUID conflict
            for (var index in _this.bridgedAccessories) {
                var existing = _this.bridgedAccessories[index];
                if (existing.UUID === accessory.UUID) {
                    foundMatchAccessory = true;
                    _this.bridgedAccessories.splice(Number.parseInt(index), 1);
                    break;
                }
            }
            if (!foundMatchAccessory)
                throw new Error("Cannot find the bridged Accessory to remove.");
            accessory.removeAllListeners();
            if (!deferUpdate) {
                _this._updateConfiguration();
            }
        };
        _this.removeBridgedAccessories = function (accessories) {
            for (var index in accessories) {
                var accessory = accessories[index];
                _this.removeBridgedAccessory(accessory, true);
            }
            _this._updateConfiguration();
        };
        _this.removeAllBridgedAccessories = function () {
            for (var i = _this.bridgedAccessories.length - 1; i >= 0; i--) {
                _this.removeBridgedAccessory(_this.bridgedAccessories[i], true);
            }
            _this._updateConfiguration();
        };
        _this.getCharacteristicByIID = function (iid) {
            for (var index in _this.services) {
                var service = _this.services[index];
                var characteristic = service.getCharacteristicByIID(iid);
                if (characteristic)
                    return characteristic;
            }
        };
        _this.getBridgedAccessoryByAID = function (aid) {
            for (var index in _this.bridgedAccessories) {
                var accessory = _this.bridgedAccessories[index];
                if (accessory.aid === aid)
                    return accessory;
            }
        };
        _this.findCharacteristic = function (aid, iid) {
            // if aid === 1, the accessory is us (because we are the server), otherwise find it among our bridged
            // accessories (if any)
            var accessory = (aid === 1) ? _this : _this.getBridgedAccessoryByAID(aid);
            return accessory && accessory.getCharacteristicByIID(iid);
        };
        _this.setupURI = function () {
            if (_this._setupURI) {
                return _this._setupURI;
            }
            var buffer = Buffer.alloc(8);
            var setupCode = _this._accessoryInfo && parseInt(_this._accessoryInfo.pincode.replace(/-/g, ''), 10);
            var value_low = setupCode;
            var value_high = _this._accessoryInfo && _this._accessoryInfo.category >> 1;
            value_low |= 1 << 28; // Supports IP;
            buffer.writeUInt32BE(value_low, 4);
            if (_this._accessoryInfo && _this._accessoryInfo.category & 1) {
                buffer[4] = buffer[4] | 1 << 7;
            }
            buffer.writeUInt32BE(value_high, 0);
            var encodedPayload = (buffer.readUInt32BE(4) + (buffer.readUInt32BE(0) * Math.pow(2, 32))).toString(36).toUpperCase();
            if (encodedPayload.length != 9) {
                for (var i = 0; i <= 9 - encodedPayload.length; i++) {
                    encodedPayload = "0" + encodedPayload;
                }
            }
            _this._setupURI = "X-HM://" + encodedPayload + _this._setupID;
            return _this._setupURI;
        };
        /**
         * Assigns aid/iid to ourselves, any Accessories we are bridging, and all associated Services+Characteristics. Uses
         * the provided identifierCache to keep IDs stable.
         */
        _this._assignIDs = function (identifierCache) {
            // if we are responsible for our own identifierCache, start the expiration process
            // also check weather we want to have an expiration process
            if (_this._identifierCache && _this.shouldPurgeUnusedIDs) {
                _this._identifierCache.startTrackingUsage();
            }
            if (_this.bridged) {
                // This Accessory is bridged, so it must have an aid > 1. Use the provided identifierCache to
                // fetch or assign one based on our UUID.
                _this.aid = identifierCache.getAID(_this.UUID);
            }
            else {
                // Since this Accessory is the server (as opposed to any Accessories that may be bridged behind us),
                // we must have aid = 1
                _this.aid = 1;
            }
            for (var index in _this.services) {
                var service = _this.services[index];
                if (_this._isBridge) {
                    service._assignIDs(identifierCache, _this.UUID, 2000000000);
                }
                else {
                    service._assignIDs(identifierCache, _this.UUID);
                }
            }
            // now assign IDs for any Accessories we are bridging
            for (var index in _this.bridgedAccessories) {
                var accessory = _this.bridgedAccessories[index];
                accessory._assignIDs(identifierCache);
            }
            // expire any now-unused cache keys (for Accessories, Services, or Characteristics
            // that have been removed since the last call to assignIDs())
            if (_this._identifierCache) {
                //Check weather we want to purge the unused ids
                if (_this.shouldPurgeUnusedIDs)
                    _this._identifierCache.stopTrackingUsageAndExpireUnused();
                //Save in case we have new ones
                _this._identifierCache.save();
            }
        };
        _this.disableUnusedIDPurge = function () {
            _this.shouldPurgeUnusedIDs = false;
        };
        _this.enableUnusedIDPurge = function () {
            _this.shouldPurgeUnusedIDs = true;
        };
        /**
         * Manually purge the unused ids if you like, comes handy
         * when you have disabled auto purge so you can do it manually
         */
        _this.purgeUnusedIDs = function () {
            //Cache the state of the purge mechanisam and set it to true
            var oldValue = _this.shouldPurgeUnusedIDs;
            _this.shouldPurgeUnusedIDs = true;
            //Reassign all ids
            _this._assignIDs(_this._identifierCache);
            //Revert back the purge mechanisam state
            _this.shouldPurgeUnusedIDs = oldValue;
        };
        /**
         * Returns a JSON representation of this Accessory suitable for delivering to HAP clients.
         */
        _this.toHAP = function (opt) {
            var servicesHAP = [];
            for (var index in _this.services) {
                var service = _this.services[index];
                servicesHAP.push(service.toHAP(opt));
            }
            var accessoriesHAP = [{
                    aid: _this.aid,
                    services: servicesHAP
                }];
            // now add any Accessories we are bridging
            for (var index in _this.bridgedAccessories) {
                var accessory = _this.bridgedAccessories[index];
                var bridgedAccessoryHAP = accessory.toHAP(opt);
                // bridgedAccessoryHAP is an array of accessories with one item - extract it
                // and add it to our own array
                accessoriesHAP.push(bridgedAccessoryHAP[0]);
            }
            return accessoriesHAP;
        };
        /**
         * Publishes this Accessory on the local network for iOS clients to communicate with.
         *
         * @param {Object} info - Required info for publishing.
         * @param {string} info.username - The "username" (formatted as a MAC address - like "CC:22:3D:E3:CE:F6") of
         *                                this Accessory. Must be globally unique from all Accessories on your local network.
         * @param {string} info.pincode - The 8-digit pincode for clients to use when pairing this Accessory. Must be formatted
         *                               as a string like "031-45-154".
         * @param {string} info.category - One of the values of the Accessory.Category enum, like Accessory.Category.SWITCH.
         *                                This is a hint to iOS clients about what "type" of Accessory this represents, so
         *                                that for instance an appropriate icon can be drawn for the user while adding a
         *                                new Accessory.
         */
        _this.publish = function (info, allowInsecureRequest) {
            var service;
            service = _this.getService(Service_1.Service.ProtocolInformation);
            if (!service) {
                service = _this.addService(Service_1.Service.ProtocolInformation); // add the protocol information service to the primary accessory
            }
            service.setCharacteristic(Characteristic_1.Characteristic.Version, Advertiser_1.Advertiser.protocolVersionService);
            if (_this.lastKnownUsername && _this.lastKnownUsername !== info.username) { // username changed since last publish
                Accessory.cleanupAccessoryData(_this.lastKnownUsername); // delete old Accessory data
            }
            // attempt to load existing AccessoryInfo from disk
            _this._accessoryInfo = AccessoryInfo_1.AccessoryInfo.load(info.username);
            // if we don't have one, create a new one.
            if (!_this._accessoryInfo) {
                debug("[%s] Creating new AccessoryInfo for our HAP server", _this.displayName);
                _this._accessoryInfo = AccessoryInfo_1.AccessoryInfo.create(info.username);
            }
            if (info.setupID) {
                _this._setupID = info.setupID;
            }
            else if (_this._accessoryInfo.setupID === undefined || _this._accessoryInfo.setupID === "") {
                _this._setupID = _this._generateSetupID();
            }
            else {
                _this._setupID = _this._accessoryInfo.setupID;
            }
            _this._accessoryInfo.setupID = _this._setupID;
            // make sure we have up-to-date values in AccessoryInfo, then save it in case they changed (or if we just created it)
            _this._accessoryInfo.displayName = _this.displayName;
            _this._accessoryInfo.category = info.category || 1 /* OTHER */;
            _this._accessoryInfo.pincode = info.pincode;
            _this._accessoryInfo.save();
            // create our IdentifierCache so we can provide clients with stable aid/iid's
            _this._identifierCache = IdentifierCache_1.IdentifierCache.load(info.username);
            // if we don't have one, create a new one.
            if (!_this._identifierCache) {
                debug("[%s] Creating new IdentifierCache", _this.displayName);
                _this._identifierCache = new IdentifierCache_1.IdentifierCache(info.username);
            }
            //If it's bridge and there are not accessories already assigned to the bridge
            //probably purge is not needed since it's going to delete all the ids
            //of accessories that might be added later. Usefull when dynamically adding
            //accessories.
            if (_this._isBridge && _this.bridgedAccessories.length == 0) {
                _this.disableUnusedIDPurge();
                _this.controllerStorage.purgeUnidentifiedAccessoryData = false;
            }
            // assign aid/iid
            _this._assignIDs(_this._identifierCache);
            _this.controllerStorage.load(info.username); // initializing controller data
            // get our accessory information in HAP format and determine if our configuration (that is, our
            // Accessories/Services/Characteristics) has changed since the last time we were published. make
            // sure to omit actual values since these are not part of the "configuration".
            var config = _this.toHAP({ omitValues: true });
            // now convert it into a hash code and check it against the last one we made, if we have one
            var shasum = crypto_1.default.createHash('sha1');
            shasum.update(JSON.stringify(config));
            var configHash = shasum.digest('hex');
            if (configHash !== _this._accessoryInfo.configHash) {
                // our configuration has changed! we'll need to bump our config version number
                _this._accessoryInfo.configVersion++;
                _this._accessoryInfo.configHash = configHash;
                _this._accessoryInfo.save();
            }
            _this.validateAccessory();
            // create our Advertiser which broadcasts our presence over mdns
            _this._advertiser = new Advertiser_1.Advertiser(_this._accessoryInfo, info.mdns);
            // create our HAP server which handles all communication between iOS devices and us
            _this._server = new HAPServer_1.HAPServer(_this._accessoryInfo);
            _this._server.allowInsecureRequest = !!allowInsecureRequest;
            _this._server.on("listening" /* LISTENING */, _this._onListening.bind(_this));
            _this._server.on("identify" /* IDENTIFY */, _this._handleIdentify.bind(_this));
            _this._server.on("pair" /* PAIR */, _this._handlePair.bind(_this));
            _this._server.on("add-pairing" /* ADD_PAIRING */, _this._handleAddPairing.bind(_this));
            _this._server.on("remove_pairing" /* REMOVE_PAIRING */, _this._handleRemovePairing.bind(_this));
            _this._server.on("list-pairings" /* LIST_PAIRINGS */, _this._handleListPairings.bind(_this));
            _this._server.on("accessories" /* ACCESSORIES */, _this._handleAccessories.bind(_this));
            _this._server.on("get-characteristics" /* GET_CHARACTERISTICS */, _this._handleGetCharacteristics.bind(_this));
            _this._server.on("set-characteristics" /* SET_CHARACTERISTICS */, _this._handleSetCharacteristics.bind(_this));
            _this._server.on("session-close" /* SESSION_CLOSE */, _this._handleSessionClose.bind(_this));
            _this._server.on("request-resource" /* REQUEST_RESOURCE */, _this._handleResource.bind(_this));
            var targetPort = info.port || 0;
            _this._server.listen(targetPort);
        };
        /**
         * Removes this Accessory from the local network
         * Accessory object will no longer valid after invoking this method
         * Trying to invoke publish() on the object will result undefined behavior
         */
        _this.destroy = function () {
            _this.unpublish();
            if (_this._accessoryInfo) {
                Accessory.cleanupAccessoryData(_this._accessoryInfo.username);
                _this._accessoryInfo = undefined;
                _this._identifierCache = undefined;
                _this.controllerStorage = new ControllerStorage_1.ControllerStorage(_this);
            }
        };
        _this.unpublish = function () {
            if (_this._server) {
                _this._server.stop();
                _this._server = undefined;
            }
            if (_this._advertiser) {
                _this._advertiser.stopAdvertising();
                _this._advertiser = undefined;
            }
        };
        _this._updateConfiguration = function () {
            if (_this._advertiser && _this._advertiser.isAdvertising()) {
                // get our accessory information in HAP format and determine if our configuration (that is, our
                // Accessories/Services/Characteristics) has changed since the last time we were published. make
                // sure to omit actual values since these are not part of the "configuration".
                var config = _this.toHAP({ omitValues: true });
                // now convert it into a hash code and check it against the last one we made, if we have one
                var shasum = crypto_1.default.createHash('sha1');
                shasum.update(JSON.stringify(config));
                var configHash = shasum.digest('hex');
                if (_this._accessoryInfo && configHash !== _this._accessoryInfo.configHash) {
                    // our configuration has changed! we'll need to bump our config version number
                    _this._accessoryInfo.configVersion++;
                    _this._accessoryInfo.configHash = configHash;
                    _this._accessoryInfo.save();
                }
                // update our advertisement so HomeKit on iOS can pickup new accessory
                _this._advertiser.updateAdvertisement();
            }
        };
        _this._onListening = function (port) {
            // the HAP server is listening, so we can now start advertising our presence.
            _this._advertiser && _this._advertiser.startAdvertising(port);
            _this.emit("listening" /* LISTENING */, port);
        };
        // Called when an unpaired client wishes for us to identify ourself
        _this._handleIdentify = function (callback) {
            var paired = false;
            _this._identificationRequest(paired, callback);
        };
        // Called when HAPServer has completed the pairing process with a client
        _this._handlePair = function (username, publicKey, callback) {
            debug("[%s] Paired with client %s", _this.displayName, username);
            _this._accessoryInfo && _this._accessoryInfo.addPairedClient(username, publicKey, 1 /* ADMIN */);
            _this._accessoryInfo && _this._accessoryInfo.save();
            // update our advertisement so it can pick up on the paired status of AccessoryInfo
            _this._advertiser && _this._advertiser.updateAdvertisement();
            callback();
            _this.emit("paired" /* PAIRED */);
        };
        // called when a controller adds an additional pairing
        _this._handleAddPairing = function (controller, username, publicKey, permission, callback) {
            if (!_this._accessoryInfo) {
                callback(6 /* UNAVAILABLE */);
                return;
            }
            if (!_this._accessoryInfo.hasAdminPermissions(controller.username)) {
                callback(2 /* AUTHENTICATION */);
                return;
            }
            var existingKey = _this._accessoryInfo.getClientPublicKey(username);
            if (existingKey) {
                if (existingKey.toString() !== publicKey.toString()) {
                    callback(1 /* UNKNOWN */);
                    return;
                }
                _this._accessoryInfo.updatePermission(username, permission);
            }
            else {
                _this._accessoryInfo.addPairedClient(username, publicKey, permission);
            }
            _this._accessoryInfo.save();
            // there should be no need to update advertisement
            callback(0);
        };
        _this._handleRemovePairing = function (controller, username, callback) {
            if (!_this._accessoryInfo) {
                callback(6 /* UNAVAILABLE */);
                return;
            }
            if (!_this._accessoryInfo.hasAdminPermissions(controller.username)) {
                callback(2 /* AUTHENTICATION */);
                return;
            }
            _this._accessoryInfo.removePairedClient(controller, username);
            _this._accessoryInfo.save();
            if (!_this._accessoryInfo.paired()) {
                _this._advertiser && _this._advertiser.updateAdvertisement();
                _this.emit("unpaired" /* UNPAIRED */);
            }
            callback(0);
        };
        _this._handleListPairings = function (controller, callback) {
            if (!_this._accessoryInfo) {
                callback(6 /* UNAVAILABLE */);
                return;
            }
            if (!_this._accessoryInfo.hasAdminPermissions(controller.username)) {
                callback(2 /* AUTHENTICATION */);
                return;
            }
            callback(0, _this._accessoryInfo.listPairings());
        };
        // Called when an iOS client wishes to know all about our accessory via JSON payload
        _this._handleAccessories = function (callback) {
            // make sure our aid/iid's are all assigned
            _this._assignIDs(_this._identifierCache);
            // build out our JSON payload and call the callback
            callback(null, {
                accessories: _this.toHAP() // array of Accessory HAP
            });
        };
        // Called when an iOS client wishes to query the state of one or more characteristics, like "door open?", "light on?", etc.
        _this._handleGetCharacteristics = function (data, events, callback, remote, session) {
            // build up our array of responses to the characteristics requested asynchronously
            var characteristics = [];
            var statusKey = remote ? 's' : 'status';
            var valueKey = remote ? 'v' : 'value';
            data.forEach(function (characteristicData) {
                var aid = characteristicData.aid;
                var iid = characteristicData.iid;
                var includeEvent = characteristicData.e;
                var characteristic = _this.findCharacteristic(characteristicData.aid, characteristicData.iid);
                if (!characteristic) {
                    debug('[%s] Could not find a Characteristic with iid of %s and aid of %s', _this.displayName, characteristicData.aid, characteristicData.iid);
                    var response = {
                        aid: aid,
                        iid: iid
                    };
                    response[statusKey] = -70402 /* SERVICE_COMMUNICATION_FAILURE */; // generic error status
                    characteristics.push(response);
                    // have we collected all responses yet?
                    if (characteristics.length === data.length)
                        callback(null, characteristics);
                    return;
                }
                if (!characteristic.props.perms.includes("pr" /* PAIRED_READ */)) { // check if we are allowed to read from this characteristic
                    debug('[%s] Tried reading from Characteristic which does not allow reading (iid of %s and aid of %s)', _this.displayName, characteristicData.aid, characteristicData.iid);
                    var response_1 = {
                        aid: aid,
                        iid: iid
                    };
                    response_1[statusKey] = -70405 /* WRITE_ONLY_CHARACTERISTIC */;
                    characteristics.push(response_1);
                    if (characteristics.length === data.length) {
                        callback(null, characteristics);
                    }
                    return;
                }
                if (characteristic.props.adminOnlyAccess && characteristic.props.adminOnlyAccess.includes(0 /* READ */)) {
                    var verifiable = true;
                    if (!session || !session.username || !_this._accessoryInfo) {
                        verifiable = false;
                        debug('[%s] Could not verify admin permissions for Characteristic which requires admin permissions for reading (iid of %s and aid of %s)', _this.displayName, characteristicData.aid, characteristicData.iid);
                    }
                    if (!verifiable || !_this._accessoryInfo.hasAdminPermissions(session.username)) {
                        var response_2 = {
                            aid: aid,
                            iid: iid
                        };
                        response_2[statusKey] = -70401 /* INSUFFICIENT_PRIVILEGES */;
                        characteristics.push(response_2);
                        if (characteristics.length === data.length)
                            callback(null, characteristics);
                        return;
                    }
                }
                // Found the Characteristic! Get the value!
                debug('[%s] Getting value for Characteristic "%s"', _this.displayName, characteristic.displayName);
                // we want to remember "who" made this request, so that we don't send them an event notification
                // about any changes that occurred as a result of the request. For instance, if after querying
                // the current value of a characteristic, the value turns out to be different than the previously
                // cached Characteristic value, an internal 'change' event will be emitted which will cause us to
                // notify all connected clients about that new value. But this client is about to get the new value
                // anyway, so we don't want to notify it twice.
                var context = events;
                // set the value and wait for success
                characteristic.getValue(function (err, value) {
                    if (err) {
                        debug('[%s] Error getting value for Characteristic "%s": %s', _this.displayName, characteristic.displayName, err.message);
                        var response = {
                            aid: aid,
                            iid: iid
                        };
                        response[statusKey] = hapStatus(err);
                        characteristics.push(response);
                    }
                    else {
                        debug('[%s] Got Characteristic "%s" value: %s', _this.displayName, characteristic.displayName, value);
                        var response = {
                            aid: aid,
                            iid: iid
                        };
                        response[valueKey] = value;
                        if (includeEvent) {
                            var eventName = aid + '.' + iid;
                            response['e'] = (events[eventName] === true);
                        }
                        // compose the response and add it to the list
                        characteristics.push(response);
                    }
                    // have we collected all responses yet?
                    if (characteristics.length === data.length)
                        callback(null, characteristics);
                }, context, session ? session.sessionID : undefined);
            });
        };
        // Called when an iOS client wishes to change the state of this accessory - like opening a door, or turning on a light.
        // Or, to subscribe to change events for a particular Characteristic.
        _this._handleSetCharacteristics = function (writeRequest, events, callback, remote, session) {
            var data = writeRequest.characteristics;
            // data is an array of characteristics and values like this:
            // [ { aid: 1, iid: 8, value: true, ev: true } ]
            debug("[%s] Processing characteristic set: %s", _this.displayName, JSON.stringify(data));
            var writeState = 0 /* REGULAR_REQUEST */;
            if (writeRequest.pid !== undefined) { // check for timed writes
                if (session.timedWritePid === writeRequest.pid) {
                    writeState = 1 /* TIMED_WRITE_AUTHENTICATED */;
                    clearTimeout(session.timedWriteTimeout);
                    session.timedWritePid = undefined;
                    session.timedWriteTimeout = undefined;
                    debug("[%s] Timed write request got acknowledged for pid %d", _this.displayName, writeRequest.pid);
                }
                else {
                    writeState = 2 /* TIMED_WRITE_REJECTED */;
                    debug("[%s] TTL for timed write request has probably expired for pid %d", _this.displayName, writeRequest.pid);
                }
            }
            // build up our array of responses to the characteristics requested asynchronously
            var characteristics = [];
            data.forEach(function (characteristicData) {
                var aid = characteristicData.aid;
                var iid = characteristicData.iid;
                var value = remote ? characteristicData.v : characteristicData.value;
                var ev = remote ? characteristicData.e : characteristicData.ev;
                var includeValue = characteristicData.r || false;
                var statusKey = remote ? 's' : 'status';
                var characteristic = _this.findCharacteristic(aid, iid);
                if (!characteristic) {
                    debug('[%s] Could not find a Characteristic with iid of %s and aid of %s', _this.displayName, characteristicData.aid, characteristicData.iid);
                    var response = {
                        aid: aid,
                        iid: iid
                    };
                    response[statusKey] = -70402 /* SERVICE_COMMUNICATION_FAILURE */; // generic error status
                    characteristics.push(response);
                    // have we collected all responses yet?
                    if (characteristics.length === data.length)
                        callback(null, characteristics);
                    return;
                }
                if (writeState === 2 /* TIMED_WRITE_REJECTED */) {
                    var response_3 = {
                        aid: aid,
                        iid: iid
                    };
                    response_3[statusKey] = -70410 /* INVALID_VALUE_IN_REQUEST */;
                    characteristics.push(response_3);
                    if (characteristics.length === data.length)
                        callback(null, characteristics);
                    return;
                }
                // we want to remember "who" initiated this change, so that we don't send them an event notification
                // about the change they just made. We do this by leveraging the arbitrary "context" object supported
                // by Characteristic and passed on to the corresponding 'change' events bubbled up from Characteristic
                // through Service and Accessory. We'll assign it to the events object since it essentially represents
                // the connection requesting the change.
                var context = events;
                // if "ev" is present, that means we need to register or unregister this client for change events for
                // this characteristic.
                if (typeof ev !== 'undefined') {
                    if (!characteristic.props.perms.includes("ev" /* NOTIFY */)) { // check if notify is allowed for this characteristic
                        debug('[%s] Tried enabling notifications for Characteristic which does not allow notify (iid of %s and aid of %s)', _this.displayName, characteristicData.aid, characteristicData.iid);
                        var response_4 = {
                            aid: aid,
                            iid: iid
                        };
                        response_4[statusKey] = -70406 /* NOTIFICATION_NOT_SUPPORTED */;
                        characteristics.push(response_4);
                        if (characteristics.length === data.length) {
                            callback(null, characteristics);
                        }
                        return;
                    }
                    if (characteristic.props.adminOnlyAccess && characteristic.props.adminOnlyAccess.includes(2 /* NOTIFY */)) {
                        var verifiable = true;
                        if (!session || !session.username || !_this._accessoryInfo) {
                            verifiable = false;
                            debug('[%s] Could not verify admin permissions for Characteristic which requires admin permissions for notify (iid of %s and aid of %s)', _this.displayName, characteristicData.aid, characteristicData.iid);
                        }
                        if (!verifiable || !_this._accessoryInfo.hasAdminPermissions(session.username)) {
                            var response_5 = {
                                aid: aid,
                                iid: iid
                            };
                            response_5[statusKey] = -70401 /* INSUFFICIENT_PRIVILEGES */;
                            characteristics.push(response_5);
                            if (characteristics.length === data.length)
                                callback(null, characteristics);
                            return;
                        }
                    }
                    debug('[%s] %s Characteristic "%s" for events', _this.displayName, ev ? "Registering" : "Unregistering", characteristic.displayName);
                    // store event registrations in the supplied "events" dict which is associated with the connection making
                    // the request.
                    var eventName = aid + '.' + iid;
                    if (ev === true && events[eventName] != true) {
                        events[eventName] = true; // value is arbitrary, just needs to be non-falsey
                        characteristic.subscribe();
                    }
                    if (ev === false && events[eventName] != undefined) {
                        characteristic.unsubscribe();
                        delete events[eventName]; // unsubscribe by deleting name from dict
                    }
                }
                // Found the characteristic - set the value if there is one
                if (typeof value !== 'undefined') {
                    if (!characteristic.props.perms.includes("pw" /* PAIRED_WRITE */)) { // check if write is allowed for this characteristic
                        debug('[%s] Tried writing to Characteristic which does not allow writing (iid of %s and aid of %s)', _this.displayName, characteristicData.aid, characteristicData.iid);
                        var response_6 = {
                            aid: aid,
                            iid: iid
                        };
                        response_6[statusKey] = -70404 /* READ_ONLY_CHARACTERISTIC */;
                        characteristics.push(response_6);
                        if (characteristics.length === data.length) {
                            callback(null, characteristics);
                        }
                        return;
                    }
                    if (characteristic.props.adminOnlyAccess && characteristic.props.adminOnlyAccess.includes(1 /* WRITE */)) {
                        var verifiable = true;
                        if (!session || !session.username || !_this._accessoryInfo) {
                            verifiable = false;
                            debug('[%s] Could not verify admin permissions for Characteristic which requires admin permissions for write (iid of %s and aid of %s)', _this.displayName, characteristicData.aid, characteristicData.iid);
                        }
                        if (!verifiable || !_this._accessoryInfo.hasAdminPermissions(session.username)) {
                            var response_7 = {
                                aid: aid,
                                iid: iid
                            };
                            response_7[statusKey] = -70401 /* INSUFFICIENT_PRIVILEGES */;
                            characteristics.push(response_7);
                            if (characteristics.length === data.length)
                                callback(null, characteristics);
                            return;
                        }
                    }
                    if (characteristic.props.perms.includes("tw" /* TIMED_WRITE */) && writeState !== 1 /* TIMED_WRITE_AUTHENTICATED */) {
                        debug('[%s] Tried writing to a timed write only Characteristic without properly preparing (iid of %s and aid of %s)', _this.displayName, characteristicData.aid, characteristicData.iid);
                        var response_8 = {
                            aid: aid,
                            iid: iid
                        };
                        response_8[statusKey] = -70410 /* INVALID_VALUE_IN_REQUEST */;
                        characteristics.push(response_8);
                        if (characteristics.length === data.length)
                            callback(null, characteristics);
                        return;
                    }
                    debug('[%s] Setting Characteristic "%s" to value %s', _this.displayName, characteristic.displayName, value);
                    // set the value and wait for success
                    characteristic.setValue(value, function (err) {
                        if (err) {
                            debug('[%s] Error setting Characteristic "%s" to value %s: ', _this.displayName, characteristic.displayName, value, err.message);
                            var response = {
                                aid: aid,
                                iid: iid
                            };
                            response[statusKey] = hapStatus(err);
                            characteristics.push(response);
                        }
                        else {
                            var response = {
                                aid: aid,
                                iid: iid
                            };
                            response[statusKey] = 0;
                            if (includeValue)
                                response['value'] = characteristic.value;
                            characteristics.push(response);
                        }
                        // have we collected all responses yet?
                        if (characteristics.length === data.length)
                            callback(null, characteristics);
                    }, context, session ? session.sessionID : undefined);
                }
                else {
                    // no value to set, so we're done (success)
                    var response = {
                        aid: aid,
                        iid: iid
                    };
                    response[statusKey] = 0;
                    characteristics.push(response);
                    // have we collected all responses yet?
                    if (characteristics.length === data.length)
                        callback(null, characteristics);
                }
            });
        };
        _this._handleSessionClose = function (sessionID, events) {
            if (_this.activeCameraController) {
                _this.activeCameraController.handleCloseConnection(sessionID);
            }
            _this._unsubscribeEvents(events);
        };
        _this._unsubscribeEvents = function (events) {
            for (var key in events) {
                if (key.indexOf('.') !== -1) {
                    try {
                        var id = key.split('.');
                        var aid = Number.parseInt(id[0]);
                        var iid = Number.parseInt(id[1]);
                        var characteristic = _this.findCharacteristic(aid, iid);
                        if (characteristic) {
                            characteristic.unsubscribe();
                        }
                    }
                    catch (e) {
                    }
                }
            }
        };
        // Called internally above when a change was detected in one of our hosted Characteristics somewhere in our hierarchy.
        _this._handleCharacteristicChange = function (change) {
            if (!_this._server)
                return; // we're not running a HAPServer, so there's no one to notify about this event
            var data = {
                characteristics: [{
                        aid: change.accessory.aid,
                        iid: change.characteristic.iid,
                        value: change.newValue
                    }]
            };
            // name for this event that corresponds to what we stored when the client signed up (in handleSetCharacteristics)
            var eventName = change.accessory.aid + '.' + change.characteristic.iid;
            // pull the events object associated with the original connection (if any) that initiated the change request,
            // which we assigned in handleGetCharacteristics/handleSetCharacteristics.
            var excludeEvents = change.context;
            // pass it along to notifyClients() so that it can omit the connection where events === excludeEvents.
            _this._server.notifyClients(eventName, data, excludeEvents);
        };
        _this._setupService = function (service) {
            service.on("service-configurationChange" /* SERVICE_CONFIGURATION_CHANGE */, function () {
                if (!_this.bridged) {
                    _this._updateConfiguration();
                }
                else {
                    _this.emit("service-configurationChange" /* SERVICE_CONFIGURATION_CHANGE */, clone_1.clone({ accessory: _this, service: service }));
                }
            });
            // listen for changes in characteristics and bubble them up
            service.on("characteristic-change" /* CHARACTERISTIC_CHANGE */, function (change) {
                _this.emit("service-characteristic-change" /* SERVICE_CHARACTERISTIC_CHANGE */, clone_1.clone(change, { service: service }));
                // if we're not bridged, when we'll want to process this event through our HAPServer
                if (!_this.bridged)
                    _this._handleCharacteristicChange(clone_1.clone(change, { accessory: _this, service: service }));
            });
        };
        _this._sideloadServices = function (targetServices) {
            for (var index in targetServices) {
                var target = targetServices[index];
                _this._setupService(target);
            }
            _this.services = targetServices.slice();
            // Fix Identify
            _this
                .getService(Service_1.Service.AccessoryInformation)
                .getCharacteristic(Characteristic_1.Characteristic.Identify)
                .on("set" /* SET */, function (value, callback) {
                if (value) {
                    var paired = true;
                    _this._identificationRequest(paired, callback);
                }
            });
        };
        _this._generateSetupID = function () {
            var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
            var bytes = crypto_1.default.randomBytes(4);
            var setupID = '';
            for (var i = 0; i < 4; i++) {
                var index = bytes.readUInt8(i) % 26;
                setupID += chars.charAt(index);
            }
            return setupID;
        };
        if (!displayName)
            throw new Error("Accessories must be created with a non-empty displayName.");
        if (!UUID)
            throw new Error("Accessories must be created with a valid UUID.");
        if (!uuid.isValid(UUID))
            throw new Error("UUID '" + UUID + "' is not a valid UUID. Try using the provided 'generateUUID' function to create a valid UUID from any arbitrary string, like a serial number.");
        // create our initial "Accessory Information" Service that all Accessories are expected to have
        _this.addService(Service_1.Service.AccessoryInformation)
            .setCharacteristic(Characteristic_1.Characteristic.Name, displayName);
        // sign up for when iOS attempts to "set" the Identify characteristic - this means a paired device wishes
        // for us to identify ourselves (as opposed to an unpaired device - that case is handled by HAPServer 'identify' event)
        _this.getService(Service_1.Service.AccessoryInformation)
            .getCharacteristic(Characteristic_1.Characteristic.Identify)
            .on("set" /* SET */, function (value, callback) {
            if (value) {
                var paired = true;
                _this._identificationRequest(paired, callback);
            }
        });
        return _this;
    }
    Accessory.prototype.getServiceById = function (uuid, subType) {
        for (var index in this.services) {
            var service = this.services[index];
            if (typeof uuid === "string" && (service.displayName === uuid || service.name === uuid) && service.subtype === subType) {
                return service;
            }
            else if (typeof uuid === "function" && ((service instanceof uuid) || (uuid.UUID === service.UUID)) && service.subtype === subType) {
                return service;
            }
        }
        return undefined;
    };
    /**
     * Method is used to configure an old style CameraSource.
     * The CameraSource API was fully replaced by the new Controller API used by {@link CameraController}.
     * The {@link CameraStreamingDelegate} used by the CameraController is the equivalent to the old CameraSource.
     *
     * The new Controller API is much more refined and robust way of "grouping" services together.
     * It especially is intended to fully support serialization/deserialization to/from persistent storage.
     * This feature is also gained when using the old style CameraSource API.
     * The {@link CameraStreamingDelegate} improves on the overall camera API though and provides some reworked
     * type definitions and a refined callback interface to better signal errors to the requesting HomeKit device.
     * It is advised to update to it.
     *
     * Full backwards compatibility is currently maintained. A legacy CameraSource will be wrapped into an Adapter.
     * All legacy StreamControllers in the "streamControllers" property will be replaced by CameraRTPManagement instances.
     * Any services in the "services" property which are one of the following are ignored:
     *     - CameraRTPStreamManagement
     *     - CameraOperatingMode
     *     - CameraEventRecordingManagement
     *
     * @param cameraSource {LegacyCameraSource}
     * @deprecated please refer to the new {@see CameraController} API and {@link configureController}
     */
    Accessory.prototype.configureCameraSource = function (cameraSource) {
        var _this = this;
        if (cameraSource.streamControllers.length === 0) {
            throw new Error("Malformed legacy CameraSource. Did not expose any StreamControllers!");
        }
        var options = cameraSource.streamControllers[0].options; // grab options from one of the StreamControllers
        var cameraControllerOptions = {
            cameraStreamCount: cameraSource.streamControllers.length,
            streamingOptions: options,
            delegate: new camera_1.LegacyCameraSourceAdapter(cameraSource),
        };
        var cameraController = new controller_1.CameraController(cameraControllerOptions, true); // create CameraController in legacy mode
        this.configureController(cameraController);
        // we try here to be as good as possibly of keeping current behaviour
        cameraSource.services.forEach(function (service) {
            if (service.UUID === HomeKit_1.CameraRTPStreamManagement.UUID || service.UUID === HomeKit_1.CameraOperatingMode.UUID
                || service.UUID === HomeKit_1.CameraEventRecordingManagement.UUID) {
                return; // ignore those services, as they get replaced by the RTPStreamManagement
            }
            // all other services get added. We can't really control possibly linking to any of those ignored services
            // so this is really only half baked stuff.
            _this.addService(service);
        });
        // replace stream controllers; basically only to still support the "forceStop" call
        cameraSource.streamControllers = cameraController.streamManagements;
        return cameraController; // return the reference for the controller (maybe this could be useful?)
    };
    /**
     * This method is used to setup a new Controller for this accessory. See {@see Controller} for a more detailed
     * explanation what a Controller is and what it is capable of.
     *
     * The controller can be passed as an instance of the class or as a constructor (without any necessary parameters)
     * for a new Controller.
     * Only one Controller of a given {@link ControllerType} can be configured for a given Accessory.
     *
     * When called, it will be checked if there are any services and persistent data the Controller (for the given
     * {@link ControllerType}) can be restored from. Otherwise the Controller will be created with new services.
     *
     *
     * @param controllerConstructor {Controller | ControllerConstructor}
     */
    Accessory.prototype.configureController = function (controllerConstructor) {
        var _this = this;
        var controller = typeof controllerConstructor === "function"
            ? new controllerConstructor() // any custom constructor arguments should be passed before using .bind(...)
            : controllerConstructor;
        if (this.controllers[controller.controllerType]) {
            throw new Error("A Controller with the type '" + controller.controllerType + "' was already added to the accessory " + this.displayName);
        }
        var savedServiceMap = this.serializedControllers && this.serializedControllers[controller.controllerType];
        var serviceMap;
        if (savedServiceMap) { // we found data to restore from
            var clonedServiceMap = clone_1.clone(savedServiceMap);
            var updatedServiceMap = controller.initWithServices(savedServiceMap); // init controller with existing services
            serviceMap = updatedServiceMap || savedServiceMap; // initWithServices could return a updated serviceMap, otherwise just use the existing one
            if (updatedServiceMap) { // controller returned a ServiceMap and thus signaled a updated set of services
                // clonedServiceMap is altered by this method, should not be touched again after this call (for the future people)
                this.handleUpdatedControllerServiceMap(clonedServiceMap, updatedServiceMap);
            }
            controller.configureServices(); // let the controller setup all its handlers
            // remove serialized data from our dictionary:
            delete this.serializedControllers[controller.controllerType];
            if (Object.entries(this.serializedControllers).length === 0) {
                this.serializedControllers = undefined;
            }
        }
        else {
            serviceMap = controller.constructServices(); // let the controller create his services
            controller.configureServices(); // let the controller setup all its handlers
            Object.values(serviceMap).forEach(function (service) {
                if (service) {
                    _this.addService(service);
                }
            });
        }
        // --- init handlers and setup context ---
        var context = {
            controller: controller,
            serviceMap: serviceMap,
        };
        if (controller_1.isSerializableController(controller)) {
            this.controllerStorage.trackController(controller);
        }
        if (controller.handleFactoryReset) { // if the controller implements handleFactoryReset, setup event handlers for this controller
            this.getPrimaryAccessory().on("unpaired" /* UNPAIRED */, function () {
                controller.handleFactoryReset();
                if (controller_1.isSerializableController(controller)) { // we force a purge here
                    _this.controllerStorage.purgeControllerData(controller);
                }
            });
        }
        this.controllers[controller.controllerType] = context;
        if (controller instanceof controller_1.CameraController) { // save CameraController for Snapshot handling
            this.activeCameraController = controller;
        }
    };
    Accessory.prototype.handleUpdatedControllerServiceMap = function (originalServiceMap, updatedServiceMap) {
        var _this = this;
        updatedServiceMap = clone_1.clone(updatedServiceMap); // clone it so we can alter it
        Object.keys(originalServiceMap).forEach(function (name) {
            var service = originalServiceMap[name];
            var updatedService = updatedServiceMap[name];
            if (service && updatedService) { // we check all names contained in both ServiceMaps for changes
                delete originalServiceMap[name]; // delete from original ServiceMap so it will only contain deleted services at the end
                delete updatedServiceMap[name]; // delete from updated ServiceMap so it will only contain added services at the end
                if (service !== updatedService) {
                    _this.removeService(service);
                    _this.addService(updatedService);
                }
            }
        });
        // now originalServiceMap contains only deleted services and updateServiceMap only added services
        Object.values(originalServiceMap).forEach(function (service) {
            if (service) {
                _this.removeService(service);
            }
        });
        Object.values(updatedServiceMap).forEach(function (service) {
            if (service) {
                _this.addService(service);
            }
        });
    };
    /**
     * This method is called right before the accessory is published. It should be used to check for common
     * mistakes in Accessory structured, which may lead to HomeKit rejecting the accessory when pairing.
     * If it is called on a bridge it will call this method for all bridged accessories.
     */
    Accessory.prototype.validateAccessory = function () {
        var _this = this;
        var service = this.getService(Service_1.Service.AccessoryInformation);
        if (!service) {
            console.log("HAP-NodeJS WARNING: The accessory '" + this.displayName + "' is getting published without a AccessoryInformation service. " +
                "This might prevent the accessory from being added to the Home app or leading to the accessory being unresponsive!");
        }
        else {
            var checkValue = function (name, value) {
                if (!value) {
                    console.log("HAP-NodeJS WARNING: The accessory '" + _this.displayName + "' is getting published with the characteristic '" + name + "'" +
                        " (of the AccessoryInformation service) not having a value set. " +
                        "This might prevent the accessory from being added to the Home App or leading to the accessory being unresponsive!");
                }
            };
            var manufacturer = service.getCharacteristic(Characteristic_1.Characteristic.Manufacturer).value;
            var model = service.getCharacteristic(Characteristic_1.Characteristic.Model).value;
            var serialNumber = service.getCharacteristic(Characteristic_1.Characteristic.SerialNumber).value;
            var firmwareRevision = service.getCharacteristic(Characteristic_1.Characteristic.FirmwareRevision).value;
            var name = service.getCharacteristic(Characteristic_1.Characteristic.Name).value;
            checkValue("Manufacturer", manufacturer);
            checkValue("Model", model);
            checkValue("SerialNumber", serialNumber);
            checkValue("FirmwareRevision", firmwareRevision);
            checkValue("Name", name);
        }
        if (this.bridged) {
            this.bridgedAccessories.forEach(function (accessory) { return accessory.validateAccessory(); });
        }
    };
    Accessory.prototype._handleResource = function (data, callback) {
        if (data["resource-type"] === "image" /* IMAGE */) {
            var aid = data.aid; // aid is optionally supplied by HomeKit (for example when camera is bridged, multiple cams, etc)
            var controller = undefined;
            if (aid) {
                if (this.aid === aid && this.activeCameraController) { // bridge is probably not a camera but it is possible in theory
                    controller = this.activeCameraController;
                }
                else {
                    var accessory = this.getBridgedAccessoryByAID(aid);
                    if (accessory && accessory.activeCameraController) {
                        controller = accessory.activeCameraController;
                    }
                }
            }
            else if (this.activeCameraController) { // aid was not supplied, check if this accessory is a camera
                controller = this.activeCameraController;
            }
            if (!controller) {
                callback(new Error("resource not found"));
                return;
            }
            controller.handleSnapshotRequest(data["image-height"], data["image-width"], callback);
            return;
        }
        callback(new Error('unsupported image type: ' + data["resource-type"]));
    };
    // serialization and deserialization functions, mainly designed for homebridge to create a json copy to store on disk
    Accessory.serialize = function (accessory) {
        var json = {
            displayName: accessory.displayName,
            UUID: accessory.UUID,
            lastKnownUsername: accessory._accessoryInfo ? accessory._accessoryInfo.username : undefined,
            category: accessory.category,
            services: [],
        };
        var linkedServices = {};
        var hasLinkedServices = false;
        accessory.services.forEach(function (service) {
            json.services.push(Service_1.Service.serialize(service));
            var linkedServicesPresentation = [];
            service.linkedServices.forEach(function (linkedService) {
                linkedServicesPresentation.push(linkedService.getServiceId());
            });
            if (linkedServicesPresentation.length > 0) {
                linkedServices[service.getServiceId()] = linkedServicesPresentation;
                hasLinkedServices = true;
            }
        });
        if (hasLinkedServices) {
            json.linkedServices = linkedServices;
        }
        var controllers = [];
        // save controllers
        Object.entries(accessory.controllers).forEach(function (_a) {
            var key = _a[0], context = _a[1];
            controllers.push({
                type: context.controller.controllerType,
                services: Accessory.serializeServiceMap(context.serviceMap),
            });
        });
        // also save controller which didn't get initialized (could lead to service duplication if we throw that data away)
        accessory.serializedControllers && Object.entries(accessory.serializedControllers).forEach(function (_a) {
            var type = _a[0], serviceMap = _a[1];
            controllers.push({
                type: type,
                services: Accessory.serializeServiceMap(serviceMap),
            });
        });
        if (controllers.length > 0) {
            json.controllers = controllers;
        }
        return json;
    };
    Accessory.deserialize = function (json) {
        var accessory = new Accessory(json.displayName, json.UUID);
        accessory.lastKnownUsername = json.lastKnownUsername;
        accessory.category = json.category;
        var services = [];
        var servicesMap = {};
        json.services.forEach(function (serialized) {
            var service = Service_1.Service.deserialize(serialized);
            services.push(service);
            servicesMap[service.getServiceId()] = service;
        });
        if (json.linkedServices) {
            var _loop_1 = function (serviceId) {
                var primaryService = servicesMap[serviceId];
                var linkedServicesKeys = json.linkedServices[serviceId];
                if (!primaryService) {
                    return "continue";
                }
                linkedServicesKeys.forEach(function (linkedServiceKey) {
                    var linkedService = servicesMap[linkedServiceKey];
                    if (linkedService) {
                        primaryService.addLinkedService(linkedService);
                    }
                });
            };
            for (var serviceId in json.linkedServices) {
                _loop_1(serviceId);
            }
        }
        if (json.controllers) { // just save it for later if it exists {@see configureController}
            accessory.serializedControllers = {};
            json.controllers.forEach(function (serializedController) {
                accessory.serializedControllers[serializedController.type] = Accessory.deserializeServiceMap(serializedController.services, servicesMap);
            });
        }
        accessory._sideloadServices(services);
        return accessory;
    };
    Accessory.cleanupAccessoryData = function (username) {
        IdentifierCache_1.IdentifierCache.remove(username);
        AccessoryInfo_1.AccessoryInfo.remove(username);
        ControllerStorage_1.ControllerStorage.remove(username);
    };
    Accessory.serializeServiceMap = function (serviceMap) {
        var serialized = {};
        Object.entries(serviceMap).forEach(function (_a) {
            var name = _a[0], service = _a[1];
            if (!service) {
                return;
            }
            serialized[name] = service.getServiceId();
        });
        return serialized;
    };
    Accessory.deserializeServiceMap = function (serializedServiceMap, servicesMap) {
        var controllerServiceMap = {};
        Object.entries(serializedServiceMap).forEach(function (_a) {
            var name = _a[0], serviceId = _a[1];
            var service = servicesMap[serviceId];
            if (service) {
                controllerServiceMap[name] = service;
            }
        });
        return controllerServiceMap;
    };
    /**
     * @deprecated Please use the Categories const enum above. Scheduled to be removed in 2021-06.
     */
    // @ts-ignore
    Accessory.Categories = Categories;
    return Accessory;
}(EventEmitter_1.EventEmitter));
exports.Accessory = Accessory;
var numberPattern = /^-?\d+$/;
function hapStatus(err) {
    var errorValue = -70402 /* SERVICE_COMMUNICATION_FAILURE */;
    if (numberPattern.test(err.message)) {
        var value = parseInt(err.message);
        if (value >= -70401 /* INSUFFICIENT_PRIVILEGES */ && value <= -70411 /* INSUFFICIENT_AUTHORIZATION */) {
            errorValue = value;
        }
    }
    return errorValue;
}
//# sourceMappingURL=Accessory.js.map