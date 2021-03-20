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
    get audibleFeedback() {
        if (this.data[0x0b] & 0x42) {
            return true;
        }
        return false;
    }
    set audibleFeedback(feedbackEnabled) {
        this.data[0x0b] &= ~0x42; // Clear the audible bits
        this.data[0x0b] |= feedbackEnabled ? 0x42 : 0;
    }
    get targetTemperature() {
        return this.data[0x0c] & 0x1f;
    }
    set targetTemperature(temperatureCelsius) {
        this.data[0x0c] &= ~0x1f; // Clear the temperature bits
        this.data[0x0c] |= (temperatureCelsius & 0xf) | ((temperatureCelsius << 4) & 0x10);
    }
    get turboMode() {
        return this.data[0x14] > 0;
    }
    set turboMode(turboModeEnabled) {
        this.data[0x14] = turboModeEnabled ? 0x02 : 0;
    }
    get useFahrenheit() {
        if (this.data[0x14] & (1 << 2)) {
            return true;
        }
        else {
            return false;
        }
    }
    set useFahrenheit(useFahrenheit) {
        // this.flipBitOfByte(this.data[0x14], 2)
        var mask = 1 << 2;
        if (useFahrenheit == true) {
            this.data[0x14] |= mask;
        }
        else {
            this.data[0x14] &= ~mask;
        }
    }
    get fanSpeed() {
        return this.data[0x0d];
    }
    set fanSpeed(speed) {
        this.data[0x0d] = speed;
    }
    get ecoMode() {
        return this.data[0x13] > 0;
    }
    set ecoMode(ecoModeEnabled) {
        this.data[0x13] = ecoModeEnabled ? 0xff : 0;
    }
    get swingMode() {
        return this.data[0x11];
    }
    set swingMode(mode) {
        this.data[0x11] &= ~0x0f; // Clear the mode bit
        this.data[0x11] |= mode & 0x0f;
    }
}
exports.default = ACSetCommand;
