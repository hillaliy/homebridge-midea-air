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
exports.Characteristic = exports.CharacteristicEventTypes = exports.Access = exports.Perms = exports.Units = exports.Formats = void 0;
var decimal_js_1 = __importDefault(require("decimal.js"));
var once_1 = require("./util/once");
var clone_1 = require("./util/clone");
var EventEmitter_1 = require("./EventEmitter");
var HomeKitTypes = __importStar(require("./gen"));
var uuid_1 = require("./util/uuid");
var Formats;
(function (Formats) {
    Formats["BOOL"] = "bool";
    Formats["INT"] = "int";
    Formats["FLOAT"] = "float";
    Formats["STRING"] = "string";
    Formats["UINT8"] = "uint8";
    Formats["UINT16"] = "uint16";
    Formats["UINT32"] = "uint32";
    Formats["UINT64"] = "uint64";
    Formats["DATA"] = "data";
    Formats["TLV8"] = "tlv8";
    Formats["ARRAY"] = "array";
    Formats["DICTIONARY"] = "dict";
})(Formats = exports.Formats || (exports.Formats = {}));
var Units;
(function (Units) {
    Units["CELSIUS"] = "celsius";
    Units["PERCENTAGE"] = "percentage";
    Units["ARC_DEGREE"] = "arcdegrees";
    Units["LUX"] = "lux";
    Units["SECONDS"] = "seconds";
})(Units = exports.Units || (exports.Units = {}));
// Known HomeKit permission types
var Perms;
(function (Perms) {
    /**
     * @deprecated replaced by {@link PAIRED_READ}. Kept for backwards compatibility.
     */
    Perms["READ"] = "pr";
    /**
     * @deprecated replaced by {@link PAIRED_WRITE}. Kept for backwards compatibility.
     */
    Perms["WRITE"] = "pw";
    Perms["PAIRED_READ"] = "pr";
    Perms["PAIRED_WRITE"] = "pw";
    Perms["NOTIFY"] = "ev";
    Perms["EVENTS"] = "ev";
    Perms["ADDITIONAL_AUTHORIZATION"] = "aa";
    Perms["TIMED_WRITE"] = "tw";
    Perms["HIDDEN"] = "hd";
    Perms["WRITE_RESPONSE"] = "wr";
})(Perms = exports.Perms || (exports.Perms = {}));
var Access;
(function (Access) {
    Access[Access["READ"] = 0] = "READ";
    Access[Access["WRITE"] = 1] = "WRITE";
    Access[Access["NOTIFY"] = 2] = "NOTIFY";
})(Access = exports.Access || (exports.Access = {}));
var CharacteristicEventTypes;
(function (CharacteristicEventTypes) {
    CharacteristicEventTypes["GET"] = "get";
    CharacteristicEventTypes["SET"] = "set";
    CharacteristicEventTypes["SUBSCRIBE"] = "subscribe";
    CharacteristicEventTypes["UNSUBSCRIBE"] = "unsubscribe";
    CharacteristicEventTypes["CHANGE"] = "change";
})(CharacteristicEventTypes = exports.CharacteristicEventTypes || (exports.CharacteristicEventTypes = {}));
/**
 * Characteristic represents a particular typed variable that can be assigned to a Service. For instance, a
 * "Hue" Characteristic might store a 'float' value of type 'arcdegrees'. You could add the Hue Characteristic
 * to a Service in order to store that value. A particular Characteristic is distinguished from others by its
 * UUID. HomeKit provides a set of known Characteristic UUIDs defined in HomeKit.ts along with a
 * corresponding concrete subclass.
 *
 * You can also define custom Characteristics by providing your own UUID. Custom Characteristics can be added
 * to any native or custom Services, but Siri will likely not be able to work with these.
 *
 * Note that you can get the "value" of a Characteristic by accessing the "value" property directly, but this
 * is really a "cached value". If you want to fetch the latest value, which may involve doing some work, then
 * call getValue().
 *
 * @event 'get' => function(callback(err, newValue), context) { }
 *        Emitted when someone calls getValue() on this Characteristic and desires the latest non-cached
 *        value. If there are any listeners to this event, one of them MUST call the callback in order
 *        for the value to ever be delivered. The `context` object is whatever was passed in by the initiator
 *        of this event (for instance whomever called `getValue`).
 *
 * @event 'set' => function(newValue, callback(err), context) { }
 *        Emitted when someone calls setValue() on this Characteristic with a desired new value. If there
 *        are any listeners to this event, one of them MUST call the callback in order for this.value to
 *        actually be set. The `context` object is whatever was passed in by the initiator of this change
 *        (for instance, whomever called `setValue`).
 *
 * @event 'change' => function({ oldValue, newValue, context }) { }
 *        Emitted after a change in our value has occurred. The new value will also be immediately accessible
 *        in this.value. The event object contains the new value as well as the context object originally
 *        passed in by the initiator of this change (if known).
 */
var Characteristic = /** @class */ (function (_super) {
    __extends(Characteristic, _super);
    function Characteristic(displayName, UUID, props) {
        var _this = _super.call(this) || this;
        _this.displayName = displayName;
        _this.UUID = UUID;
        // NOTICE: when adding/changing properties, remember to possibly adjust the serialize/deserialize functions
        _this.iid = null;
        _this.value = null;
        _this.status = null;
        _this.eventOnlyCharacteristic = false;
        _this.subscriptions = 0;
        /**
         * Copies the given properties to our props member variable,
         * and returns 'this' for chaining.
         *
         * @param 'props' {
         *   format: <one of Formats>,
         *   unit: <one of Characteristic.Units>,
         *   perms: array of [Characteristic.Perms] like [Characteristic.Perms.READ, Characteristic.Perms.WRITE]
         *   ev: <Event Notifications Enabled Boolean>, (Optional)
         *   description: <String of description>, (Optional)
         *   minValue: <minimum value for numeric characteristics>, (Optional)
         *   maxValue: <maximum value for numeric characteristics>, (Optional)
         *   minStep: <smallest allowed increment for numeric characteristics>, (Optional)
         *   maxLen: <max length of string up to 256>, (Optional default: 64)
         *   maxDataLen: <max length of data>, (Optional default: 2097152)
         *   valid-values: <array of numbers>, (Optional)
         *   valid-values-range: <array of two numbers for start and end range> (Optional)
         * }
         */
        _this.setProps = function (props) {
            for (var key in (props || {}))
                if (Object.prototype.hasOwnProperty.call(props, key)) {
                    // @ts-ignore
                    _this.props[key] = props[key];
                }
            if (_this.props.minValue != null && _this.props.maxValue != null) { // the eqeq instead of eqeqeq is important here
                if (_this.props.minValue > _this.props.maxValue) { // preventing DOS attack, see https://github.com/homebridge/HAP-NodeJS/issues/690
                    _this.props.minValue = undefined;
                    _this.props.maxValue = undefined;
                    throw new Error("Error setting CharacteristicsProps for '" + _this.displayName + "': 'minValue' cannot be greater or equal the 'maxValue'!");
                }
            }
            return _this;
        };
        _this.subscribe = function () {
            if (_this.subscriptions === 0) {
                _this.emit("subscribe" /* SUBSCRIBE */);
            }
            _this.subscriptions++;
        };
        _this.unsubscribe = function () {
            var wasOne = _this.subscriptions === 1;
            _this.subscriptions--;
            _this.subscriptions = Math.max(_this.subscriptions, 0);
            if (wasOne) {
                _this.emit("unsubscribe" /* UNSUBSCRIBE */);
            }
        };
        _this.getValue = function (callback, context, connectionID) {
            // Handle special event only characteristics.
            if (_this.eventOnlyCharacteristic === true) {
                if (callback) {
                    callback(null, null);
                }
                return;
            }
            if (_this.listeners("get" /* GET */).length > 0) {
                // allow a listener to handle the fetching of this value, and wait for completion
                _this.emit("get" /* GET */, once_1.once(function (err, newValue) {
                    _this.status = err;
                    if (err) {
                        // pass the error along to our callback
                        if (callback)
                            callback(err);
                    }
                    else {
                        newValue = _this.validateValue(newValue); //validateValue returns a value that has be cooerced into a valid value.
                        if (newValue === undefined || newValue === null)
                            newValue = _this.getDefaultValue();
                        // getting the value was a success; we can pass it along and also update our cached value
                        var oldValue = _this.value;
                        _this.value = newValue;
                        if (callback)
                            callback(null, newValue);
                        // emit a change event if necessary
                        if (oldValue !== newValue)
                            _this.emit("change" /* CHANGE */, { oldValue: oldValue, newValue: newValue, context: context });
                    }
                }), context, connectionID);
            }
            else {
                // no one is listening to the 'get' event, so just return the cached value
                if (callback)
                    callback(_this.status, _this.value);
            }
        };
        _this.validateValue = function (newValue) {
            var isNumericType = false;
            var minValue_resolved = 0;
            var maxValue_resolved = 0;
            var minStep_resolved = undefined;
            var stepDecimals = 0;
            switch (_this.props.format) {
                case "int" /* INT */:
                    minStep_resolved = 1;
                    minValue_resolved = -2147483648;
                    maxValue_resolved = 2147483647;
                    isNumericType = true;
                    break;
                case "float" /* FLOAT */:
                    minStep_resolved = undefined;
                    minValue_resolved = undefined;
                    maxValue_resolved = undefined;
                    isNumericType = true;
                    break;
                case "uint8" /* UINT8 */:
                    minStep_resolved = 1;
                    minValue_resolved = 0;
                    maxValue_resolved = 255;
                    isNumericType = true;
                    break;
                case "uint16" /* UINT16 */:
                    minStep_resolved = 1;
                    minValue_resolved = 0;
                    maxValue_resolved = 65535;
                    isNumericType = true;
                    break;
                case "uint32" /* UINT32 */:
                    minStep_resolved = 1;
                    minValue_resolved = 0;
                    maxValue_resolved = 4294967295;
                    isNumericType = true;
                    break;
                case "uint64" /* UINT64 */:
                    minStep_resolved = 1;
                    minValue_resolved = 0;
                    maxValue_resolved = 18446744073709551615;
                    isNumericType = true;
                    break;
                //All of the following datatypes return from this switch.
                case "bool" /* BOOL */:
                    // @ts-ignore
                    return (newValue == true); //We don't need to make sure this returns true or false
                    break;
                case "string" /* STRING */:
                    var myString = newValue || ''; //If null or undefined or anything odd, make it a blank string
                    myString = String(myString);
                    var maxLength = _this.props.maxLen;
                    if (maxLength === undefined)
                        maxLength = 64; //Default Max Length is 64.
                    if (myString.length > maxLength)
                        myString = myString.substring(0, maxLength); //Truncate strings that are too long
                    return myString; //We don't need to do any validation after having truncated the string
                    break;
                case "data" /* DATA */:
                    var maxLength = _this.props.maxDataLen;
                    if (maxLength === undefined)
                        maxLength = 2097152; //Default Max Length is 2097152.
                    //if (newValue.length>maxLength) //I don't know the best way to handle this since it's unknown binary data.
                    //I suspect that it will crash HomeKit for this bridge if the length is too long.
                    return newValue;
                    break;
                case "tlv8" /* TLV8 */:
                    //Should we parse this to make sure the tlv8 is valid?
                    break;
                default: //Datatype out of HAP Spec encountered. We'll assume the developer knows what they're doing.
                    return newValue;
            }
            ;
            if (isNumericType) {
                if (newValue === false) {
                    return 0;
                }
                if (newValue === true) {
                    return 1;
                }
                if (isNaN(Number.parseInt(newValue, 10))) {
                    return _this.value;
                } //This is not a number so we'll just pass out the last value.
                if ((_this.props.maxValue && !isNaN(_this.props.maxValue)) && (_this.props.maxValue !== null))
                    maxValue_resolved = _this.props.maxValue;
                if ((_this.props.minValue && !isNaN(_this.props.minValue)) && (_this.props.minValue !== null))
                    minValue_resolved = _this.props.minValue;
                if ((_this.props.minStep && !isNaN(_this.props.minStep)) && (_this.props.minStep !== null))
                    minStep_resolved = _this.props.minStep;
                if (newValue < minValue_resolved)
                    newValue = minValue_resolved; //Fails Minimum Value Test
                if (newValue > maxValue_resolved)
                    newValue = maxValue_resolved; //Fails Maximum Value Test
                if (minStep_resolved !== undefined) {
                    //Determine how many decimals we need to display
                    if (Math.floor(minStep_resolved) === minStep_resolved)
                        stepDecimals = 0;
                    else
                        stepDecimals = minStep_resolved.toString().split(".")[1].length || 0;
                    //Use Decimal to detemine the lowest value within the step.
                    try {
                        var decimalVal = new decimal_js_1.default(parseFloat(newValue));
                        var decimalDiff = decimalVal.mod(minStep_resolved);
                        decimalVal = decimalVal.minus(decimalDiff);
                        if (stepDecimals === 0) {
                            newValue = parseInt(decimalVal.toFixed(0));
                        }
                        else {
                            newValue = parseFloat(decimalVal.toFixed(stepDecimals)); //Convert it to a fixed decimal
                        }
                    }
                    catch (e) {
                        return _this.value; //If we had an error, return the current value.
                    }
                }
                if (_this['valid-values'] !== undefined)
                    if (!_this['valid-values'].includes(newValue))
                        return _this.value; //Fails Valid Values Test
                if (_this['valid-values-range'] !== undefined) { //This is another way Apple has to handle min/max
                    if (newValue < _this['valid-values-range'][0])
                        newValue = _this['valid-values-range'][0];
                    if (newValue > _this['valid-values-range'][1])
                        newValue = _this['valid-values-range'][1];
                }
            }
            return newValue;
        };
        _this.setValue = function (newValue, callback, context, connectionID) {
            if (newValue instanceof Error) {
                _this.status = newValue;
            }
            else {
                _this.status = null;
            }
            newValue = _this.validateValue(newValue); //validateValue returns a value that has be cooerced into a valid value.
            var oldValue = _this.value;
            if (_this.listeners("set" /* SET */).length > 0) {
                // allow a listener to handle the setting of this value, and wait for completion
                _this.emit("set" /* SET */, newValue, once_1.once(function (err, writeResponse) {
                    _this.status = err;
                    if (err) {
                        // pass the error along to our callback
                        if (callback)
                            callback(err);
                    }
                    else {
                        if (writeResponse !== undefined && _this.props.perms.includes("wr" /* WRITE_RESPONSE */))
                            newValue = writeResponse; // support write response simply by letting the implementor pass the response as second argument to the callback
                        if (newValue === undefined || newValue === null)
                            newValue = _this.getDefaultValue();
                        // setting the value was a success; so we can cache it now
                        _this.value = newValue;
                        if (callback)
                            callback();
                        if (_this.eventOnlyCharacteristic === true || oldValue !== newValue)
                            _this.emit("change" /* CHANGE */, { oldValue: oldValue, newValue: newValue, context: context });
                    }
                }), context, connectionID);
            }
            else {
                if (newValue === undefined || newValue === null)
                    newValue = _this.getDefaultValue();
                // no one is listening to the 'set' event, so just assign the value blindly
                _this.value = newValue;
                if (callback)
                    callback();
                if (_this.eventOnlyCharacteristic === true || oldValue !== newValue)
                    _this.emit("change" /* CHANGE */, { oldValue: oldValue, newValue: newValue, context: context });
            }
            return _this; // for chaining
        };
        _this.updateValue = function (newValue, callback, context) {
            if (newValue instanceof Error) {
                _this.status = newValue;
            }
            else {
                _this.status = null;
            }
            newValue = _this.validateValue(newValue); //validateValue returns a value that has be cooerced into a valid value.
            if (newValue === undefined || newValue === null)
                newValue = _this.getDefaultValue();
            // no one is listening to the 'set' event, so just assign the value blindly
            var oldValue = _this.value;
            _this.value = newValue;
            if (callback)
                callback();
            if (_this.eventOnlyCharacteristic === true || oldValue !== newValue)
                _this.emit("change" /* CHANGE */, { oldValue: oldValue, newValue: newValue, context: context });
            return _this; // for chaining
        };
        _this.getDefaultValue = function () {
            switch (_this.props.format) {
                case "bool" /* BOOL */:
                    return false;
                case "string" /* STRING */:
                    return "";
                case "data" /* DATA */:
                    return null; // who knows!
                case "tlv8" /* TLV8 */:
                    return null; // who knows!
                case "dict" /* DICTIONARY */:
                    return {};
                case "array" /* ARRAY */:
                    return [];
                default:
                    return _this.props.minValue || 0;
            }
        };
        _this._assignID = function (identifierCache, accessoryName, serviceUUID, serviceSubtype) {
            // generate our IID based on our UUID
            _this.iid = identifierCache.getIID(accessoryName, serviceUUID, serviceSubtype, _this.UUID);
        };
        /**
         * Returns a JSON representation of this Accessory suitable for delivering to HAP clients.
         */
        _this.toHAP = function (opt) {
            // ensure our value fits within our constraints if present
            var value = _this.value;
            if (_this.props.minValue != null && value < _this.props.minValue)
                value = _this.props.minValue;
            if (_this.props.maxValue != null && value > _this.props.maxValue)
                value = _this.props.maxValue;
            if (_this.props.format != null) {
                if (_this.props.format === "int" /* INT */)
                    value = parseInt(value);
                else if (_this.props.format === "uint8" /* UINT8 */)
                    value = parseInt(value);
                else if (_this.props.format === "uint16" /* UINT16 */)
                    value = parseInt(value);
                else if (_this.props.format === "uint32" /* UINT32 */)
                    value = parseInt(value);
                else if (_this.props.format === "uint64" /* UINT64 */)
                    value = parseInt(value);
                else if (_this.props.format === "float" /* FLOAT */) {
                    value = parseFloat(value);
                    if (_this.props.minStep != null) {
                        var pow = Math.pow(10, decimalPlaces(_this.props.minStep));
                        value = Math.round(value * pow) / pow;
                    }
                }
            }
            if (_this.eventOnlyCharacteristic === true) {
                // @ts-ignore
                value = null;
            }
            var hap = {
                iid: _this.iid,
                type: uuid_1.toShortForm(_this.UUID, HomeKitTypes.BASE_UUID),
                perms: _this.props.perms,
                format: _this.props.format,
                value: value,
                description: _this.displayName,
            };
            if (_this.props.validValues != null && _this.props.validValues.length > 0) {
                hap['valid-values'] = _this.props.validValues;
            }
            if (_this.props.validValueRanges != null && _this.props.validValueRanges.length > 0 && !(_this.props.validValueRanges.length & 1)) {
                hap['valid-values-range'] = _this.props.validValueRanges;
            }
            // extra properties
            if (_this.props.unit != null)
                hap.unit = _this.props.unit;
            if (_this.props.maxValue != null)
                hap.maxValue = _this.props.maxValue;
            if (_this.props.minValue != null)
                hap.minValue = _this.props.minValue;
            if (_this.props.minStep != null)
                hap.minStep = _this.props.minStep;
            // add maxLen if string length is > 64 bytes and trim to max 256 bytes
            if (_this.props.format === "string" /* STRING */) {
                var str = Buffer.from(value, 'utf8'), len = str.byteLength;
                if (len > 256) { // 256 bytes is the max allowed length
                    hap.value = str.toString('utf8', 0, 256);
                    hap.maxLen = 256;
                }
                else if (len > 64) { // values below can be ommited
                    hap.maxLen = len;
                }
            }
            // if we're not readable, omit the "value" property - otherwise iOS will complain about non-compliance
            if (_this.props.perms.indexOf("pr" /* READ */) == -1)
                delete hap.value;
            // delete the "value" property anyway if we were asked to
            if (opt && opt.omitValues)
                delete hap.value;
            return hap;
        };
        // @ts-ignore
        _this.props = props || {
            format: null,
            unit: null,
            minValue: null,
            maxValue: null,
            minStep: null,
            perms: []
        };
        _this.setProps({}); // ensure sanity checks are called
        return _this;
    }
    /**
     * @deprecated Please use the Formats const enum above. Scheduled to be removed in 2021-06.
     */
    // @ts-ignore
    Characteristic.Formats = Formats;
    /**
     * @deprecated Please use the Units const enum above. Scheduled to be removed in 2021-06.
     */
    // @ts-ignore
    Characteristic.Units = Units;
    /**
     * @deprecated Please use the Perms const enum above. Scheduled to be removed in 2021-06.
     */
    // @ts-ignore
    Characteristic.Perms = Perms;
    Characteristic.serialize = function (characteristic) {
        return {
            displayName: characteristic.displayName,
            UUID: characteristic.UUID,
            props: clone_1.clone({}, characteristic.props),
            value: characteristic.value,
            eventOnlyCharacteristic: characteristic.eventOnlyCharacteristic,
        };
    };
    Characteristic.deserialize = function (json) {
        var characteristic = new Characteristic(json.displayName, json.UUID, json.props);
        characteristic.value = json.value;
        characteristic.eventOnlyCharacteristic = json.eventOnlyCharacteristic;
        return characteristic;
    };
    return Characteristic;
}(EventEmitter_1.EventEmitter));
exports.Characteristic = Characteristic;
// Mike Samuel
// http://stackoverflow.com/questions/10454518/javascript-how-to-retrieve-the-number-of-decimals-of-a-string-number
function decimalPlaces(num) {
    var match = ('' + num).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);
    if (!match) {
        return 0;
    }
    return Math.max(0, 
    // Number of digits right of decimal point.
    (match[1] ? match[1].length : 0)
        // Adjust for scientific notation.
        - (match[2] ? +match[2] : 0));
}
//# sourceMappingURL=Characteristic.js.map