"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Utils – Utility functions
const crypto_1 = __importDefault(require("crypto"));
const Constants_1 = __importDefault(require("./Constants"));
class Utils {
    static encode(data) {
        const normalized = [];
        for (let b of data) {
            if (b >= 128) {
                b = b - 256;
            }
            ;
            normalized.push(b);
        }
        ;
        return normalized;
    }
    ;
    static decode(data) {
        const normalized = [];
        for (let b of data) {
            if (b < 0) {
                b = b + 256;
            }
            ;
            normalized.push(b);
        }
        ;
        return normalized;
    }
    ;
    // Returns a timestamp in the format YYYYMMDDHHmmss
    static getStamp() {
        const date = new Date();
        return date
            .toISOString()
            .slice(0, 19)
            .replace(/-/g, "")
            .replace(/:/g, "")
            .replace(/T/g, "");
    }
    ;
    static formatResponse(arr) {
        let output = [];
        for (var i = 0; i < arr.length; i++) {
            let intValue = parseInt(arr[i]);
            output.push((intValue).toString(2));
        }
        ;
        return output;
    }
    ;
    static getSign(path, form) {
        if (path != '' && form) {
            let postfix = "/v1" + path;
            postfix = postfix.split('?')[0];
            // Maybe this will help, should remove any query string parameters in the URL from the sign
            const ordered = {};
            Object.keys(form)
                .sort()
                .forEach(function (key) {
                ordered[key] = form[key];
            });
            const query = Object.keys(ordered)
                .map((key) => key + "=" + ordered[key])
                .join("&");
            return crypto_1.default
                .createHash("sha256")
                .update(postfix + query + Constants_1.default.AppKey)
                .digest("hex");
        }
        else {
            return false;
        }
        ;
    }
    ;
    static decryptAes(reply, dataKey) {
        if (reply && dataKey != '') {
            const decipher = crypto_1.default.createDecipheriv("aes-128-ecb", dataKey, "");
            const dec = decipher.update(reply, "hex", "utf8");
            return dec.split(",").map(Number);
        }
        else {
            return [];
        }
        ;
    }
    ;
    static decryptAesString(reply, dataKey) {
        if (reply && dataKey != '') {
            const decipher = crypto_1.default.createDecipheriv("aes-128-ecb", dataKey, "");
            const dec = decipher.update(reply, "hex", "utf8");
            return dec;
        }
        else {
            return '';
        }
        ;
    }
    ;
    static encryptAes(query, dataKey) {
        if (query && dataKey != '') {
            const cipher = crypto_1.default.createCipheriv("aes-128-ecb", dataKey, "");
            let ciph = cipher.update(query.join(","), "utf8", "hex");
            ciph += cipher.final("hex");
            return ciph;
        }
        else {
            return false;
        }
        ;
    }
    ;
    static encryptAesString(query, dataKey) {
        if (dataKey != '') {
            const cipher = crypto_1.default.createCipheriv("aes-128-ecb", dataKey, "");
            let ciph = cipher.update(query, "utf8", "hex");
            ciph += cipher.final("hex");
            return ciph;
        }
        else {
            return false;
        }
        ;
    }
    ;
    static getSignPassword(loginId, password) {
        if (loginId != '' && password != '') {
            const pw = crypto_1.default
                .createHash("sha256")
                .update(password)
                .digest("hex");
            return crypto_1.default
                .createHash("sha256")
                .update(loginId + pw + Constants_1.default.AppKey)
                .digest("hex");
        }
        else {
            return '';
        }
        ;
    }
    ;
    static generateDataKey(accessToken) {
        if (accessToken != '') {
            const md5AppKey = crypto_1.default
                .createHash("md5")
                .update(Constants_1.default.AppKey).digest("hex");
            const decipher = crypto_1.default.createDecipheriv("aes-128-ecb", md5AppKey.slice(0, 16), "");
            const dec = decipher.update(accessToken, "hex", "utf8");
            return dec;
        }
        ;
        return '';
    }
    ;
}
exports.default = Utils;
;
