"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.accessory = void 0;
var __1 = require("..");
var UUID = __1.uuid.generate('hap-nodejs:accessories:wifi-router');
exports.accessory = new __1.Accessory('Wi-Fi Router', UUID);
// @ts-ignore
exports.accessory.username = 'FA:3C:ED:D2:1A:A2';
// @ts-ignore
exports.accessory.pincode = '031-45-154';
// @ts-ignore
exports.accessory.category = 33 /* ROUTER */;
exports.accessory.on("identify" /* IDENTIFY */, function (paired, callback) {
    console.log("Identify the '%s'", exports.accessory.displayName);
    callback();
});
var router = exports.accessory.addService(__1.Service.WiFiRouter);
//# sourceMappingURL=Wi-FiRouter_accessory.js.map