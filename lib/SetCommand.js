"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseCommand_1 = __importDefault(require("./BaseCommand"));
class SetCommand extends BaseCommand_1.default {
    constructor(device_type) {
        super(device_type);
    }
    ;
    // Byte 0x0b
    get audibleFeedback() {
        return (this.data[0x0b] & 0x40) !== 0;
    }
    ;
    set audibleFeedback(feedbackEnabled) {
        this.data[0x0b] &= ~0x40; // Clear the audible bits
        this.data[0x0b] |= feedbackEnabled ? 0x40 : 0;
    }
    ;
    get powerState() {
        return (this.data[0x0b] & 0x01) !== 0;
    }
    ;
    set powerState(state) {
        this.data[0x0b] &= ~0x01; // Clear the power bit
        this.data[0x0b] |= state ? 0x01 : 0;
    }
    ;
    // Byte 0x0d
    get fanSpeed() {
        return this.data[0x0d] & 0x7f;
    }
    ;
    set fanSpeed(speed) {
        this.data[0x0d] &= ~0x7f; // Clear the fan speed part
        this.data[0x0d] |= speed & 0x7f;
    }
    ;
    // Byte 0x11
    get swingMode() {
        return this.data[0x11];
    }
    ;
    set swingMode(mode) {
        this.data[0x11] = 0x30; // Clear the mode bit
        this.data[0x11] |= mode & 0x3f;
    }
    ;
}
exports.default = SetCommand;
;
