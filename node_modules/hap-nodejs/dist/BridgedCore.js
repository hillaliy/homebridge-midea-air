"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
var node_persist_1 = __importDefault(require("node-persist"));
var _1 = require("./");
console.log("HAP-NodeJS starting...");
console.warn("DEPRECATION NOTICE: The use of Core and BridgeCore are deprecated and are scheduled to be remove in October 2020. " +
    "For more information and some guidance on how to migrate, have a look at https://github.com/homebridge/HAP-NodeJS/wiki/Deprecation-of-Core-and-BridgeCore");
// Initialize our storage system
node_persist_1.default.initSync();
// Start by creating our Bridge which will host all loaded Accessories
var bridge = new _1.Bridge('Node Bridge', _1.uuid.generate("Node Bridge"));
// Listen for bridge identification event
bridge.on("identify" /* IDENTIFY */, function (paired, callback) {
    console.log("Node Bridge identify");
    callback(); // success
});
// Load up all accessories in the /accessories folder
var dir = path_1.default.join(__dirname, "accessories");
var accessories = _1.AccessoryLoader.loadDirectory(dir);
// Add them all to the bridge
accessories.forEach(function (accessory) {
    bridge.addBridgedAccessory(accessory);
});
// Publish the Bridge on the local network.
bridge.publish({
    username: "CC:22:3D:E3:CE:F6",
    port: 51826,
    pincode: "031-45-154",
    category: 2 /* BRIDGE */
});
var signals = { 'SIGINT': 2, 'SIGTERM': 15 };
Object.keys(signals).forEach(function (signal) {
    process.on(signal, function () {
        bridge.unpublish();
        setTimeout(function () {
            process.exit(128 + signals[signal]);
        }, 1000);
    });
});
//# sourceMappingURL=BridgedCore.js.map