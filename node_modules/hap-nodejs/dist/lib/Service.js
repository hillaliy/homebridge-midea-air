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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Service = exports.ServiceEventTypes = void 0;
var Characteristic_1 = require("./Characteristic");
var clone_1 = require("./util/clone");
var EventEmitter_1 = require("./EventEmitter");
var HomeKitTypes = __importStar(require("./gen"));
var uuid_1 = require("./util/uuid");
var MAX_CHARACTERISTICS = 100;
var ServiceEventTypes;
(function (ServiceEventTypes) {
    ServiceEventTypes["CHARACTERISTIC_CHANGE"] = "characteristic-change";
    ServiceEventTypes["SERVICE_CONFIGURATION_CHANGE"] = "service-configurationChange";
})(ServiceEventTypes = exports.ServiceEventTypes || (exports.ServiceEventTypes = {}));
/**
 * Service represents a set of grouped values necessary to provide a logical function. For instance, a
 * "Door Lock Mechanism" service might contain two values, one for the "desired lock state" and one for the
 * "current lock state". A particular Service is distinguished from others by its "type", which is a UUID.
 * HomeKit provides a set of known Service UUIDs defined in HomeKit.ts along with a corresponding
 * concrete subclass that you can instantiate directly to setup the necessary values. These natively-supported
 * Services are expected to contain a particular set of Characteristics.
 *
 * Unlike Characteristics, where you cannot have two Characteristics with the same UUID in the same Service,
 * you can actually have multiple Services with the same UUID in a single Accessory. For instance, imagine
 * a Garage Door Opener with both a "security light" and a "backlight" for the display. Each light could be
 * a "Lightbulb" Service with the same UUID. To account for this situation, we define an extra "subtype"
 * property on Service, that can be a string or other string-convertible object that uniquely identifies the
 * Service among its peers in an Accessory. For instance, you might have `service1.subtype = 'security_light'`
 * for one and `service2.subtype = 'backlight'` for the other.
 *
 * You can also define custom Services by providing your own UUID for the type that you generate yourself.
 * Custom Services can contain an arbitrary set of Characteristics, but Siri will likely not be able to
 * work with these.
 *
 * @event 'characteristic-change' => function({characteristic, oldValue, newValue, context}) { }
 *        Emitted after a change in the value of one of our Characteristics has occurred.
 */
var Service = /** @class */ (function (_super) {
    __extends(Service, _super);
    function Service(displayName, UUID, subtype) {
        if (displayName === void 0) { displayName = ""; }
        var _this = _super.call(this) || this;
        _this.displayName = displayName;
        _this.UUID = UUID;
        _this.subtype = subtype;
        // NOTICE: when adding/changing properties, remember to possibly adjust the serialize/deserialize functions
        _this.iid = null; // assigned later by our containing Accessory
        _this.name = null;
        _this.characteristics = [];
        _this.optionalCharacteristics = [];
        _this.isHiddenService = false;
        _this.isPrimaryService = false; // do not write to this directly
        _this.linkedServices = [];
        _this.addCharacteristic = function (characteristic) {
            var constructorArgs = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                constructorArgs[_i - 1] = arguments[_i];
            }
            // characteristic might be a constructor like `Characteristic.Brightness` instead of an instance
            // of Characteristic. Coerce if necessary.
            if (typeof characteristic === 'function') {
                characteristic = new (characteristic.bind.apply(characteristic, __spreadArrays([void 0], constructorArgs)))();
            }
            // check for UUID conflict
            for (var index in _this.characteristics) {
                var existing = _this.characteristics[index];
                if (existing.UUID === characteristic.UUID) {
                    if (characteristic.UUID === '00000052-0000-1000-8000-0026BB765291') {
                        //This is a special workaround for the Firmware Revision characteristic.
                        return existing;
                    }
                    throw new Error("Cannot add a Characteristic with the same UUID as another Characteristic in this Service: " + existing.UUID);
                }
            }
            if (_this.characteristics.length >= MAX_CHARACTERISTICS) {
                throw new Error("Cannot add more than " + MAX_CHARACTERISTICS + " characteristics to a single service!");
            }
            // listen for changes in characteristics and bubble them up
            characteristic.on("change" /* CHANGE */, function (change) {
                // make a new object with the relevant characteristic added, and bubble it up
                _this.emit("characteristic-change" /* CHARACTERISTIC_CHANGE */, clone_1.clone(change, { characteristic: characteristic }));
            });
            _this.characteristics.push(characteristic);
            _this.emit("service-configurationChange" /* SERVICE_CONFIGURATION_CHANGE */, clone_1.clone({ service: _this }));
            return characteristic;
        };
        /**
         * Sets this service as the new primary service.
         * Any currently active primary service will be reset to be not primary.
         * This will happen immediately, if the service was already added to an accessory, or later
         * when the service gets added to an accessory.
         *
         * @param isPrimary {boolean} - optional boolean (default true) if the service should be the primary service
         */
        _this.setPrimaryService = function (isPrimary) {
            if (isPrimary === void 0) { isPrimary = true; }
            _this.isPrimaryService = isPrimary;
            _this.emit("service-configurationChange" /* SERVICE_CONFIGURATION_CHANGE */, clone_1.clone({ service: _this }));
        };
        /**
         * Marks the service as hidden
         *
         * @param isHidden {boolean} - optional boolean (default true) if the service should be marked hidden
         */
        _this.setHiddenService = function (isHidden) {
            if (isHidden === void 0) { isHidden = true; }
            _this.isHiddenService = isHidden;
            _this.emit("service-configurationChange" /* SERVICE_CONFIGURATION_CHANGE */, clone_1.clone({ service: _this }));
        };
        //Allows setting other services that link to this one.
        _this.addLinkedService = function (newLinkedService) {
            //TODO: Add a check if the service is on the same accessory.
            if (!_this.linkedServices.includes(newLinkedService))
                _this.linkedServices.push(newLinkedService);
            _this.emit("service-configurationChange" /* SERVICE_CONFIGURATION_CHANGE */, clone_1.clone({ service: _this }));
        };
        _this.removeLinkedService = function (oldLinkedService) {
            //TODO: Add a check if the service is on the same accessory.
            if (_this.linkedServices.includes(oldLinkedService))
                _this.linkedServices.splice(_this.linkedServices.indexOf(oldLinkedService), 1);
            _this.emit("service-configurationChange" /* SERVICE_CONFIGURATION_CHANGE */, clone_1.clone({ service: _this }));
        };
        _this.removeCharacteristic = function (characteristic) {
            var targetCharacteristicIndex;
            for (var index in _this.characteristics) {
                var existingCharacteristic = _this.characteristics[index];
                if (existingCharacteristic === characteristic) {
                    targetCharacteristicIndex = index;
                    break;
                }
            }
            if (targetCharacteristicIndex) {
                _this.characteristics.splice(Number.parseInt(targetCharacteristicIndex), 1);
                characteristic.removeAllListeners();
                _this.emit("service-configurationChange" /* SERVICE_CONFIGURATION_CHANGE */, clone_1.clone({ service: _this }));
            }
        };
        _this.testCharacteristic = function (name) {
            // checks for the existence of a characteristic object in the service
            var index, characteristic;
            for (index in _this.characteristics) {
                characteristic = _this.characteristics[index];
                if (typeof name === 'string' && characteristic.displayName === name) {
                    return true;
                }
                else if (typeof name === 'function' && ((characteristic instanceof name) || (name.UUID === characteristic.UUID))) {
                    return true;
                }
            }
            return false;
        };
        _this.setCharacteristic = function (name, value) {
            _this.getCharacteristic(name).setValue(value);
            return _this; // for chaining
        };
        // A function to only updating the remote value, but not firing the 'set' event.
        _this.updateCharacteristic = function (name, value) {
            _this.getCharacteristic(name).updateValue(value);
            return _this;
        };
        _this.addOptionalCharacteristic = function (characteristic) {
            // characteristic might be a constructor like `Characteristic.Brightness` instead of an instance
            // of Characteristic. Coerce if necessary.
            if (typeof characteristic === 'function') {
                // @ts-ignore we are dealing with predefined characteristics here
                characteristic = new characteristic();
            }
            _this.optionalCharacteristics.push(characteristic);
        };
        _this.getCharacteristicByIID = function (iid) {
            for (var index in _this.characteristics) {
                var characteristic = _this.characteristics[index];
                if (characteristic.iid === iid)
                    return characteristic;
            }
        };
        _this._assignIDs = function (identifierCache, accessoryName, baseIID) {
            if (baseIID === void 0) { baseIID = 0; }
            // the Accessory Information service must have a (reserved by IdentifierCache) ID of 1
            if (_this.UUID === '0000003E-0000-1000-8000-0026BB765291') {
                _this.iid = 1;
            }
            else {
                // assign our own ID based on our UUID
                _this.iid = baseIID + identifierCache.getIID(accessoryName, _this.UUID, _this.subtype);
            }
            // assign IIDs to our Characteristics
            for (var index in _this.characteristics) {
                var characteristic = _this.characteristics[index];
                characteristic._assignID(identifierCache, accessoryName, _this.UUID, _this.subtype);
            }
        };
        /**
         * Returns a JSON representation of this Accessory suitable for delivering to HAP clients.
         */
        _this.toHAP = function (opt) {
            var characteristicsHAP = [];
            for (var index in _this.characteristics) {
                var characteristic = _this.characteristics[index];
                characteristicsHAP.push(characteristic.toHAP(opt));
            }
            var hap = {
                iid: _this.iid,
                type: uuid_1.toShortForm(_this.UUID, HomeKitTypes.BASE_UUID),
                characteristics: characteristicsHAP
            };
            if (_this.isPrimaryService) {
                hap['primary'] = _this.isPrimaryService;
            }
            if (_this.isHiddenService) {
                hap['hidden'] = _this.isHiddenService;
            }
            if (_this.linkedServices.length > 0) {
                hap['linked'] = [];
                for (var index in _this.linkedServices) {
                    var otherService = _this.linkedServices[index];
                    hap['linked'].push(otherService.iid);
                }
            }
            return hap;
        };
        _this._setupCharacteristic = function (characteristic) {
            // listen for changes in characteristics and bubble them up
            characteristic.on("change" /* CHANGE */, function (change) {
                // make a new object with the relevant characteristic added, and bubble it up
                _this.emit("characteristic-change" /* CHARACTERISTIC_CHANGE */, clone_1.clone(change, { characteristic: characteristic }));
            });
        };
        _this._sideloadCharacteristics = function (targetCharacteristics) {
            for (var index in targetCharacteristics) {
                var target = targetCharacteristics[index];
                _this._setupCharacteristic(target);
            }
            _this.characteristics = targetCharacteristics.slice();
        };
        if (!UUID)
            throw new Error("Services must be created with a valid UUID.");
        // every service has an optional Characteristic.Name property - we'll set it to our displayName
        // if one was given
        // if you don't provide a display name, some HomeKit apps may choose to hide the device.
        if (displayName) {
            // create the characteristic if necessary
            var nameCharacteristic = _this.getCharacteristic(Characteristic_1.Characteristic.Name) ||
                _this.addCharacteristic(Characteristic_1.Characteristic.Name);
            nameCharacteristic.setValue(displayName);
        }
        return _this;
    }
    /**
     * Returns an id which uniquely identifies an service on the associated accessory.
     * The serviceId is a concatenation of the UUID for the service (defined by HAP) and the subtype (could be empty)
     * which is programmatically defined by the programmer.
     *
     * @returns the serviceId
     */
    Service.prototype.getServiceId = function () {
        return this.UUID + (this.subtype || "");
    };
    Service.prototype.getCharacteristic = function (name) {
        // returns a characteristic object from the service
        // If  Service.prototype.getCharacteristic(Characteristic.Type)  does not find the characteristic,
        // but the type is in optionalCharacteristics, it adds the characteristic.type to the service and returns it.
        var index, characteristic;
        for (index in this.characteristics) {
            characteristic = this.characteristics[index];
            if (typeof name === 'string' && characteristic.displayName === name) {
                return characteristic;
            }
            else if (typeof name === 'function' && ((characteristic instanceof name) || (name.UUID === characteristic.UUID))) {
                return characteristic;
            }
        }
        if (typeof name === 'function') {
            for (index in this.optionalCharacteristics) {
                characteristic = this.optionalCharacteristics[index];
                if ((characteristic instanceof name) || (name.UUID === characteristic.UUID)) {
                    return this.addCharacteristic(name);
                }
            }
            // Not found in optional Characteristics. Adding anyway, but warning about it if it isn't the Name.
            if (name.UUID !== Characteristic_1.Characteristic.Name.UUID) {
                console.warn("HAP Warning: Characteristic %s not in required or optional characteristics for service %s. Adding anyway.", name.UUID, this.UUID);
            }
            return this.addCharacteristic(name);
        }
    };
    /**
     * This method was created to copy all characteristics from another service to this.
     * It's only adopting is currently in homebridge to merge the AccessoryInformation service. So some things
     * my be explicitly tailored towards this use case.
     *
     * It will not remove characteristics which are present currently but not added on the other characteristic.
     * It will not replace the characteristic if the value is falsey (except of '0' or 'false')
     * @param service
     */
    Service.prototype.replaceCharacteristicsFromService = function (service) {
        var _this = this;
        if (this.UUID !== service.UUID) {
            throw new Error("Incompatible services. Tried replacing characteristics of " + this.UUID + " with characteristics from " + service.UUID);
        }
        var foreignCharacteristics = {}; // index foreign characteristics by UUID
        service.characteristics.forEach(function (characteristic) { return foreignCharacteristics[characteristic.UUID] = characteristic; });
        this.characteristics.forEach(function (characteristic) {
            var foreignCharacteristic = foreignCharacteristics[characteristic.UUID];
            if (foreignCharacteristic) {
                delete foreignCharacteristics[characteristic.UUID];
                if (!foreignCharacteristic.value && foreignCharacteristic.value !== 0 && foreignCharacteristic.value !== false) {
                    return; // ignore falsey values expect if its the number zero or literally false
                }
                characteristic.props = foreignCharacteristic.props;
                characteristic.updateValue(foreignCharacteristic.value);
                var getListeners = foreignCharacteristic.listeners("get" /* GET */);
                if (getListeners.length) {
                    // the callback can only be called once so we remove all old listeners
                    characteristic.removeAllListeners("get" /* GET */);
                    getListeners.forEach(function (listener) { return characteristic.addListener("get" /* GET */, listener); });
                }
                var setListeners = foreignCharacteristic.listeners("set" /* SET */);
                if (setListeners.length) {
                    // the callback can only be called once so we remove all old listeners
                    characteristic.removeAllListeners("set" /* SET */);
                    setListeners.forEach(function (listener) { return characteristic.addListener("set" /* SET */, listener); });
                }
            }
        });
        // add all additional characteristics which where not present already
        Object.values(foreignCharacteristics).forEach(function (characteristic) { return _this.addCharacteristic(characteristic); });
    };
    Service.serialize = function (service) {
        return {
            displayName: service.displayName,
            UUID: service.UUID,
            subtype: service.subtype,
            hiddenService: service.isHiddenService,
            primaryService: service.isPrimaryService,
            characteristics: service.characteristics.map(function (characteristic) { return Characteristic_1.Characteristic.serialize(characteristic); }),
            optionalCharacteristics: service.optionalCharacteristics.map(function (characteristic) { return Characteristic_1.Characteristic.serialize(characteristic); }),
        };
    };
    Service.deserialize = function (json) {
        var service = new Service(json.displayName, json.UUID, json.subtype);
        service.isHiddenService = !!json.hiddenService;
        service.isPrimaryService = !!json.primaryService;
        var characteristics = json.characteristics.map(function (serialized) { return Characteristic_1.Characteristic.deserialize(serialized); });
        service._sideloadCharacteristics(characteristics);
        if (json.optionalCharacteristics) {
            service.optionalCharacteristics = json.optionalCharacteristics.map(function (serialized) { return Characteristic_1.Characteristic.deserialize(serialized); });
        }
        return service;
    };
    return Service;
}(EventEmitter_1.EventEmitter));
exports.Service = Service;
//# sourceMappingURL=Service.js.map