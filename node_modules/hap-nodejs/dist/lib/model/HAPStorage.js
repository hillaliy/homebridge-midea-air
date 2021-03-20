"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HAPStorage = void 0;
var node_persist_1 = __importDefault(require("node-persist"));
var HAPStorage = /** @class */ (function () {
    function HAPStorage() {
    }
    HAPStorage.storage = function () {
        return this.INSTANCE.storage();
    };
    HAPStorage.setCustomStoragePath = function (path) {
        this.INSTANCE.setCustomStoragePath(path);
    };
    HAPStorage.prototype.storage = function () {
        if (!this.localStore) {
            this.localStore = node_persist_1.default.create();
            if (this.customStoragePath) {
                this.localStore.initSync({
                    dir: this.customStoragePath,
                });
            }
            else {
                this.localStore.initSync();
            }
        }
        return this.localStore;
    };
    HAPStorage.prototype.setCustomStoragePath = function (path) {
        if (this.localStore) {
            throw new Error("Cannot change storage path after it has already been initialized!");
        }
        this.customStoragePath = path;
    };
    HAPStorage.INSTANCE = new HAPStorage();
    return HAPStorage;
}());
exports.HAPStorage = HAPStorage;
//# sourceMappingURL=HAPStorage.js.map