"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const path_1 = __importDefault(require("path"));
const os_1 = __importDefault(require("os"));
/**
 * Manages user settings and storage locations.
 */
class User {
    static configPath() {
        return path_1.default.join(User.storagePath(), "config.json");
    }
    static persistPath() {
        return path_1.default.join(User.storagePath(), "persist"); // hap-nodejs data is stored here
    }
    static cachedAccessoryPath() {
        return path_1.default.join(User.storagePath(), "accessories");
    }
    static storagePath() {
        User.storageAccessed = true;
        return User.customStoragePath ? User.customStoragePath : path_1.default.join(os_1.default.homedir(), ".homebridge");
    }
    static setStoragePath(...storagePathSegments) {
        if (User.storageAccessed) {
            throw new Error("Storage path was already accessed and cannot be changed anymore. Try initializing your custom storage path earlier!");
        }
        User.customStoragePath = path_1.default.resolve(...storagePathSegments);
    }
}
exports.User = User;
User.storageAccessed = false;
//# sourceMappingURL=user.js.map