"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isSerializableController = exports.DefaultControllerType = void 0;
var DefaultControllerType;
(function (DefaultControllerType) {
    DefaultControllerType["CAMERA"] = "camera";
    DefaultControllerType["REMOTE"] = "remote";
    DefaultControllerType["TV"] = "tv";
    DefaultControllerType["ROUTER"] = "router";
    DefaultControllerType["LOCK"] = "lock";
})(DefaultControllerType = exports.DefaultControllerType || (exports.DefaultControllerType = {}));
function isSerializableController(controller) {
    return "serialize" in controller && "deserialize" in controller && "setupStateChangeDelegate" in controller;
}
exports.isSerializableController = isSerializableController;
//# sourceMappingURL=Controller.js.map