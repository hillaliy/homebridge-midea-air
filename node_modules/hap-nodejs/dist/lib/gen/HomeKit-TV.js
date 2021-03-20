"use strict";
// Manually created from metadata in HomeKitDaemon
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
exports.TelevisionSpeaker = exports.InputSource = exports.Television = exports.VolumeSelector = exports.VolumeControlType = exports.TargetVisibilityState = exports.CurrentVisibilityState = exports.Identifier = exports.InputDeviceType = exports.InputSourceType = exports.RemoteKey = exports.PowerModeSelection = exports.PictureMode = exports.TargetMediaState = exports.CurrentMediaState = exports.DisplayOrder = exports.ClosedCaptions = exports.SleepDiscoveryMode = exports.ConfiguredName = exports.ActiveIdentifier = void 0;
var Characteristic_1 = require("../Characteristic");
var Service_1 = require("../Service");
/**
 * Characteristic "Active Identifier"
 */
var ActiveIdentifier = /** @class */ (function (_super) {
    __extends(ActiveIdentifier, _super);
    function ActiveIdentifier() {
        var _this = _super.call(this, 'Active Identifier', ActiveIdentifier.UUID) || this;
        _this.setProps({
            format: "uint32" /* UINT32 */,
            perms: ["pr" /* READ */, "pw" /* WRITE */, "ev" /* NOTIFY */]
        });
        _this.value = _this.getDefaultValue();
        return _this;
    }
    ActiveIdentifier.UUID = '000000E7-0000-1000-8000-0026BB765291';
    return ActiveIdentifier;
}(Characteristic_1.Characteristic));
exports.ActiveIdentifier = ActiveIdentifier;
Characteristic_1.Characteristic.ActiveIdentifier = ActiveIdentifier;
/**
 * Characteristic "Configured Name"
 */
var ConfiguredName = /** @class */ (function (_super) {
    __extends(ConfiguredName, _super);
    function ConfiguredName() {
        var _this = _super.call(this, 'Configured Name', ConfiguredName.UUID) || this;
        _this.setProps({
            format: "string" /* STRING */,
            perms: ["pr" /* READ */, "pw" /* WRITE */, "ev" /* NOTIFY */]
        });
        _this.value = _this.getDefaultValue();
        return _this;
    }
    ConfiguredName.UUID = '000000E3-0000-1000-8000-0026BB765291';
    return ConfiguredName;
}(Characteristic_1.Characteristic));
exports.ConfiguredName = ConfiguredName;
Characteristic_1.Characteristic.ConfiguredName = ConfiguredName;
/**
 * Characteristic "Sleep Discovery Mode"
 */
var SleepDiscoveryMode = /** @class */ (function (_super) {
    __extends(SleepDiscoveryMode, _super);
    function SleepDiscoveryMode() {
        var _this = _super.call(this, 'Sleep Discovery Mode', SleepDiscoveryMode.UUID) || this;
        _this.setProps({
            format: "uint8" /* UINT8 */,
            maxValue: 1,
            minValue: 0,
            validValues: [0, 1],
            perms: ["pr" /* READ */, "ev" /* NOTIFY */]
        });
        _this.value = _this.getDefaultValue();
        return _this;
    }
    // The value property of SleepDiscoveryMode must be one of the following:
    SleepDiscoveryMode.NOT_DISCOVERABLE = 0;
    SleepDiscoveryMode.ALWAYS_DISCOVERABLE = 1;
    SleepDiscoveryMode.UUID = '000000E8-0000-1000-8000-0026BB765291';
    return SleepDiscoveryMode;
}(Characteristic_1.Characteristic));
exports.SleepDiscoveryMode = SleepDiscoveryMode;
Characteristic_1.Characteristic.SleepDiscoveryMode = SleepDiscoveryMode;
/**
 * Characteristic "Closed Captions"
 */
var ClosedCaptions = /** @class */ (function (_super) {
    __extends(ClosedCaptions, _super);
    function ClosedCaptions() {
        var _this = _super.call(this, 'Closed Captions', ClosedCaptions.UUID) || this;
        _this.setProps({
            format: "uint8" /* UINT8 */,
            maxValue: 1,
            minValue: 0,
            validValues: [0, 1],
            perms: ["pr" /* READ */, "pw" /* WRITE */, "ev" /* NOTIFY */]
        });
        _this.value = _this.getDefaultValue();
        return _this;
    }
    // The value property of ClosedCaptions must be one of the following:
    ClosedCaptions.DISABLED = 0;
    ClosedCaptions.ENABLED = 1;
    ClosedCaptions.UUID = '000000DD-0000-1000-8000-0026BB765291';
    return ClosedCaptions;
}(Characteristic_1.Characteristic));
exports.ClosedCaptions = ClosedCaptions;
Characteristic_1.Characteristic.ClosedCaptions = ClosedCaptions;
/**
 * Characteristic "Display Order"
 */
var DisplayOrder = /** @class */ (function (_super) {
    __extends(DisplayOrder, _super);
    function DisplayOrder() {
        var _this = _super.call(this, 'Display Order', DisplayOrder.UUID) || this;
        _this.setProps({
            format: "tlv8" /* TLV8 */,
            perms: ["pr" /* READ */, "pw" /* WRITE */, "ev" /* NOTIFY */]
        });
        _this.value = _this.getDefaultValue();
        return _this;
    }
    DisplayOrder.UUID = '00000136-0000-1000-8000-0026BB765291';
    return DisplayOrder;
}(Characteristic_1.Characteristic));
exports.DisplayOrder = DisplayOrder;
Characteristic_1.Characteristic.DisplayOrder = DisplayOrder;
/**
 * Characteristic "Current Media State"
 */
var CurrentMediaState = /** @class */ (function (_super) {
    __extends(CurrentMediaState, _super);
    function CurrentMediaState() {
        var _this = _super.call(this, 'Current Media State', CurrentMediaState.UUID) || this;
        _this.setProps({
            format: "uint8" /* UINT8 */,
            maxValue: 5,
            minValue: 0,
            validValues: [0, 1, 2, 3, 4, 5],
            perms: ["pr" /* READ */, "ev" /* NOTIFY */]
        });
        _this.value = _this.getDefaultValue();
        return _this;
    }
    CurrentMediaState.PLAY = 0;
    CurrentMediaState.PAUSE = 1;
    CurrentMediaState.STOP = 2;
    // 3 is unknown (maybe some Television specific value)
    CurrentMediaState.LOADING = 4; // seems to be SmartSpeaker specific
    CurrentMediaState.INTERRUPTED = 5; // seems to be SmartSpeaker specific
    CurrentMediaState.UUID = '000000E0-0000-1000-8000-0026BB765291';
    return CurrentMediaState;
}(Characteristic_1.Characteristic));
exports.CurrentMediaState = CurrentMediaState;
Characteristic_1.Characteristic.CurrentMediaState = CurrentMediaState;
/**
 * Characteristic "Target Media State"
 */
var TargetMediaState = /** @class */ (function (_super) {
    __extends(TargetMediaState, _super);
    function TargetMediaState() {
        var _this = _super.call(this, 'Target Media State', TargetMediaState.UUID) || this;
        _this.setProps({
            format: "uint8" /* UINT8 */,
            maxValue: 2,
            minValue: 0,
            validValues: [0, 1, 2, 3],
            perms: ["pr" /* READ */, "pw" /* WRITE */, "ev" /* NOTIFY */]
        });
        _this.value = _this.getDefaultValue();
        return _this;
    }
    // The value property of TargetMediaState must be one of the following:
    TargetMediaState.PLAY = 0;
    TargetMediaState.PAUSE = 1;
    TargetMediaState.STOP = 2;
    TargetMediaState.UUID = '00000137-0000-1000-8000-0026BB765291';
    return TargetMediaState;
}(Characteristic_1.Characteristic));
exports.TargetMediaState = TargetMediaState;
Characteristic_1.Characteristic.TargetMediaState = TargetMediaState;
/**
 * Characteristic "Picture Mode"
 */
var PictureMode = /** @class */ (function (_super) {
    __extends(PictureMode, _super);
    function PictureMode() {
        var _this = _super.call(this, 'Picture Mode', PictureMode.UUID) || this;
        _this.setProps({
            format: "uint8" /* UINT8 */,
            maxValue: 13,
            minValue: 0,
            validValues: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
            perms: ["pr" /* READ */, "pw" /* WRITE */, "ev" /* NOTIFY */]
        });
        _this.value = _this.getDefaultValue();
        return _this;
    }
    // The value property of PictureMode must be one of the following:
    PictureMode.OTHER = 0;
    PictureMode.STANDARD = 1;
    PictureMode.CALIBRATED = 2;
    PictureMode.CALIBRATED_DARK = 3;
    PictureMode.VIVID = 4;
    PictureMode.GAME = 5;
    PictureMode.COMPUTER = 6;
    PictureMode.CUSTOM = 7;
    PictureMode.UUID = '000000E2-0000-1000-8000-0026BB765291';
    return PictureMode;
}(Characteristic_1.Characteristic));
exports.PictureMode = PictureMode;
Characteristic_1.Characteristic.PictureMode = PictureMode;
/**
 * Characteristic "Power Mode Selection"
 */
var PowerModeSelection = /** @class */ (function (_super) {
    __extends(PowerModeSelection, _super);
    function PowerModeSelection() {
        var _this = _super.call(this, 'Power Mode Selection', PowerModeSelection.UUID) || this;
        _this.setProps({
            format: "uint8" /* UINT8 */,
            maxValue: 1,
            minValue: 0,
            validValues: [0, 1],
            perms: ["pw" /* WRITE */]
        });
        _this.value = _this.getDefaultValue();
        return _this;
    }
    // The value property of PowerModeSelection must be one of the following:
    PowerModeSelection.SHOW = 0;
    PowerModeSelection.HIDE = 1;
    PowerModeSelection.UUID = '000000DF-0000-1000-8000-0026BB765291';
    return PowerModeSelection;
}(Characteristic_1.Characteristic));
exports.PowerModeSelection = PowerModeSelection;
Characteristic_1.Characteristic.PowerModeSelection = PowerModeSelection;
/**
 * Characteristic "Remote Key"
 */
var RemoteKey = /** @class */ (function (_super) {
    __extends(RemoteKey, _super);
    function RemoteKey() {
        var _this = _super.call(this, 'Remote Key', RemoteKey.UUID) || this;
        _this.setProps({
            format: "uint8" /* UINT8 */,
            maxValue: 16,
            minValue: 0,
            validValues: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
            perms: ["pw" /* WRITE */]
        });
        _this.value = _this.getDefaultValue();
        return _this;
    }
    // The value property of RemoteKey must be one of the following:
    RemoteKey.REWIND = 0;
    RemoteKey.FAST_FORWARD = 1;
    RemoteKey.NEXT_TRACK = 2;
    RemoteKey.PREVIOUS_TRACK = 3;
    RemoteKey.ARROW_UP = 4;
    RemoteKey.ARROW_DOWN = 5;
    RemoteKey.ARROW_LEFT = 6;
    RemoteKey.ARROW_RIGHT = 7;
    RemoteKey.SELECT = 8;
    RemoteKey.BACK = 9;
    RemoteKey.EXIT = 10;
    RemoteKey.PLAY_PAUSE = 11;
    RemoteKey.INFORMATION = 15;
    RemoteKey.UUID = '000000E1-0000-1000-8000-0026BB765291';
    return RemoteKey;
}(Characteristic_1.Characteristic));
exports.RemoteKey = RemoteKey;
Characteristic_1.Characteristic.RemoteKey = RemoteKey;
/**
 * Characteristic "Input Source Type"
 */
var InputSourceType = /** @class */ (function (_super) {
    __extends(InputSourceType, _super);
    function InputSourceType() {
        var _this = _super.call(this, 'Input Source Type', InputSourceType.UUID) || this;
        _this.setProps({
            format: "uint8" /* UINT8 */,
            maxValue: 10,
            minValue: 0,
            validValues: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
            perms: ["pr" /* READ */, "ev" /* NOTIFY */]
        });
        _this.value = _this.getDefaultValue();
        return _this;
    }
    // The value property of InputSourceType must be one of the following:
    InputSourceType.OTHER = 0;
    InputSourceType.HOME_SCREEN = 1;
    InputSourceType.TUNER = 2;
    InputSourceType.HDMI = 3;
    InputSourceType.COMPOSITE_VIDEO = 4;
    InputSourceType.S_VIDEO = 5;
    InputSourceType.COMPONENT_VIDEO = 6;
    InputSourceType.DVI = 7;
    InputSourceType.AIRPLAY = 8;
    InputSourceType.USB = 9;
    InputSourceType.APPLICATION = 10;
    InputSourceType.UUID = '000000DB-0000-1000-8000-0026BB765291';
    return InputSourceType;
}(Characteristic_1.Characteristic));
exports.InputSourceType = InputSourceType;
Characteristic_1.Characteristic.InputSourceType = InputSourceType;
/**
 * Characteristic "Input Device Type"
 */
var InputDeviceType = /** @class */ (function (_super) {
    __extends(InputDeviceType, _super);
    function InputDeviceType() {
        var _this = _super.call(this, 'Input Device Type', InputDeviceType.UUID) || this;
        _this.setProps({
            format: "uint8" /* UINT8 */,
            maxValue: 6,
            minValue: 0,
            validValues: [0, 1, 2, 3, 4, 5],
            perms: ["pr" /* READ */, "ev" /* NOTIFY */]
        });
        _this.value = _this.getDefaultValue();
        return _this;
    }
    // The value property of InputDeviceType must be one of the following:
    InputDeviceType.OTHER = 0;
    InputDeviceType.TV = 1;
    InputDeviceType.RECORDING = 2;
    InputDeviceType.TUNER = 3;
    InputDeviceType.PLAYBACK = 4;
    InputDeviceType.AUDIO_SYSTEM = 5;
    InputDeviceType.UNKNOWN_6 = 6; // introduce in iOS 14; "UNKNOWN_6" is not stable API, changes as soon as the type is known
    InputDeviceType.UUID = '000000DC-0000-1000-8000-0026BB765291';
    return InputDeviceType;
}(Characteristic_1.Characteristic));
exports.InputDeviceType = InputDeviceType;
Characteristic_1.Characteristic.InputDeviceType = InputDeviceType;
/**
 * Characteristic "Identifier"
 */
var Identifier = /** @class */ (function (_super) {
    __extends(Identifier, _super);
    function Identifier() {
        var _this = _super.call(this, 'Identifier', Identifier.UUID) || this;
        _this.setProps({
            format: "uint32" /* UINT32 */,
            minValue: 0,
            minStep: 1,
            perms: ["pr" /* READ */]
        });
        _this.value = _this.getDefaultValue();
        return _this;
    }
    Identifier.UUID = '000000E6-0000-1000-8000-0026BB765291';
    return Identifier;
}(Characteristic_1.Characteristic));
exports.Identifier = Identifier;
Characteristic_1.Characteristic.Identifier = Identifier;
/**
 * Characteristic "Current Visibility State"
 */
var CurrentVisibilityState = /** @class */ (function (_super) {
    __extends(CurrentVisibilityState, _super);
    function CurrentVisibilityState() {
        var _this = _super.call(this, 'Current Visibility State', CurrentVisibilityState.UUID) || this;
        _this.setProps({
            format: "uint8" /* UINT8 */,
            maxValue: 3,
            minValue: 0,
            validValues: [0, 1, 2, 3],
            perms: ["pr" /* READ */, "ev" /* NOTIFY */]
        });
        _this.value = _this.getDefaultValue();
        return _this;
    }
    // The value property of CurrentVisibilityState must be one of the following:
    CurrentVisibilityState.SHOWN = 0;
    CurrentVisibilityState.HIDDEN = 1;
    CurrentVisibilityState.UUID = '00000135-0000-1000-8000-0026BB765291';
    return CurrentVisibilityState;
}(Characteristic_1.Characteristic));
exports.CurrentVisibilityState = CurrentVisibilityState;
Characteristic_1.Characteristic.CurrentVisibilityState = CurrentVisibilityState;
/**
 * Characteristic "Target Visibility State"
 */
var TargetVisibilityState = /** @class */ (function (_super) {
    __extends(TargetVisibilityState, _super);
    function TargetVisibilityState() {
        var _this = _super.call(this, 'Target Visibility State', TargetVisibilityState.UUID) || this;
        _this.setProps({
            format: "uint8" /* UINT8 */,
            maxValue: 1,
            minValue: 0,
            validValues: [0, 1],
            perms: ["pr" /* READ */, "pw" /* WRITE */, "ev" /* NOTIFY */]
        });
        _this.value = _this.getDefaultValue();
        return _this;
    }
    // The value property of TargetVisibilityState must be one of the following:
    TargetVisibilityState.SHOWN = 0;
    TargetVisibilityState.HIDDEN = 1;
    TargetVisibilityState.UUID = '00000134-0000-1000-8000-0026BB765291';
    return TargetVisibilityState;
}(Characteristic_1.Characteristic));
exports.TargetVisibilityState = TargetVisibilityState;
Characteristic_1.Characteristic.TargetVisibilityState = TargetVisibilityState;
/**
 * Characteristic "Volume Control Type"
 */
var VolumeControlType = /** @class */ (function (_super) {
    __extends(VolumeControlType, _super);
    function VolumeControlType() {
        var _this = _super.call(this, 'Volume Control Type', VolumeControlType.UUID) || this;
        _this.setProps({
            format: "uint8" /* UINT8 */,
            maxValue: 3,
            minValue: 0,
            validValues: [0, 1, 2, 3],
            perms: ["pr" /* READ */, "ev" /* NOTIFY */]
        });
        _this.value = _this.getDefaultValue();
        return _this;
    }
    // The value property of VolumeControlType must be one of the following:
    VolumeControlType.NONE = 0;
    VolumeControlType.RELATIVE = 1;
    VolumeControlType.RELATIVE_WITH_CURRENT = 2;
    VolumeControlType.ABSOLUTE = 3;
    VolumeControlType.UUID = '000000E9-0000-1000-8000-0026BB765291';
    return VolumeControlType;
}(Characteristic_1.Characteristic));
exports.VolumeControlType = VolumeControlType;
Characteristic_1.Characteristic.VolumeControlType = VolumeControlType;
/**
 * Characteristic "Volume Selector"
 */
var VolumeSelector = /** @class */ (function (_super) {
    __extends(VolumeSelector, _super);
    function VolumeSelector() {
        var _this = _super.call(this, 'Volume Selector', VolumeSelector.UUID) || this;
        _this.setProps({
            format: "uint8" /* UINT8 */,
            maxValue: 1,
            minValue: 0,
            validValues: [0, 1],
            perms: ["pw" /* WRITE */]
        });
        _this.value = _this.getDefaultValue();
        return _this;
    }
    // The value property of VolumeSelector must be one of the following:
    VolumeSelector.INCREMENT = 0;
    VolumeSelector.DECREMENT = 1;
    VolumeSelector.UUID = '000000EA-0000-1000-8000-0026BB765291';
    return VolumeSelector;
}(Characteristic_1.Characteristic));
exports.VolumeSelector = VolumeSelector;
Characteristic_1.Characteristic.VolumeSelector = VolumeSelector;
/**
 * Service "Television"
 */
var Television = /** @class */ (function (_super) {
    __extends(Television, _super);
    function Television(displayName, subtype) {
        var _this = _super.call(this, displayName, Television.UUID, subtype) || this;
        // Required Characteristics
        _this.addCharacteristic(Characteristic_1.Characteristic.Active);
        _this.addCharacteristic(Characteristic_1.Characteristic.ActiveIdentifier);
        _this.addCharacteristic(Characteristic_1.Characteristic.ConfiguredName);
        _this.addCharacteristic(Characteristic_1.Characteristic.RemoteKey);
        _this.addCharacteristic(Characteristic_1.Characteristic.SleepDiscoveryMode);
        // Optional Characteristics
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.Brightness);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.ClosedCaptions);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.DisplayOrder);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.CurrentMediaState);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.TargetMediaState);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.PictureMode);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.PowerModeSelection);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.Name);
        return _this;
    }
    Television.UUID = '000000D8-0000-1000-8000-0026BB765291';
    return Television;
}(Service_1.Service));
exports.Television = Television;
Service_1.Service.Television = Television;
/**
 * Service "Input Source"
 */
var InputSource = /** @class */ (function (_super) {
    __extends(InputSource, _super);
    function InputSource(displayName, subtype) {
        var _this = _super.call(this, displayName, InputSource.UUID, subtype) || this;
        // Required Characteristics
        _this.addCharacteristic(Characteristic_1.Characteristic.ConfiguredName);
        _this.addCharacteristic(Characteristic_1.Characteristic.InputSourceType);
        _this.addCharacteristic(Characteristic_1.Characteristic.IsConfigured);
        if (!_this.testCharacteristic(Characteristic_1.Characteristic.Name)) { // workaround for name characteristic collision in constructor
            _this.addCharacteristic(Characteristic_1.Characteristic.Name).updateValue("Unnamed InputSource");
        }
        _this.addCharacteristic(Characteristic_1.Characteristic.CurrentVisibilityState);
        // Optional Characteristics
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.Identifier);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.InputDeviceType);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.TargetVisibilityState);
        return _this;
    }
    InputSource.UUID = '000000D9-0000-1000-8000-0026BB765291';
    return InputSource;
}(Service_1.Service));
exports.InputSource = InputSource;
Service_1.Service.InputSource = InputSource;
/**
 * Service "Television Speaker"
 */
var TelevisionSpeaker = /** @class */ (function (_super) {
    __extends(TelevisionSpeaker, _super);
    function TelevisionSpeaker(displayName, subtype) {
        var _this = _super.call(this, displayName, TelevisionSpeaker.UUID, subtype) || this;
        // Required Characteristics
        _this.addCharacteristic(Characteristic_1.Characteristic.Mute);
        // Optional Characteristics
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.Active);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.Volume);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.VolumeControlType);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.VolumeSelector);
        return _this;
    }
    TelevisionSpeaker.UUID = '00000113-0000-1000-8000-0026BB765291';
    return TelevisionSpeaker;
}(Service_1.Service));
exports.TelevisionSpeaker = TelevisionSpeaker;
Service_1.Service.TelevisionSpeaker = TelevisionSpeaker;
//# sourceMappingURL=HomeKit-TV.js.map