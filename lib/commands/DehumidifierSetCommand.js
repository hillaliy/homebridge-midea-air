"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SetCommand_1 = __importDefault(require("../SetCommand"));
const MideaDeviceType_1 = require("../enums/MideaDeviceType");
class DehumidifierSetCommand extends SetCommand_1.default {
    constructor(device_type = MideaDeviceType_1.MideaDeviceType.Dehumidifier) {
        super(device_type);
    }
    // Byte 0x11
    get targetHumidity() {
        return this.data[0x11] & 127;
    }
    set targetHumidity(value) {
        this.data[0x11] = value & 127;
        this.data[0x12] = 0 & 15;
    }
}
exports.default = DehumidifierSetCommand;
