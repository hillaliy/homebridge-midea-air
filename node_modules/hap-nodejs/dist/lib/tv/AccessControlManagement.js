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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccessControlManagement = exports.AccessControlEvent = exports.AccessLevel = void 0;
var Service_1 = require("../Service");
var EventEmitter_1 = require("../EventEmitter");
var Characteristic_1 = require("../Characteristic");
var tlv = __importStar(require("../util/tlv"));
var AccessControlTypes;
(function (AccessControlTypes) {
    AccessControlTypes[AccessControlTypes["PASSWORD"] = 1] = "PASSWORD";
    AccessControlTypes[AccessControlTypes["PASSWORD_REQUIRED"] = 2] = "PASSWORD_REQUIRED";
})(AccessControlTypes || (AccessControlTypes = {}));
/**
 * This defines the Access Level for TVs and Speakers. It is pretty much only used for the AirPlay 2 protocol
 * so this information is not really useful.
 */
var AccessLevel;
(function (AccessLevel) {
    /**
     * This access level is set when the users selects "Anyone" or "Anyone On The Same Network"
     * in the Access Control settings.
     */
    AccessLevel[AccessLevel["ANYONE"] = 0] = "ANYONE";
    /**
     * This access level is set when the users selects "Only People Sharing this Home" in the
     * Access Control settings.
     * On this level password setting is ignored.
     * Requests to the HAPServer can only come from Home members anyways, so there is no real use to it.
     * This is pretty much only used for the AirPlay 2 protocol.
     */
    AccessLevel[AccessLevel["HOME_MEMBERS_ONLY"] = 1] = "HOME_MEMBERS_ONLY";
    // 2 seems to be also a valid value in the range, but never encountered it.
    // so don't know what's the use of it.
})(AccessLevel = exports.AccessLevel || (exports.AccessLevel = {}));
var AccessControlEvent;
(function (AccessControlEvent) {
    AccessControlEvent["ACCESS_LEVEL_UPDATED"] = "update-control-level";
    AccessControlEvent["PASSWORD_SETTING_UPDATED"] = "update-password";
})(AccessControlEvent = exports.AccessControlEvent || (exports.AccessControlEvent = {}));
var AccessControlManagement = /** @class */ (function (_super) {
    __extends(AccessControlManagement, _super);
    function AccessControlManagement(password, service) {
        var _this = _super.call(this) || this;
        /**
         * The current access level set for the Home
         */
        _this.accessLevel = 0;
        _this.passwordRequired = false;
        _this.lastPasswordTLVReceived = "";
        _this.accessControlService = service || new Service_1.Service.AccessControl();
        _this.setupServiceHandlers(password);
        return _this;
    }
    /**
     * @returns the AccessControl service
     */
    AccessControlManagement.prototype.getService = function () {
        return this.accessControlService;
    };
    /**
     * @returns the current {@link AccessLevel} configured for the Home
     */
    AccessControlManagement.prototype.getAccessLevel = function () {
        return this.accessLevel;
    };
    /**
     * @returns the current password configured for the Home or `undefined` if no password is required.
     */
    AccessControlManagement.prototype.getPassword = function () {
        return this.passwordRequired ? this.password : undefined;
    };
    AccessControlManagement.prototype.handleAccessLevelChange = function (value) {
        this.accessLevel = value;
        this.emit("update-control-level" /* ACCESS_LEVEL_UPDATED */, this.accessLevel);
    };
    AccessControlManagement.prototype.handlePasswordChange = function (value) {
        this.lastPasswordTLVReceived = value;
        var data = Buffer.from(value, "base64");
        var objects = tlv.decode(data);
        if (objects[1 /* PASSWORD */]) {
            this.password = objects[1 /* PASSWORD */].toString("utf8");
        }
        else {
            this.password = undefined;
        }
        this.passwordRequired = !!objects[2 /* PASSWORD_REQUIRED */][0];
        this.emit("update-password" /* PASSWORD_SETTING_UPDATED */, this.password, this.passwordRequired);
    };
    AccessControlManagement.prototype.setupServiceHandlers = function (enabledPasswordCharacteristics) {
        var _this = this;
        this.accessControlService.getCharacteristic(Characteristic_1.Characteristic.AccessControlLevel)
            .on("get" /* GET */, function (callback) {
            callback(undefined, _this.accessLevel);
        })
            .on("set" /* SET */, function (value, callback) {
            _this.handleAccessLevelChange(value);
            callback();
        });
        if (enabledPasswordCharacteristics) {
            this.accessControlService.getCharacteristic(Characteristic_1.Characteristic.PasswordSetting)
                .on("get" /* GET */, function (callback) {
                callback(undefined, _this.lastPasswordTLVReceived);
            })
                .on("set" /* SET */, function (value, callback) {
                _this.handlePasswordChange(value);
                callback();
            });
        }
    };
    return AccessControlManagement;
}(EventEmitter_1.EventEmitter));
exports.AccessControlManagement = AccessControlManagement;
//# sourceMappingURL=AccessControlManagement.js.map