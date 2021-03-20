"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRequiredNodeVersion = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function loadPackageJson() {
    const packageJSONPath = path_1.default.join(__dirname, "../package.json");
    return JSON.parse(fs_1.default.readFileSync(packageJSONPath, { encoding: "utf8" }));
}
function getVersion() {
    return loadPackageJson().version;
}
exports.default = getVersion;
function getRequiredNodeVersion() {
    return loadPackageJson().engines.node;
}
exports.getRequiredNodeVersion = getRequiredNodeVersion;
//# sourceMappingURL=version.js.map