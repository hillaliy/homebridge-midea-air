"use strict";
/// <reference path="../@types/bonjour-hap.d.ts" />
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.init = exports.LegacyTypes = exports.uuid = exports.AccessoryLoader = void 0;
require("./lib/gen");
var accessoryLoader = __importStar(require("./lib/AccessoryLoader"));
var uuidFunctions = __importStar(require("./lib/util/uuid"));
var legacyTypes = __importStar(require("./accessories/types"));
var HAPStorage_1 = require("./lib/model/HAPStorage");
exports.AccessoryLoader = accessoryLoader;
exports.uuid = uuidFunctions;
__exportStar(require("./lib/model/HAPStorage"), exports);
__exportStar(require("./lib/Accessory"), exports);
__exportStar(require("./lib/Bridge"), exports);
__exportStar(require("./lib/Service"), exports);
__exportStar(require("./lib/Characteristic"), exports);
__exportStar(require("./lib/AccessoryLoader"), exports);
__exportStar(require("./lib/camera"), exports);
__exportStar(require("./lib/tv/AccessControlManagement"), exports);
__exportStar(require("./lib/HAPServer"), exports);
__exportStar(require("./lib/gen"), exports);
__exportStar(require("./lib/datastream"), exports);
__exportStar(require("./lib/controller"), exports);
__exportStar(require("./lib/util/clone"), exports);
__exportStar(require("./lib/util/once"), exports);
__exportStar(require("./lib/util/tlv"), exports);
__exportStar(require("./types"), exports);
exports.LegacyTypes = legacyTypes;
/**
 *
 * @param {string} storagePath
 * @deprecated the need to manually initialize the internal storage was removed. If you want to set a custom
 *  storage path location, please use {@link HAPStorage.setCustomStoragePath} directly.
 */
function init(storagePath) {
    if (storagePath) {
        HAPStorage_1.HAPStorage.setCustomStoragePath(storagePath);
    }
}
exports.init = init;
//# sourceMappingURL=index.js.map