"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ApplianceResponse {
    constructor(data) {
        // The response data from the appliance includes a packet header which we don't want
        this.data = data.slice(0x32);
    }
    // Byte 0x01
    get applianceError() {
        return (this.data[0x01] & 0x80) !== 0;
    }
    get powerState() {
        return (this.data[0x01] & 0x1) !== 0;
    }
    get imodeResume() {
        return (this.data[0x01] & 0x4) !== 0;
    }
    get timerMode() {
        return (this.data[0x01] & 0x10) !== 0;
    }
    get quickChech() {
        return (this.data[0x01] & 0x20) !== 0;
    }
    // Byte 0x03
    get fanSpeed() {
        return this.data[0x03] & 0x7f;
    }
    // Byte 0x04 + 0x06
    get onTimer() {
        const on_timer_value = this.data[0x04];
        const on_timer_minutes = this.data[0x06];
        return {
            status: (on_timer_value & 0x80) >> 7 > 0,
            hour: (on_timer_value & 0x7c) >> 2,
            minutes: (on_timer_value & 0x3) | ((on_timer_minutes & 0xf0) >> 4),
        };
    }
    // Byte 0x05 + 0x06
    get offTimer() {
        const off_timer_value = this.data[0x05];
        const off_timer_minutes = this.data[0x06];
        return {
            status: (off_timer_value & 0x80) >> 7 > 0,
            hour: (off_timer_value & 0x7c) >> 2,
            minutes: (off_timer_value & 0x3) | (off_timer_minutes & 0xf),
        };
    }
    // Byte 0x07
    get swingMode() {
        return this.data[0x07] & 0x0f;
    }
    // Byte 0x09
    get childSleepMode() {
        return (this.data[0x09] & 0x01) > 0;
    }
    // Byte 0x0a
    get sleepFunction() {
        return (this.data[0x0a] & 0x01) > 0;
    }
    get nightLight() {
        // This needs a better name, dunno what it actually means
        return (this.data[0x0a] & 0x10) > 0;
    }
    get peakElec() {
        // This needs a better name, dunno what it actually means
        return (this.data[0x0a] & 0x20) > 0;
    }
    get naturalFan() {
        // This needs a better name, dunno what it actually means
        return (this.data[0x0a] & 0x40) > 0;
    }
    // Byte 0x0d
    get humidity() {
        return this.data[0x0d] & 0x7f;
    }
}
exports.default = ApplianceResponse;
