"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Constants_1 = __importDefault(require("./Constants"));
class crc8 {
    static calculate(data) {
        let crc_value = 0;
        for (const m of data) {
            let k = crc_value ^ m;
            if (k > 256)
                k -= 256;
            if (k < 0)
                k += 256;
            crc_value = Constants_1.default.crc8_854_table[k];
        }
        return crc_value;
    }
}
exports.default = crc8;
