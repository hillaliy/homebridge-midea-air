"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generate = exports.validMacAddress = void 0;
const crypto_1 = __importDefault(require("crypto"));
const validMac = /^([0-9A-F]{2}:){5}([0-9A-F]{2})$/;
function validMacAddress(address) {
    return validMac.test(address);
}
exports.validMacAddress = validMacAddress;
function generate(data) {
    const sha1sum = crypto_1.default.createHash("sha1");
    sha1sum.update(data);
    const s = sha1sum.digest("hex");
    let i = 0;
    return "xx:xx:xx:xx:xx:xx".replace(/[x]/g, () => s[i++]).toUpperCase();
}
exports.generate = generate;
//# sourceMappingURL=mac.js.map