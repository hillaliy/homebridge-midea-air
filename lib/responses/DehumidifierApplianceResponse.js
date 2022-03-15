"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ApplianceResponse_1 = __importDefault(require("../ApplianceResponse"));
class DehumidifierApplianceResponse extends ApplianceResponse_1.default {
    // Byte 0x07
    get targetHumidity() {
        return this.data[0x07];
    }
    // Byte 0x0a
    get waterLevel() {
        return this.data[0x0a] & 127;
    }
    // Byte 0x10
    get currentHumidity() {
        return this.data[0x10];
    }
}
exports.default = DehumidifierApplianceResponse;
