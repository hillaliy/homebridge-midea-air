"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ApplianceResponse_1 = __importDefault(require("../ApplianceResponse"));
class ACApplianceResponse extends ApplianceResponse_1.default {
    // Byte 0x02
    get operationalMode() {
        return (this.data[0x02] & 0xe0) >> 5;
    }
    get targetTemperature() {
        if ((this.data[0x02] & 0x10) !== 0) {
            return (this.data[0x02] & 0xf) + 16.0 + 0.5;
        }
        else {
            return (this.data[0x02] & 0xf) + 16.0 + 0.0;
        }
    }
    // Byte 0x07
    get horizontalSwing() {
        return (this.data[0x07] & 0xc) >> 2;
    }
    get verticalSwing() {
        return (this.data[0x07] & 0x3);
    }
    // Byte 0x08
    get comfortSleepValue() {
        return this.data[0x08] & 0x03;
    }
    get powerSaving() {
        return (this.data[0x08] & 0x08) !== 0;
    }
    get lowFrequencyFan() {
        return (this.data[0x08] & 0x10) !== 0;
    }
    get turboFan() {
        return (this.data[0x08] & 0x20) !== 0;
    }
    get feelOwn() {
        return (this.data[0x08] & 0x80) !== 0;
    }
    // Byte 0x09
    get comfortSleep() {
        return (this.data[0x09] & 0x40) !== 0;
    }
    get naturalWind() {
        return (this.data[0x09] & 0x02) !== 0;
    }
    get ecoMode() {
        return (this.data[0x09] & 0x10) !== 0;
    }
    get purifier() {
        return (this.data[0x09] & 0x20) !== 0;
    }
    get dryer() {
        // This actually means 13°C(55°F)~35°C(95°F) according to my manual. Also dehumidifying.
        return (this.data[0x09] & 0x04) !== 0;
    }
    get ptc() {
        return (this.data[0x09] & 0x18) >> 3;
    }
    get auxHeat() {
        return (this.data[0x09] & 0x08) !== 0;
    }
    // Byte 0x0a
    get catchCold() {
        // This needs a better name, dunno what it actually means
        return (this.data[0x0a] & 0x08) > 0;
    }
    get turboMode() {
        return (this.data[0x0a] & 0x02) !== 0;
    }
    get useFahrenheit() {
        return (this.data[0x0a] & 0x04) !== 0;
    }
    get preventFreezing() {
        return (this.data[0x0a] & 0x20) !== 0;
    }
    // Byte 0x0b
    get indoorTemperature() {
        let indoorTempInteger;
        let indoorTemperatureDot;
        let indoorTempDecimal;
        if (this.data[0] === 0xc0) {
            if (((this.data[11] - 50) / 2) < -19 || ((this.data[11] - 50) / 2) > 50) {
                return 0xff;
            }
            else {
                indoorTempInteger = ((this.data[11] - 50) / 2);
            }
            indoorTemperatureDot = this.getBits(this.data, 15, 0, 3);
            indoorTempDecimal = indoorTemperatureDot * 0.1;
            if (this.data[11] > 49) {
                return indoorTempInteger + indoorTempDecimal;
            }
            else {
                return indoorTempInteger - indoorTempDecimal;
            }
        }
        if ((this.data[0] === 0xa0) || (this.data[0] === 0xa1)) {
            if (this.data[0] === 0xa0) {
                if ((this.data[1] >> 2) - 4 === 0) {
                    indoorTempInteger = -1;
                }
                else {
                    indoorTempInteger = (this.data[1] >> 2) + 12;
                }
                if (((this.data[1] >> 1) & 0x01) === 1) {
                    indoorTempDecimal = 0.5;
                }
                else {
                    indoorTempDecimal = 0;
                }
            }
            if (this.data[0] === 0xa1) {
                if ((((this.data[13] - 50) / 2) < -19) || (((this.data[13] - 50) / 2) > 50)) {
                    return 0xff;
                }
                else {
                    indoorTempInteger = ((this.data[13] - 50) / 2);
                }
                indoorTempDecimal = (this.data[18] & 0x0f) * 0.1;
            }
            if ((this.data[13]) > 49) {
                return indoorTempInteger + indoorTempDecimal;
            }
            else {
                return indoorTempInteger - indoorTempDecimal;
            }
        }
        return 0xff;
    }
    // Byte 0x0c
    get outdoorTemperature() {
        return (this.data[0x0c] - 50) / 2.0;
    }
    getBit(pByte, pIndex) {
        return (pByte >> pIndex) & 0x01;
    }
    getBits(pBytes, pIndex, pStartIndex, pEndIndex) {
        let StartIndex;
        let EndIndex;
        if (pStartIndex > pEndIndex) {
            StartIndex = pEndIndex;
            EndIndex = pStartIndex;
        }
        else {
            StartIndex = pStartIndex;
            EndIndex = pEndIndex;
        }
        let tempVal = 0x00;
        let i = StartIndex;
        while (i <= EndIndex) {
            tempVal = tempVal | this.getBit(pBytes[pIndex], i) << (i - StartIndex);
            i += 1;
        }
        return tempVal;
    }
}
exports.default = ACApplianceResponse;
