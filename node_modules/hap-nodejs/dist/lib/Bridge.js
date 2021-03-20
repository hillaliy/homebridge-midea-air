"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bridge = void 0;
var Accessory_1 = require("./Accessory");
/**
 * Bridge is a special type of HomeKit Accessory that hosts other Accessories "behind" it. This way you
 * can simply publish() the Bridge (with a single HAPServer on a single port) and all bridged Accessories
 * will be hosted automatically, instead of needed to publish() every single Accessory as a separate server.
 */
var Bridge = /** @class */ (function (_super) {
    __extends(Bridge, _super);
    function Bridge(displayName, serialNumber) {
        var _this = _super.call(this, displayName, serialNumber) || this;
        _this._isBridge = true;
        return _this;
    }
    return Bridge;
}(Accessory_1.Accessory));
exports.Bridge = Bridge;
//# sourceMappingURL=Bridge.js.map