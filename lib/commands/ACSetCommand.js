"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SetCommand_1 = __importDefault(require("../SetCommand"));
const MideaDeviceType_1 = require("../enums/MideaDeviceType");
class ACSetCommand extends SetCommand_1.default {
    constructor(device_type = MideaDeviceType_1.MideaDeviceType.AirConditioner) {
        super(device_type);
    }
    // Byte 0x0c
    get targetTemperature() {
        return this.data[0x0c] & 0x1f;
    }
    set targetTemperature(temperatureCelsius) {
        this.data[0x0c] &= ~0x0f; // Clear the temperature bits
        this.data[0x0c] |= (temperatureCelsius & 0xf) | ((temperatureCelsius << 4) & 0x10);
    }
    // Byte 0x14
    get useFahrenheit() {
        return (this.data[0x14] & 0x04) > 0;
    }
    set useFahrenheit(useFahrenheitEnabled) {
        // set the unit to fahrenheit from celcius
        this.data[0x14] = useFahrenheitEnabled ? 0x04 : 0;
    }
}
exports.default = ACSetCommand;
