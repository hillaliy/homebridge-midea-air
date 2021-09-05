"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ApplianceResponse_1 = __importDefault(require("../ApplianceResponse"));
class ACApplianceResponse extends ApplianceResponse_1.default {
    // Byte 0x02
    get targetTemperature() {
        return (this.data[0x02] & 0xf) + 16;
    }
    // Byte 0x09
    get auxHeat() {
        return (this.data[0x09] & 0x08) > 0;
    }
    // Byte 0x0a
    get catchCold() {
        // This needs a better name, dunno what it actually means
        return (this.data[0x0a] & 0x08) > 0;
    }
    // Byte 0x0b
    get indoorTemperature() {
        return (this.data[0x0b] - 50) / 2.0;
    }
    // Byte 0x0c
    get outdoorTemperature() {
        return (this.data[0x0c] - 50) / 2.0;
    }
    get celsiusUnit() {
        return (this.data[0x09] & 0x80) > 0; // CELSIUS - False
    }
    get fahrenheitUnit() {
        return this.data[23] > 0; // FAHRENHEIT - True
    }
}
exports.default = ACApplianceResponse;
