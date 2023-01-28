"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SetCommand_1 = __importDefault(require("./SetCommand"));
const MideaDeviceType_1 = require("../enums/MideaDeviceType");
class DehumidifierSetCommand extends SetCommand_1.default {
    constructor(device_type = MideaDeviceType_1.MideaDeviceType.Dehumidifier) {
        super(device_type);
    }
    // Byte 0x0c
    get operationalMode() {
        return this.data[0x0c] & 0x0f;
    }
    set operationalMode(mode) {
        this.data[0x0c] &= ~0x0f; // Clear the mode bits
        this.data[0x0c] |= mode;
    }
    // Byte 0x11
    get targetHumidity() {
        return this.data[0x11] & 0x7f;
    }
    set targetHumidity(humidity) {
        this.data[0x11] &= ~0x7f; // Clear the humidity part
        this.data[0x11] |= humidity;
    }
    // Byte 0x13
    get ionMode() {
        return (this.data[0x13] & 0x40) !== 0;
    }
    set ionMode(ionModeEnabled) {
        this.data[0x13] &= ~0x40; // Clear the ion switch bit
        this.data[0x13] |= ionModeEnabled ? 0x40 : 0;
    }
    get pumpSwitch() {
        return (this.data[0x13] & 0x08) !== 0;
    }
    set pumpSwitch(pumpSwitchEnabled) {
        this.data[0x13] &= ~0x08; // Clear the pump switch bit
        this.data[0x13] |= pumpSwitchEnabled ? 0x08 : 0;
    }
    get pumpSwitchFlag() {
        return (this.data[0x13] & 0x10) !== 0;
    }
    set pumpSwitchFlag(mode) {
        this.data[0x13] &= ~0x10; // Clear the pump switch bit
        this.data[0x13] |= mode ? 0x10 : 0;
    }
    get sleepSwitch() {
        return (this.data[0x13] & 0x20) !== 0;
    }
    set sleepSwitch(sleepSwitchEnabled) {
        this.data[0x13] &= ~0x20; // Clear the sleep switch bit
        this.data[0x13] |= sleepSwitchEnabled ? 0x20 : 0;
    }
    // Byte 0x14
    get verticalSwing() {
        return (this.data[0x14] & 0x14) !== 0;
    }
    set verticalSwing(verticalSwingEnabled) {
        this.data[0x14] &= ~0x14; // Clear the sleep switch bit
        this.data[0x14] |= verticalSwingEnabled ? 0x14 : 0;
    }
    // Byte 0x17
    get tankWarningLevel() {
        return this.data[0x17];
    }
    set tankWarningLevel(level) {
        this.data[0x17] = level;
    }
}
exports.default = DehumidifierSetCommand;
