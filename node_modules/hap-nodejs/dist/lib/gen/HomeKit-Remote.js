"use strict";
// manually created
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
exports.Siri = exports.AudioStreamManagement = exports.TargetControl = exports.TargetControlManagement = exports.SiriInputType = exports.SelectedAudioStreamConfiguration = exports.ButtonEvent = exports.TargetControlList = exports.TargetControlSupportedConfiguration = void 0;
var Characteristic_1 = require("../Characteristic");
var Service_1 = require("../Service");
/**
 * Characteristic "Target Control Supported Configuration"
 */
var TargetControlSupportedConfiguration = /** @class */ (function (_super) {
    __extends(TargetControlSupportedConfiguration, _super);
    function TargetControlSupportedConfiguration() {
        var _this = _super.call(this, 'Target Control Supported Configuration', TargetControlSupportedConfiguration.UUID) || this;
        _this.setProps({
            format: "tlv8" /* TLV8 */,
            perms: ["pr" /* PAIRED_READ */]
        });
        _this.value = _this.getDefaultValue();
        return _this;
    }
    TargetControlSupportedConfiguration.UUID = '00000123-0000-1000-8000-0026BB765291';
    return TargetControlSupportedConfiguration;
}(Characteristic_1.Characteristic));
exports.TargetControlSupportedConfiguration = TargetControlSupportedConfiguration;
Characteristic_1.Characteristic.TargetControlSupportedConfiguration = TargetControlSupportedConfiguration;
/**
 * Characteristic "Target Control List"
 */
var TargetControlList = /** @class */ (function (_super) {
    __extends(TargetControlList, _super);
    function TargetControlList() {
        var _this = _super.call(this, 'Target Control List', TargetControlList.UUID) || this;
        _this.setProps({
            format: "tlv8" /* TLV8 */,
            perms: ["pw" /* PAIRED_WRITE */, "pr" /* PAIRED_READ */, "wr" /* WRITE_RESPONSE */],
            adminOnlyAccess: [0 /* READ */, 1 /* WRITE */],
        });
        _this.value = _this.getDefaultValue();
        return _this;
    }
    TargetControlList.UUID = '00000124-0000-1000-8000-0026BB765291';
    return TargetControlList;
}(Characteristic_1.Characteristic));
exports.TargetControlList = TargetControlList;
Characteristic_1.Characteristic.TargetControlList = TargetControlList;
/**
 * Characteristic "Button Event"
 */
var ButtonEvent = /** @class */ (function (_super) {
    __extends(ButtonEvent, _super);
    function ButtonEvent() {
        var _this = _super.call(this, 'Button Event', ButtonEvent.UUID) || this;
        _this.setProps({
            format: "tlv8" /* TLV8 */,
            perms: ["pr" /* PAIRED_READ */, "ev" /* NOTIFY */],
            adminOnlyAccess: [2 /* NOTIFY */],
        });
        _this.value = _this.getDefaultValue();
        return _this;
    }
    ButtonEvent.UUID = '00000126-0000-1000-8000-0026BB765291';
    return ButtonEvent;
}(Characteristic_1.Characteristic));
exports.ButtonEvent = ButtonEvent;
Characteristic_1.Characteristic.ButtonEvent = ButtonEvent;
/**
 * Characteristic "Selected Audio Stream Configuration"
 */
var SelectedAudioStreamConfiguration = /** @class */ (function (_super) {
    __extends(SelectedAudioStreamConfiguration, _super);
    function SelectedAudioStreamConfiguration() {
        var _this = _super.call(this, 'Selected Audio Stream Configuration', SelectedAudioStreamConfiguration.UUID) || this;
        _this.setProps({
            format: "tlv8" /* TLV8 */,
            perms: ["pr" /* PAIRED_READ */, "pw" /* PAIRED_WRITE */]
        });
        _this.value = _this.getDefaultValue();
        return _this;
    }
    SelectedAudioStreamConfiguration.UUID = '00000128-0000-1000-8000-0026BB765291';
    return SelectedAudioStreamConfiguration;
}(Characteristic_1.Characteristic));
exports.SelectedAudioStreamConfiguration = SelectedAudioStreamConfiguration;
Characteristic_1.Characteristic.SelectedAudioStreamConfiguration = SelectedAudioStreamConfiguration;
/**
 * Characteristic "Siri Input Type"
 */
var SiriInputType = /** @class */ (function (_super) {
    __extends(SiriInputType, _super);
    function SiriInputType() {
        var _this = _super.call(this, 'Siri Input Type', SiriInputType.UUID) || this;
        _this.setProps({
            format: "uint8" /* UINT8 */,
            minValue: 0,
            maxValue: 0,
            validValues: [0],
            perms: ["pr" /* PAIRED_READ */]
        });
        _this.value = _this.getDefaultValue();
        return _this;
    }
    SiriInputType.PUSH_BUTTON_TRIGGERED_APPLE_TV = 0;
    SiriInputType.UUID = '00000132-0000-1000-8000-0026BB765291';
    return SiriInputType;
}(Characteristic_1.Characteristic));
exports.SiriInputType = SiriInputType;
Characteristic_1.Characteristic.SiriInputType = SiriInputType;
/**
 * Service "Target Control Management"
 */
var TargetControlManagement = /** @class */ (function (_super) {
    __extends(TargetControlManagement, _super);
    function TargetControlManagement(displayName, subtype) {
        var _this = _super.call(this, displayName, TargetControlManagement.UUID, subtype) || this;
        // Required Characteristics
        _this.addCharacteristic(Characteristic_1.Characteristic.TargetControlSupportedConfiguration);
        _this.addCharacteristic(Characteristic_1.Characteristic.TargetControlList);
        return _this;
    }
    TargetControlManagement.UUID = '00000122-0000-1000-8000-0026BB765291';
    return TargetControlManagement;
}(Service_1.Service));
exports.TargetControlManagement = TargetControlManagement;
Service_1.Service.TargetControlManagement = TargetControlManagement;
/**
 * Service "Target Control"
 */
var TargetControl = /** @class */ (function (_super) {
    __extends(TargetControl, _super);
    function TargetControl(displayName, subtype) {
        var _this = _super.call(this, displayName, TargetControl.UUID, subtype) || this;
        // Required Characteristics
        _this.addCharacteristic(Characteristic_1.Characteristic.ActiveIdentifier);
        _this.addCharacteristic(Characteristic_1.Characteristic.Active);
        _this.addCharacteristic(Characteristic_1.Characteristic.ButtonEvent);
        // Optional Characteristics
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.Name);
        return _this;
    }
    TargetControl.UUID = '00000125-0000-1000-8000-0026BB765291';
    return TargetControl;
}(Service_1.Service));
exports.TargetControl = TargetControl;
Service_1.Service.TargetControl = TargetControl;
/**
 * Service "Audio Stream Management"
 */
var AudioStreamManagement = /** @class */ (function (_super) {
    __extends(AudioStreamManagement, _super);
    function AudioStreamManagement(displayName, subtype) {
        var _this = _super.call(this, displayName, AudioStreamManagement.UUID, subtype) || this;
        // Required Characteristics
        _this.addCharacteristic(Characteristic_1.Characteristic.SupportedAudioStreamConfiguration);
        _this.addCharacteristic(Characteristic_1.Characteristic.SelectedAudioStreamConfiguration);
        return _this;
    }
    AudioStreamManagement.UUID = '00000127-0000-1000-8000-0026BB765291';
    return AudioStreamManagement;
}(Service_1.Service));
exports.AudioStreamManagement = AudioStreamManagement;
Service_1.Service.AudioStreamManagement = AudioStreamManagement;
/**
 * Service "Siri"
 */
var Siri = /** @class */ (function (_super) {
    __extends(Siri, _super);
    function Siri(displayName, subtype) {
        var _this = _super.call(this, displayName, Siri.UUID, subtype) || this;
        // Required Characteristics
        _this.addCharacteristic(Characteristic_1.Characteristic.SiriInputType);
        return _this;
    }
    Siri.UUID = '00000133-0000-1000-8000-0026BB765291';
    return Siri;
}(Service_1.Service));
exports.Siri = Siri;
Service_1.Service.Siri = Siri;
//# sourceMappingURL=HomeKit-Remote.js.map