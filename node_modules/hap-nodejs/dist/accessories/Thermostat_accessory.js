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
Object.defineProperty(exports, "__esModule", { value: true });
exports.accessory = void 0;
// HomeKit types required
var types = __importStar(require("./types"));
var execute = function (accessory, characteristic, value) {
    console.log("executed accessory: " + accessory + ", and characteristic: " + characteristic + ", with value: " + value + ".");
};
exports.accessory = {
    displayName: "Thermostat 1",
    username: "CA:3E:BC:4D:5E:FF",
    pincode: "031-45-154",
    category: 9 /* THERMOSTAT */,
    services: [{
            sType: types.ACCESSORY_INFORMATION_STYPE,
            characteristics: [{
                    cType: types.NAME_CTYPE,
                    onUpdate: null,
                    perms: ["pr"],
                    format: "string",
                    initialValue: "Thermostat 1",
                    supportEvents: false,
                    supportBonjour: false,
                    manfDescription: "Bla",
                    designedMaxLength: 255
                }, {
                    cType: types.MANUFACTURER_CTYPE,
                    onUpdate: null,
                    perms: ["pr"],
                    format: "string",
                    initialValue: "Oltica",
                    supportEvents: false,
                    supportBonjour: false,
                    manfDescription: "Bla",
                    designedMaxLength: 255
                }, {
                    cType: types.MODEL_CTYPE,
                    onUpdate: null,
                    perms: ["pr"],
                    format: "string",
                    initialValue: "Rev-1",
                    supportEvents: false,
                    supportBonjour: false,
                    manfDescription: "Bla",
                    designedMaxLength: 255
                }, {
                    cType: types.SERIAL_NUMBER_CTYPE,
                    onUpdate: null,
                    perms: ["pr"],
                    format: "string",
                    initialValue: "A1S2NASF88EW",
                    supportEvents: false,
                    supportBonjour: false,
                    manfDescription: "Bla",
                    designedMaxLength: 255
                }, {
                    cType: types.FIRMWARE_REVISION_CTYPE,
                    onUpdate: null,
                    perms: ["pr"],
                    format: "string",
                    initialValue: "1.0.0",
                    supportEvents: false,
                    supportBonjour: false,
                    manfDescription: "Bla",
                    designedMaxLength: 255
                }, {
                    cType: types.IDENTIFY_CTYPE,
                    onUpdate: null,
                    perms: ["pw"],
                    format: "bool",
                    initialValue: false,
                    supportEvents: false,
                    supportBonjour: false,
                    manfDescription: "Identify Accessory",
                    designedMaxLength: 1
                }]
        }, {
            sType: types.THERMOSTAT_STYPE,
            characteristics: [{
                    cType: types.NAME_CTYPE,
                    onUpdate: null,
                    perms: ["pr"],
                    format: "string",
                    initialValue: "Thermostat Control",
                    supportEvents: false,
                    supportBonjour: false,
                    manfDescription: "Bla",
                    designedMaxLength: 255
                }, {
                    cType: types.CURRENTHEATINGCOOLING_CTYPE,
                    onUpdate: function (value) { console.log("Change:", value); execute("Thermostat", "Current HC", value); },
                    perms: ["pr", "ev"],
                    format: "uint8",
                    initialValue: 0,
                    supportEvents: false,
                    supportBonjour: false,
                    manfDescription: "Current Mode",
                    designedMaxLength: 1,
                    designedMinValue: 0,
                    designedMaxValue: 2,
                    designedMinStep: 1,
                }, {
                    cType: types.TARGETHEATINGCOOLING_CTYPE,
                    onUpdate: function (value) { console.log("Change:", value); execute("Thermostat", "Target HC", value); },
                    perms: ["pw", "pr", "ev"],
                    format: "uint8",
                    initialValue: 0,
                    supportEvents: false,
                    supportBonjour: false,
                    manfDescription: "Target Mode",
                    designedMinValue: 0,
                    designedMaxValue: 3,
                    designedMinStep: 1,
                }, {
                    cType: types.CURRENT_TEMPERATURE_CTYPE,
                    onUpdate: function (value) { console.log("Change:", value); execute("Thermostat", "Current Temperature", value); },
                    perms: ["pr", "ev"],
                    format: "float",
                    initialValue: 20,
                    supportEvents: false,
                    supportBonjour: false,
                    manfDescription: "Current Temperature",
                    unit: "celsius"
                }, {
                    cType: types.TARGET_TEMPERATURE_CTYPE,
                    onUpdate: function (value) { console.log("Change:", value); execute("Thermostat", "Target Temperature", value); },
                    perms: ["pw", "pr", "ev"],
                    format: "float",
                    initialValue: 20,
                    supportEvents: false,
                    supportBonjour: false,
                    manfDescription: "Target Temperature",
                    designedMinValue: 16,
                    designedMaxValue: 38,
                    designedMinStep: 1,
                    unit: "celsius"
                }, {
                    cType: types.TEMPERATURE_UNITS_CTYPE,
                    onUpdate: function (value) { console.log("Change:", value); execute("Thermostat", "Unit", value); },
                    perms: ["pw", "pr", "ev"],
                    format: "uint8",
                    initialValue: 0,
                    supportEvents: false,
                    supportBonjour: false,
                    manfDescription: "Unit"
                }]
        }]
};
//# sourceMappingURL=Thermostat_accessory.js.map