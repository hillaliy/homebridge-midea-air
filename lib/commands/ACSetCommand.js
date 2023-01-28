"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SetCommand_1 = __importDefault(require("./SetCommand"));
const MideaDeviceType_1 = require("../enums/MideaDeviceType");
class ACSetCommand extends SetCommand_1.default {
    constructor(device_type = MideaDeviceType_1.MideaDeviceType.AirConditioner) {
        super(device_type);
    }
    ;
    // Byte 0x0c
    get operationalMode() {
        return (this.data[0x0c] & 0xe0) >> 5;
    }
    ;
    set operationalMode(mode) {
        this.data[0x0c] &= ~0xe0; // Clear the mode bit
        this.data[0x0c] |= (mode & 0x7) << 5;
    }
    ;
    get targetTemperature() {
        // return this.data[0x0c] & 0x0f;
        return (this.data[0x0c] & 0x0f) + 16 + this.temperatureDecimal();
    }
    ;
    set targetTemperature(temperatureCelsius) {
        // this.data[0x0c] &= ~0x0f; // Clear the temperature bits
        // this.data[0x0c] |= (Math.trunc(temperatureCelsius) & 0x0f); // Clear the temperature bits, except the 0.5 bit, which will be set properly in all cases
        // this.temperatureDecimal = (Math.trunc(Math.round(temperatureCelsius * 2)) % 2 !== 0); // set the +0.5 bit
        let temperatureInteger;
        if (temperatureCelsius < 16 || temperatureCelsius > 31) {
            this.data[0x0c] &= ~0x0f; // Clear the temperature bits
            this.temperatureDecimal = 0;
        }
        else {
            temperatureInteger = Math.trunc(temperatureCelsius);
            this.temperatureDecimal = temperatureCelsius - temperatureInteger;
            this.data[0x0c] |= Math.trunc(temperatureInteger) & 0x0f;
        }
    }
    ;
    get temperatureDecimal() {
        return (this.data[0x0c] & 0x10) !== 0 ? 0.5 : 0;
    }
    ;
    set temperatureDecimal(temperatureDecimalEnabled) {
        // add 0.5C to the temperature value. not intended to be called directly. targetTemperature set calls this if needed
        this.data[0x0c] &= ~0x10; // Clear the mode bits
        if (temperatureDecimalEnabled === 0.5) {
            this.data[0x0c] |= 0x10;
        }
    }
    ;
    // Byte 0x11
    get horizontalSwing() {
        return (this.data[0x11] & 0x3) >> 2;
    }
    set horizontalSwing(mode) {
        this.data[0x11] &= ~0x3; // Clear the mode bit
        this.data[0x11] |= mode ? 0x73 : 0;
    }
    get verticalSwing() {
        return (this.data[0x11] & 0xc) >> 2;
    }
    set verticalSwing(mode) {
        this.data[0x11] &= 0xc; // Clear the mode bit
        this.data[0x11] |= mode ? 0x3c : 0;
    }
    ;
    // Byte 0x12
    get turboFan() {
        return (this.data[0x12] & 0x20) !== 0;
    }
    ;
    set turboFan(turboFanEnabled) {
        this.data[0x12] &= ~0x40; // Clear the mode bit
        this.data[0x12] |= turboFanEnabled ? 0x20 : 0;
    }
    ;
    // Byte 0x13
    get dryer() {
        return (this.data[0x13] & 0x4) !== 0;
    }
    set dryer(dryerEnabled) {
        this.data[0x13] &= ~0x4; // Clear the mode bit
        this.data[0x13] |= dryerEnabled ? 0x4 : 0;
    }
    get purifier() {
        return (this.data[0x13] & 0x20) !== 0;
    }
    set purifier(purifierEnabled) {
        this.data[0x13] &= ~0x20; // Clear the mode bit
        this.data[0x13] |= purifierEnabled ? 0x20 : 0;
    }
    get ecoMode() {
        return (this.data[0x13] & 0x80) !== 0;
    }
    ;
    set ecoMode(ecoModeEnabled) {
        this.data[0x13] &= ~0x80; // Clear the mode bit
        this.data[0x13] |= ecoModeEnabled ? 0x80 : 0;
    }
    ;
    // Byte 0x14
    get useFahrenheit() {
        return (this.data[0x14] & 0x04) !== 0;
    }
    ;
    set useFahrenheit(useFahrenheitEnabled) {
        // set the unit to fahrenheit from celcius
        this.data[0x14] &= ~0x04; // Clear the mode bits
        this.data[0x14] |= useFahrenheitEnabled ? 0x04 : 0;
    }
    ;
    get comfortSleep() {
        // Activates sleep mode
        return (this.data[0x14] & 0x80) !== 0;
    }
    set comfortSleep(comfortSleepEnabled) {
        this.data[0x14] &= ~0x80; // Clear the comfort sleep switch
        this.data[0x14] |= comfortSleepEnabled ? 0x80 : 0;
        this.data[0x12] &= ~0x03; // Clear the comfort value
        this.data[0x12] |= comfortSleepEnabled ? 0x03 : 0;
    }
    get turboMode() {
        return (this.data[0x14] & 0x02) !== 0;
    }
    set turboMode(turboModeEnabled) {
        this.data[0x14] &= (~0x02); // Clear the mode bit
        this.data[0x14] |= turboModeEnabled ? 0x02 : 0;
    }
    get screenDisplay() {
        return (this.data[0x14] & 0x10) !== 0;
    }
    ;
    set screenDisplay(screenDisplayEnabled) {
        // the LED lights on the AC. these display temperature and are often too bright during nights
        this.data[0x14] &= ~0x10; // Clear the mode bit
        this.data[0x14] |= screenDisplayEnabled ? 0x10 : 0;
    }
    ;
}
exports.default = ACSetCommand;
;
