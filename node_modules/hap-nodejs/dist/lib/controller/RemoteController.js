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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SiriAudioSession = exports.SiriAudioSessionEvents = exports.HomeKitRemoteController = exports.RemoteController = exports.TargetUpdates = exports.RemoteControllerEvents = exports.AudioSamplerate = exports.AudioBitrate = exports.AudioCodecTypes = exports.SiriInputType = exports.ButtonState = exports.TargetCategory = exports.ButtonType = void 0;
var tlv = __importStar(require("../util/tlv"));
var debug_1 = __importDefault(require("debug"));
var assert_1 = __importDefault(require("assert"));
var Service_1 = require("../Service");
var Characteristic_1 = require("../Characteristic");
var datastream_1 = require("../datastream");
var EventEmitter_1 = require("../EventEmitter");
var eventedhttp_1 = require("../util/eventedhttp");
var debug = debug_1.default('HAP-NodeJS:Remote:Controller');
var TargetControlCommands;
(function (TargetControlCommands) {
    TargetControlCommands[TargetControlCommands["MAXIMUM_TARGETS"] = 1] = "MAXIMUM_TARGETS";
    TargetControlCommands[TargetControlCommands["TICKS_PER_SECOND"] = 2] = "TICKS_PER_SECOND";
    TargetControlCommands[TargetControlCommands["SUPPORTED_BUTTON_CONFIGURATION"] = 3] = "SUPPORTED_BUTTON_CONFIGURATION";
    TargetControlCommands[TargetControlCommands["TYPE"] = 4] = "TYPE";
})(TargetControlCommands || (TargetControlCommands = {}));
var SupportedButtonConfigurationTypes;
(function (SupportedButtonConfigurationTypes) {
    SupportedButtonConfigurationTypes[SupportedButtonConfigurationTypes["BUTTON_ID"] = 1] = "BUTTON_ID";
    SupportedButtonConfigurationTypes[SupportedButtonConfigurationTypes["BUTTON_TYPE"] = 2] = "BUTTON_TYPE";
})(SupportedButtonConfigurationTypes || (SupportedButtonConfigurationTypes = {}));
var ButtonType;
(function (ButtonType) {
    ButtonType[ButtonType["UNDEFINED"] = 0] = "UNDEFINED";
    ButtonType[ButtonType["MENU"] = 1] = "MENU";
    ButtonType[ButtonType["PLAY_PAUSE"] = 2] = "PLAY_PAUSE";
    ButtonType[ButtonType["TV_HOME"] = 3] = "TV_HOME";
    ButtonType[ButtonType["SELECT"] = 4] = "SELECT";
    ButtonType[ButtonType["ARROW_UP"] = 5] = "ARROW_UP";
    ButtonType[ButtonType["ARROW_RIGHT"] = 6] = "ARROW_RIGHT";
    ButtonType[ButtonType["ARROW_DOWN"] = 7] = "ARROW_DOWN";
    ButtonType[ButtonType["ARROW_LEFT"] = 8] = "ARROW_LEFT";
    ButtonType[ButtonType["VOLUME_UP"] = 9] = "VOLUME_UP";
    ButtonType[ButtonType["VOLUME_DOWN"] = 10] = "VOLUME_DOWN";
    ButtonType[ButtonType["SIRI"] = 11] = "SIRI";
    ButtonType[ButtonType["POWER"] = 12] = "POWER";
    ButtonType[ButtonType["GENERIC"] = 13] = "GENERIC";
})(ButtonType = exports.ButtonType || (exports.ButtonType = {}));
var TargetControlList;
(function (TargetControlList) {
    TargetControlList[TargetControlList["OPERATION"] = 1] = "OPERATION";
    TargetControlList[TargetControlList["TARGET_CONFIGURATION"] = 2] = "TARGET_CONFIGURATION";
})(TargetControlList || (TargetControlList = {}));
var Operation;
(function (Operation) {
    Operation[Operation["UNDEFINED"] = 0] = "UNDEFINED";
    Operation[Operation["LIST"] = 1] = "LIST";
    Operation[Operation["ADD"] = 2] = "ADD";
    Operation[Operation["REMOVE"] = 3] = "REMOVE";
    Operation[Operation["RESET"] = 4] = "RESET";
    Operation[Operation["UPDATE"] = 5] = "UPDATE";
})(Operation || (Operation = {}));
var TargetConfigurationTypes;
(function (TargetConfigurationTypes) {
    TargetConfigurationTypes[TargetConfigurationTypes["TARGET_IDENTIFIER"] = 1] = "TARGET_IDENTIFIER";
    TargetConfigurationTypes[TargetConfigurationTypes["TARGET_NAME"] = 2] = "TARGET_NAME";
    TargetConfigurationTypes[TargetConfigurationTypes["TARGET_CATEGORY"] = 3] = "TARGET_CATEGORY";
    TargetConfigurationTypes[TargetConfigurationTypes["BUTTON_CONFIGURATION"] = 4] = "BUTTON_CONFIGURATION";
})(TargetConfigurationTypes || (TargetConfigurationTypes = {}));
var TargetCategory;
(function (TargetCategory) {
    TargetCategory[TargetCategory["UNDEFINED"] = 0] = "UNDEFINED";
    TargetCategory[TargetCategory["APPLE_TV"] = 24] = "APPLE_TV";
})(TargetCategory = exports.TargetCategory || (exports.TargetCategory = {}));
var ButtonConfigurationTypes;
(function (ButtonConfigurationTypes) {
    ButtonConfigurationTypes[ButtonConfigurationTypes["BUTTON_ID"] = 1] = "BUTTON_ID";
    ButtonConfigurationTypes[ButtonConfigurationTypes["BUTTON_TYPE"] = 2] = "BUTTON_TYPE";
    ButtonConfigurationTypes[ButtonConfigurationTypes["BUTTON_NAME"] = 3] = "BUTTON_NAME";
})(ButtonConfigurationTypes || (ButtonConfigurationTypes = {}));
var ButtonEvent;
(function (ButtonEvent) {
    ButtonEvent[ButtonEvent["BUTTON_ID"] = 1] = "BUTTON_ID";
    ButtonEvent[ButtonEvent["BUTTON_STATE"] = 2] = "BUTTON_STATE";
    ButtonEvent[ButtonEvent["TIMESTAMP"] = 3] = "TIMESTAMP";
    ButtonEvent[ButtonEvent["ACTIVE_IDENTIFIER"] = 4] = "ACTIVE_IDENTIFIER";
})(ButtonEvent || (ButtonEvent = {}));
var ButtonState;
(function (ButtonState) {
    ButtonState[ButtonState["UP"] = 0] = "UP";
    ButtonState[ButtonState["DOWN"] = 1] = "DOWN";
})(ButtonState = exports.ButtonState || (exports.ButtonState = {}));
var SiriInputType;
(function (SiriInputType) {
    SiriInputType[SiriInputType["PUSH_BUTTON_TRIGGERED_APPLE_TV"] = 0] = "PUSH_BUTTON_TRIGGERED_APPLE_TV";
})(SiriInputType = exports.SiriInputType || (exports.SiriInputType = {}));
var SelectedAudioInputStreamConfigurationTypes;
(function (SelectedAudioInputStreamConfigurationTypes) {
    SelectedAudioInputStreamConfigurationTypes[SelectedAudioInputStreamConfigurationTypes["SELECTED_AUDIO_INPUT_STREAM_CONFIGURATION"] = 1] = "SELECTED_AUDIO_INPUT_STREAM_CONFIGURATION";
})(SelectedAudioInputStreamConfigurationTypes || (SelectedAudioInputStreamConfigurationTypes = {}));
// ----------
var SupportedAudioStreamConfigurationTypes;
(function (SupportedAudioStreamConfigurationTypes) {
    SupportedAudioStreamConfigurationTypes[SupportedAudioStreamConfigurationTypes["AUDIO_CODEC_CONFIGURATION"] = 1] = "AUDIO_CODEC_CONFIGURATION";
    SupportedAudioStreamConfigurationTypes[SupportedAudioStreamConfigurationTypes["COMFORT_NOISE_SUPPORT"] = 2] = "COMFORT_NOISE_SUPPORT";
})(SupportedAudioStreamConfigurationTypes || (SupportedAudioStreamConfigurationTypes = {}));
var AudioCodecConfigurationTypes;
(function (AudioCodecConfigurationTypes) {
    AudioCodecConfigurationTypes[AudioCodecConfigurationTypes["CODEC_TYPE"] = 1] = "CODEC_TYPE";
    AudioCodecConfigurationTypes[AudioCodecConfigurationTypes["CODEC_PARAMETERS"] = 2] = "CODEC_PARAMETERS";
})(AudioCodecConfigurationTypes || (AudioCodecConfigurationTypes = {}));
var AudioCodecTypes;
(function (AudioCodecTypes) {
    AudioCodecTypes[AudioCodecTypes["PCMU"] = 0] = "PCMU";
    AudioCodecTypes[AudioCodecTypes["PCMA"] = 1] = "PCMA";
    AudioCodecTypes[AudioCodecTypes["AAC_ELD"] = 2] = "AAC_ELD";
    AudioCodecTypes[AudioCodecTypes["OPUS"] = 3] = "OPUS";
    AudioCodecTypes[AudioCodecTypes["MSBC"] = 4] = "MSBC";
    AudioCodecTypes[AudioCodecTypes["AMR"] = 5] = "AMR";
    AudioCodecTypes[AudioCodecTypes["AMR_WB"] = 6] = "AMR_WB";
})(AudioCodecTypes = exports.AudioCodecTypes || (exports.AudioCodecTypes = {}));
var AudioCodecParametersTypes;
(function (AudioCodecParametersTypes) {
    AudioCodecParametersTypes[AudioCodecParametersTypes["CHANNEL"] = 1] = "CHANNEL";
    AudioCodecParametersTypes[AudioCodecParametersTypes["BIT_RATE"] = 2] = "BIT_RATE";
    AudioCodecParametersTypes[AudioCodecParametersTypes["SAMPLE_RATE"] = 3] = "SAMPLE_RATE";
    AudioCodecParametersTypes[AudioCodecParametersTypes["PACKET_TIME"] = 4] = "PACKET_TIME"; // only present in selected audio codec parameters tlv
})(AudioCodecParametersTypes || (AudioCodecParametersTypes = {}));
var AudioBitrate;
(function (AudioBitrate) {
    AudioBitrate[AudioBitrate["VARIABLE"] = 0] = "VARIABLE";
    AudioBitrate[AudioBitrate["CONSTANT"] = 1] = "CONSTANT";
})(AudioBitrate = exports.AudioBitrate || (exports.AudioBitrate = {}));
var AudioSamplerate;
(function (AudioSamplerate) {
    AudioSamplerate[AudioSamplerate["KHZ_8"] = 0] = "KHZ_8";
    AudioSamplerate[AudioSamplerate["KHZ_16"] = 1] = "KHZ_16";
    AudioSamplerate[AudioSamplerate["KHZ_24"] = 2] = "KHZ_24";
    // 3, 4, 5 are theoretically defined, but no idea to what kHz value they correspond to
    // probably KHZ_32, KHZ_44_1, KHZ_48 (as supported by Secure Video recordings)
})(AudioSamplerate = exports.AudioSamplerate || (exports.AudioSamplerate = {}));
var SiriAudioSessionState;
(function (SiriAudioSessionState) {
    SiriAudioSessionState[SiriAudioSessionState["STARTING"] = 0] = "STARTING";
    SiriAudioSessionState[SiriAudioSessionState["SENDING"] = 1] = "SENDING";
    SiriAudioSessionState[SiriAudioSessionState["CLOSING"] = 2] = "CLOSING";
    SiriAudioSessionState[SiriAudioSessionState["CLOSED"] = 3] = "CLOSED";
})(SiriAudioSessionState || (SiriAudioSessionState = {}));
var RemoteControllerEvents;
(function (RemoteControllerEvents) {
    RemoteControllerEvents["ACTIVE_CHANGE"] = "active-change";
    RemoteControllerEvents["ACTIVE_IDENTIFIER_CHANGE"] = "active-identifier-change";
    RemoteControllerEvents["TARGET_ADDED"] = "target-add";
    RemoteControllerEvents["TARGET_UPDATED"] = "target-update";
    RemoteControllerEvents["TARGET_REMOVED"] = "target-remove";
    RemoteControllerEvents["TARGETS_RESET"] = "targets-reset";
})(RemoteControllerEvents = exports.RemoteControllerEvents || (exports.RemoteControllerEvents = {}));
var TargetUpdates;
(function (TargetUpdates) {
    TargetUpdates[TargetUpdates["NAME"] = 0] = "NAME";
    TargetUpdates[TargetUpdates["CATEGORY"] = 1] = "CATEGORY";
    TargetUpdates[TargetUpdates["UPDATED_BUTTONS"] = 2] = "UPDATED_BUTTONS";
    TargetUpdates[TargetUpdates["REMOVED_BUTTONS"] = 3] = "REMOVED_BUTTONS";
})(TargetUpdates = exports.TargetUpdates || (exports.TargetUpdates = {}));
/**
 * Handles everything needed to implement a fully working HomeKit remote controller.
 *
 * @event 'active-change': (active: boolean) => void
 *        This event is emitted when the active state of the remote has changed.
 *        active = true indicates that there is currently an apple tv listening of button presses and audio streams.
 *
 * @event 'active-identifier-change': (activeIdentifier: number) => void
 *        This event is emitted when the currently selected target has changed.
 *        Possible reasons for a changed active identifier: manual change via api call, first target configuration
 *        gets added, active target gets removed, accessory gets unpaired, reset request was sent.
 *        An activeIdentifier of 0 indicates that no target is selected.
 *
 *
 * @event 'target-add': (targetConfiguration: TargetConfiguration) => void
 *        This event is emitted when a new target configuration is received. As we currently do not persistently store
 *        configured targets, this will be called at every startup for every Apple TV configured in the home.
 *
 * @event 'target-update': (targetConfiguration: TargetConfiguration, updates: TargetUpdates[]) => void
 *        This event is emitted when a existing target was updated.
 *        The 'updates' array indicates what exactly was changed for the target.
 *
 * @event 'target-remove': (targetIdentifier: number) => void
 *        This event is emitted when a existing configuration for a target was removed.
 *
 * @event 'targets-reset': () => void
 *        This event is emitted when a reset of the target configuration is requested.
 *        With this event every configuration made should be reset. This event is also called
 *        when the accessory gets unpaired.
 */
var RemoteController = /** @class */ (function (_super) {
    __extends(RemoteController, _super);
    /**
     * Creates a new RemoteController.
     * If siri voice input is supported the constructor to an SiriAudioStreamProducer needs to be supplied.
     * Otherwise a remote without voice support will be created.
     *
     * For every audio session a new SiriAudioStreamProducer will be constructed.
     *
     * @param audioProducerConstructor {SiriAudioStreamProducerConstructor} - constructor for a SiriAudioStreamProducer
     * @param producerOptions - if supplied this argument will be supplied as third argument of the SiriAudioStreamProducer
     *                          constructor. This should be used to supply configurations to the stream producer.
     */
    function RemoteController(audioProducerConstructor, producerOptions) {
        var _this = _super.call(this) || this;
        _this.controllerType = "remote" /* REMOTE */;
        _this.buttons = {}; // internal mapping of buttonId to buttonType for supported buttons
        _this.targetConfigurations = {};
        _this.targetConfigurationsString = "";
        _this.lastButtonEvent = "";
        _this.activeIdentifier = 0; // id of 0 means no device selected
        _this.dataStreamConnections = {}; // maps targetIdentifiers to active data stream connections
        /**
         * Set a new target as active target. A value of 0 indicates that no target is selected currently.
         *
         * @param activeIdentifier {number} - target identifier
         */
        _this.setActiveIdentifier = function (activeIdentifier) {
            if (activeIdentifier === _this.activeIdentifier) {
                return;
            }
            if (activeIdentifier !== 0 && !_this.targetConfigurations[activeIdentifier]) {
                throw Error("Tried setting unconfigured targetIdentifier to active");
            }
            debug("%d is now the active target", activeIdentifier);
            _this.activeIdentifier = activeIdentifier;
            _this.targetControlService.getCharacteristic(Characteristic_1.Characteristic.ActiveIdentifier).updateValue(activeIdentifier);
            if (_this.activeAudioSession) {
                _this.handleSiriAudioStop();
            }
            setTimeout(function () { return _this.emit("active-identifier-change" /* ACTIVE_IDENTIFIER_CHANGE */, activeIdentifier); }, 0);
            _this.setInactive();
        };
        /**
         * @returns if the current target is active, meaning the active device is listening for button events or audio sessions
         */
        _this.isActive = function () {
            return !!_this.activeSession;
        };
        /**
         * Checks if the supplied targetIdentifier is configured.
         *
         * @param targetIdentifier {number}
         */
        _this.isConfigured = function (targetIdentifier) {
            return _this.targetConfigurations[targetIdentifier] !== undefined;
        };
        /**
         * Returns the targetIdentifier for a give device name
         *
         * @param name {string} - the name of the device
         * @returns the targetIdentifier of the device or undefined if not existent
         */
        _this.getTargetIdentifierByName = function (name) {
            for (var activeIdentifier in _this.targetConfigurations) {
                var configuration = _this.targetConfigurations[activeIdentifier];
                if (configuration.targetName === name) {
                    return parseInt(activeIdentifier);
                }
            }
            return undefined;
        };
        /**
         * Sends a button event to press the supplied button.
         *
         * @param button {ButtonType} - button to be pressed
         */
        _this.pushButton = function (button) {
            _this.sendButtonEvent(button, 1 /* DOWN */);
        };
        /**
         * Sends a button event that the supplied button was released.
         *
         * @param button {ButtonType} - button which was released
         */
        _this.releaseButton = function (button) {
            _this.sendButtonEvent(button, 0 /* UP */);
        };
        /**
         * Presses a supplied button for a given time.
         *
         * @param button {ButtonType} - button to be pressed and released
         * @param time {number} - time in milliseconds (defaults to 200ms)
         */
        _this.pushAndReleaseButton = function (button, time) {
            if (time === void 0) { time = 200; }
            _this.pushButton(button);
            setTimeout(function () { return _this.releaseButton(button); }, time);
        };
        /**
         * This method adds and configures the remote services for a give accessory.
         *
         * @param accessory {Accessory} - the give accessory this remote should be added to
         * @deprecated - use {@link Accessory.configureController} instead
         */
        _this.addServicesToAccessory = function (accessory) {
            accessory.configureController(_this);
        };
        // ---------------------------------- CONFIGURATION ----------------------------------
        // override methods if you would like to change anything (but should not be necessary most likely)
        _this.constructSupportedConfiguration = function () {
            var configuration = {
                maximumTargets: 10,
                ticksPerSecond: 1000,
                supportedButtonConfiguration: [],
                hardwareImplemented: _this.audioSupported // siri is only allowed for hardware implemented remotes
            };
            var supportedButtons = [
                1 /* MENU */, 2 /* PLAY_PAUSE */, 3 /* TV_HOME */, 4 /* SELECT */,
                5 /* ARROW_UP */, 6 /* ARROW_RIGHT */, 7 /* ARROW_DOWN */, 8 /* ARROW_LEFT */,
                9 /* VOLUME_UP */, 10 /* VOLUME_DOWN */, 12 /* POWER */, 13 /* GENERIC */
            ];
            if (_this.audioSupported) { // add siri button if this remote supports it
                supportedButtons.push(11 /* SIRI */);
            }
            supportedButtons.forEach(function (button) {
                var buttonConfiguration = {
                    buttonID: 100 + button,
                    buttonType: button
                };
                configuration.supportedButtonConfiguration.push(buttonConfiguration);
                _this.buttons[button] = buttonConfiguration.buttonID; // also saving mapping of type to id locally
            });
            return configuration;
        };
        _this.constructSupportedAudioConfiguration = function () {
            // the following parameters are expected from HomeKit for a remote
            return {
                audioCodecConfiguration: {
                    codecType: 3 /* OPUS */,
                    parameters: {
                        channels: 1,
                        bitrate: 0 /* VARIABLE */,
                        samplerate: 1 /* KHZ_16 */,
                    }
                },
            };
        };
        // --------------------------------- TARGET CONTROL ----------------------------------
        _this.handleTargetControlWrite = function (value, callback) {
            var data = Buffer.from(value, 'base64');
            var objects = tlv.decode(data);
            var operation = objects[1 /* OPERATION */][0];
            var targetConfiguration = undefined;
            if (objects[2 /* TARGET_CONFIGURATION */]) { // if target configuration was sent, parse it
                targetConfiguration = _this.parseTargetConfigurationTLV(objects[2 /* TARGET_CONFIGURATION */]);
            }
            debug("Received TargetControl write operation %s", Operation[operation]);
            var handler;
            switch (operation) {
                case Operation.ADD:
                    handler = _this.handleAddTarget;
                    break;
                case Operation.UPDATE:
                    handler = _this.handleUpdateTarget;
                    break;
                case Operation.REMOVE:
                    handler = _this.handleRemoveTarget;
                    break;
                case Operation.RESET:
                    handler = _this.handleResetTargets;
                    break;
                case Operation.LIST:
                    handler = _this.handleListTargets;
                    break;
                default:
                    callback(new Error(-70410 /* INVALID_VALUE_IN_REQUEST */ + ""), undefined);
                    return;
            }
            var status = handler(targetConfiguration);
            if (status === 0 /* SUCCESS */) {
                callback(undefined, _this.targetConfigurationsString); // passing value for write response
                if (operation === Operation.ADD && _this.activeIdentifier === 0) {
                    _this.setActiveIdentifier(targetConfiguration.targetIdentifier);
                }
            }
            else {
                callback(new Error(status + ""));
            }
        };
        _this.handleAddTarget = function (targetConfiguration) {
            if (!targetConfiguration) {
                return -70410 /* INVALID_VALUE_IN_REQUEST */;
            }
            _this.targetConfigurations[targetConfiguration.targetIdentifier] = targetConfiguration;
            debug("Configured new target '" + targetConfiguration.targetName + "' with targetIdentifier '" + targetConfiguration.targetIdentifier + "'");
            setTimeout(function () { return _this.emit("target-add" /* TARGET_ADDED */, targetConfiguration); }, 0);
            _this.updatedTargetConfiguration(); // set response
            return 0 /* SUCCESS */;
        };
        _this.handleUpdateTarget = function (targetConfiguration) {
            if (!targetConfiguration) {
                return -70410 /* INVALID_VALUE_IN_REQUEST */;
            }
            var updates = [];
            var configuredTarget = _this.targetConfigurations[targetConfiguration.targetIdentifier];
            if (targetConfiguration.targetName) {
                debug("Target name was updated '%s' => '%s' (%d)", configuredTarget.targetName, targetConfiguration.targetName, configuredTarget.targetIdentifier);
                configuredTarget.targetName = targetConfiguration.targetName;
                updates.push(0 /* NAME */);
            }
            if (targetConfiguration.targetCategory) {
                debug("Target category was updated '%d' => '%d' for target '%s' (%d)", configuredTarget.targetCategory, targetConfiguration.targetCategory, configuredTarget.targetName, configuredTarget.targetIdentifier);
                configuredTarget.targetCategory = targetConfiguration.targetCategory;
                updates.push(1 /* CATEGORY */);
            }
            if (targetConfiguration.buttonConfiguration) {
                debug("%d button configurations were updated for target '%s' (%d)", Object.keys(targetConfiguration.buttonConfiguration).length, configuredTarget.targetName, configuredTarget.targetIdentifier);
                for (var key in targetConfiguration.buttonConfiguration) {
                    var configuration = targetConfiguration.buttonConfiguration[key];
                    var savedConfiguration = configuredTarget.buttonConfiguration[configuration.buttonID];
                    savedConfiguration.buttonType = configuration.buttonType;
                    savedConfiguration.buttonName = configuration.buttonName;
                }
                updates.push(2 /* UPDATED_BUTTONS */);
            }
            setTimeout(function () { return _this.emit("target-update" /* TARGET_UPDATED */, targetConfiguration, updates); }, 0);
            _this.updatedTargetConfiguration(); // set response
            return 0 /* SUCCESS */;
        };
        _this.handleRemoveTarget = function (targetConfiguration) {
            if (!targetConfiguration) {
                return -70410 /* INVALID_VALUE_IN_REQUEST */;
            }
            var configuredTarget = _this.targetConfigurations[targetConfiguration.targetIdentifier];
            if (!configuredTarget) {
                return -70410 /* INVALID_VALUE_IN_REQUEST */;
            }
            if (targetConfiguration.buttonConfiguration) {
                for (var key in targetConfiguration.buttonConfiguration) {
                    delete configuredTarget.buttonConfiguration[key];
                }
                debug("Removed %d button configurations of target '%s' (%d)", Object.keys(targetConfiguration.buttonConfiguration).length, configuredTarget.targetName, configuredTarget.targetIdentifier);
                setTimeout(function () { return _this.emit("target-update" /* TARGET_UPDATED */, configuredTarget, [3 /* REMOVED_BUTTONS */]); }, 0);
            }
            else {
                delete _this.targetConfigurations[targetConfiguration.targetIdentifier];
                debug("Target '%s' (%d) was removed", configuredTarget.targetName, configuredTarget.targetIdentifier);
                setTimeout(function () { return _this.emit("target-remove" /* TARGET_REMOVED */, targetConfiguration.targetIdentifier); }, 0);
                var keys = Object.keys(_this.targetConfigurations);
                _this.setActiveIdentifier(keys.length === 0 ? 0 : parseInt(keys[0])); // switch to next available remote
            }
            _this.updatedTargetConfiguration(); // set response
            return 0 /* SUCCESS */;
        };
        _this.handleResetTargets = function (targetConfiguration) {
            if (targetConfiguration) {
                return -70410 /* INVALID_VALUE_IN_REQUEST */;
            }
            debug("Resetting all target configurations");
            _this.targetConfigurations = {};
            _this.updatedTargetConfiguration(); // set response
            setTimeout(function () { return _this.emit("targets-reset" /* TARGETS_RESET */); }, 0);
            _this.setActiveIdentifier(0); // resetting active identifier (also sets active to false)
            return 0 /* SUCCESS */;
        };
        _this.handleListTargets = function (targetConfiguration) {
            if (targetConfiguration) {
                return -70410 /* INVALID_VALUE_IN_REQUEST */;
            }
            // this.targetConfigurationsString is updated after each change, so we basically don't need to do anything here
            debug("Returning " + Object.keys(_this.targetConfigurations).length + " target configurations");
            return 0 /* SUCCESS */;
        };
        _this.handleActiveWrite = function (value, callback, connectionID) {
            if (!connectionID) {
                callback(new Error(-70410 /* INVALID_VALUE_IN_REQUEST */ + ""));
                return;
            }
            var session = eventedhttp_1.Session.getSession(connectionID);
            if (!session) {
                callback(new Error(-70410 /* INVALID_VALUE_IN_REQUEST */ + ""));
                return;
            }
            if (_this.activeIdentifier === 0) {
                debug("Tried to change active state. There is no active target set though");
                callback(new Error(-70410 /* INVALID_VALUE_IN_REQUEST */ + ""));
                return;
            }
            if (_this.activeSession) {
                _this.activeSession.removeListener("closed" /* CLOSED */, _this.activeSessionDisconnectionListener);
                _this.activeSession = undefined;
                _this.activeSessionDisconnectionListener = undefined;
            }
            _this.activeSession = value ? session : undefined;
            if (_this.activeSession) { // register listener when hap session disconnects
                _this.activeSessionDisconnectionListener = _this.handleActiveSessionDisconnected.bind(_this, _this.activeSession);
                _this.activeSession.on("closed" /* CLOSED */, _this.activeSessionDisconnectionListener);
            }
            var activeName = _this.targetConfigurations[_this.activeIdentifier].targetName;
            debug("Remote with activeTarget '%s' (%d) was set to %s", activeName, _this.activeIdentifier, value ? "ACTIVE" : "INACTIVE");
            callback();
            _this.emit("active-change" /* ACTIVE_CHANGE */, value);
        };
        _this.setInactive = function () {
            if (_this.activeSession === undefined) {
                return;
            }
            _this.activeSession.removeListener("closed" /* CLOSED */, _this.activeSessionDisconnectionListener);
            _this.activeSession = undefined;
            _this.activeSessionDisconnectionListener = undefined;
            _this.targetControlService.getCharacteristic(Characteristic_1.Characteristic.Active).updateValue(false);
            debug("Remote was set to INACTIVE");
            setTimeout(function () { return _this.emit("active-change" /* ACTIVE_CHANGE */, false); }, 0);
        };
        _this.handleActiveSessionDisconnected = function (session) {
            if (session !== _this.activeSession) {
                return;
            }
            debug("Active hap session disconnected!");
            _this.setInactive();
        };
        _this.sendButtonEvent = function (button, buttonState) {
            var buttonID = _this.buttons[button];
            if (buttonID === undefined || buttonID === 0) {
                throw new Error("Tried sending button event for unsupported button (" + button + ")");
            }
            if (_this.activeIdentifier === 0) { // cannot press button if no device is selected
                throw new Error("Tried sending button event although no target was selected");
            }
            if (!_this.isActive()) { // cannot press button if device is not active (aka no apple tv is listening)
                throw new Error("Tried sending button event although target was not marked as active");
            }
            if (button === 11 /* SIRI */ && _this.audioSupported) {
                if (buttonState === 1 /* DOWN */) { // start streaming session
                    _this.handleSiriAudioStart();
                }
                else if (buttonState === 0 /* UP */) { // stop streaming session
                    _this.handleSiriAudioStop();
                }
                return;
            }
            var buttonIdTlv = tlv.encode(1 /* BUTTON_ID */, buttonID);
            var buttonStateTlv = tlv.encode(2 /* BUTTON_STATE */, buttonState);
            var timestampTlv = tlv.encode(3 /* TIMESTAMP */, tlv.writeUInt64(new Date().getTime())
            // timestamp should be uint64. bigint though is only supported by node 10.4.0 and above
            // thus we just interpret timestamp as a regular number
            );
            var activeIdentifierTlv = tlv.encode(4 /* ACTIVE_IDENTIFIER */, tlv.writeUInt32(_this.activeIdentifier));
            _this.lastButtonEvent = Buffer.concat([
                buttonIdTlv, buttonStateTlv, timestampTlv, activeIdentifierTlv
            ]).toString('base64');
            _this.targetControlService.getCharacteristic(Characteristic_1.Characteristic.ButtonEvent).updateValue(_this.lastButtonEvent);
        };
        _this.parseTargetConfigurationTLV = function (data) {
            var configTLV = tlv.decode(data);
            var identifier = tlv.readUInt32(configTLV[1 /* TARGET_IDENTIFIER */]);
            var name = undefined;
            if (configTLV[2 /* TARGET_NAME */])
                name = configTLV[2 /* TARGET_NAME */].toString();
            var category = undefined;
            if (configTLV[3 /* TARGET_CATEGORY */])
                category = tlv.readUInt16(configTLV[3 /* TARGET_CATEGORY */]);
            var buttonConfiguration = {};
            if (configTLV[4 /* BUTTON_CONFIGURATION */]) {
                var buttonConfigurationTLV = tlv.decodeList(configTLV[4 /* BUTTON_CONFIGURATION */], 1 /* BUTTON_ID */);
                buttonConfigurationTLV.forEach(function (entry) {
                    var buttonId = entry[1 /* BUTTON_ID */][0];
                    var buttonType = tlv.readUInt16(entry[2 /* BUTTON_TYPE */]);
                    var buttonName;
                    if (entry[3 /* BUTTON_NAME */]) {
                        buttonName = entry[3 /* BUTTON_NAME */].toString();
                    }
                    else {
                        // @ts-ignore
                        buttonName = ButtonType[buttonType];
                    }
                    buttonConfiguration[buttonId] = {
                        buttonID: buttonId,
                        buttonType: buttonType,
                        buttonName: buttonName
                    };
                });
            }
            return {
                targetIdentifier: identifier,
                targetName: name,
                targetCategory: category,
                buttonConfiguration: buttonConfiguration
            };
        };
        _this.updatedTargetConfiguration = function () {
            var bufferList = [];
            var _loop_1 = function (key) {
                // noinspection JSUnfilteredForInLoop
                var configuration = _this.targetConfigurations[key];
                var targetIdentifier = tlv.encode(1 /* TARGET_IDENTIFIER */, tlv.writeUInt32(configuration.targetIdentifier));
                var targetName = tlv.encode(2 /* TARGET_NAME */, configuration.targetName);
                var targetCategory = tlv.encode(3 /* TARGET_CATEGORY */, tlv.writeUInt16(configuration.targetCategory));
                var buttonConfigurationBuffers = [];
                Object.values(configuration.buttonConfiguration).forEach(function (value) {
                    var tlvBuffer = tlv.encode(1 /* BUTTON_ID */, value.buttonID, 2 /* BUTTON_TYPE */, tlv.writeUInt16(value.buttonType));
                    if (value.buttonName) {
                        tlvBuffer = Buffer.concat([
                            tlvBuffer,
                            tlv.encode(3 /* BUTTON_NAME */, value.buttonName)
                        ]);
                    }
                    buttonConfigurationBuffers.push(tlvBuffer);
                });
                var buttonConfiguration = tlv.encode(4 /* BUTTON_CONFIGURATION */, Buffer.concat(buttonConfigurationBuffers));
                var targetConfiguration = Buffer.concat([targetIdentifier, targetName, targetCategory, buttonConfiguration]);
                bufferList.push(tlv.encode(2 /* TARGET_CONFIGURATION */, targetConfiguration));
            };
            for (var key in _this.targetConfigurations) {
                _loop_1(key);
            }
            _this.targetConfigurationsString = Buffer.concat(bufferList).toString('base64');
            _this.stateChangeDelegate && _this.stateChangeDelegate();
        };
        _this.buildTargetControlSupportedConfigurationTLV = function (configuration) {
            var maximumTargets = tlv.encode(1 /* MAXIMUM_TARGETS */, configuration.maximumTargets);
            var ticksPerSecond = tlv.encode(2 /* TICKS_PER_SECOND */, tlv.writeUInt64(configuration.ticksPerSecond));
            var supportedButtonConfigurationBuffers = [];
            configuration.supportedButtonConfiguration.forEach(function (value) {
                var tlvBuffer = tlv.encode(1 /* BUTTON_ID */, value.buttonID, 2 /* BUTTON_TYPE */, tlv.writeUInt16(value.buttonType));
                supportedButtonConfigurationBuffers.push(tlvBuffer);
            });
            var supportedButtonConfiguration = tlv.encode(3 /* SUPPORTED_BUTTON_CONFIGURATION */, Buffer.concat(supportedButtonConfigurationBuffers));
            var type = tlv.encode(4 /* TYPE */, configuration.hardwareImplemented ? 1 : 0);
            return Buffer.concat([maximumTargets, ticksPerSecond, supportedButtonConfiguration, type]).toString('base64');
        };
        // --------------------------------- SIRI/DATA STREAM --------------------------------
        _this.handleTargetControlWhoAmI = function (connection, message) {
            var targetIdentifier = message["identifier"];
            _this.dataStreamConnections[targetIdentifier] = connection;
            debug("Discovered HDS connection for targetIdentifier %s", targetIdentifier);
            connection.addProtocolHandler("dataSend" /* DATA_SEND */, _this);
        };
        _this.handleSiriAudioStart = function () {
            if (!_this.audioSupported) {
                throw new Error("Cannot start siri stream on remote where siri is not supported");
            }
            if (!_this.isActive()) {
                debug("Tried opening Siri audio stream, however no controller is connected!");
                return;
            }
            if (_this.activeAudioSession && (!_this.activeAudioSession.isClosing() || _this.nextAudioSession)) {
                // there is already a session running, which is not in closing state and/or there is even already a
                // nextAudioSession running. ignoring start request
                debug("Tried opening Siri audio stream, however there is already one in progress");
                return;
            }
            var connection = _this.dataStreamConnections[_this.activeIdentifier]; // get connection for current target
            if (connection === undefined) { // target seems not connected, ignore it
                debug("Tried opening Siri audio stream however target is not connected via HDS");
                return;
            }
            var audioSession = new SiriAudioSession(connection, _this.selectedAudioConfiguration, _this.audioProducerConstructor, _this.audioProducerOptions);
            if (!_this.activeAudioSession) {
                _this.activeAudioSession = audioSession;
            }
            else {
                // we checked above that this only happens if the activeAudioSession is in closing state,
                // so no collision with the input device can happen
                _this.nextAudioSession = audioSession;
            }
            audioSession.on("close" /* CLOSE */, _this.handleSiriAudioSessionClosed.bind(_this, audioSession));
            audioSession.start();
        };
        _this.handleSiriAudioStop = function () {
            if (_this.activeAudioSession) {
                if (!_this.activeAudioSession.isClosing()) {
                    _this.activeAudioSession.stop();
                    return;
                }
                else if (_this.nextAudioSession && !_this.nextAudioSession.isClosing()) {
                    _this.nextAudioSession.stop();
                    return;
                }
            }
            debug("handleSiriAudioStop called although no audio session was started");
        };
        _this.handleDataSendAckEvent = function (message) {
            var streamId = message["streamId"];
            var endOfStream = message["endOfStream"];
            if (_this.activeAudioSession && _this.activeAudioSession.streamId === streamId) {
                _this.activeAudioSession.handleDataSendAckEvent(endOfStream);
            }
            else if (_this.nextAudioSession && _this.nextAudioSession.streamId === streamId) {
                _this.nextAudioSession.handleDataSendAckEvent(endOfStream);
            }
            else {
                debug("Received dataSend acknowledgment event for unknown streamId '%s'", streamId);
            }
        };
        _this.handleDataSendCloseEvent = function (message) {
            var streamId = message["streamId"];
            var reason = message["reason"];
            if (_this.activeAudioSession && _this.activeAudioSession.streamId === streamId) {
                _this.activeAudioSession.handleDataSendCloseEvent(reason);
            }
            else if (_this.nextAudioSession && _this.nextAudioSession.streamId === streamId) {
                _this.nextAudioSession.handleDataSendCloseEvent(reason);
            }
            else {
                debug("Received dataSend close event for unknown streamId '%s'", streamId);
            }
        };
        _this.handleSiriAudioSessionClosed = function (session) {
            if (session === _this.activeAudioSession) {
                _this.activeAudioSession = _this.nextAudioSession;
                _this.nextAudioSession = undefined;
            }
            else if (session === _this.nextAudioSession) {
                _this.nextAudioSession = undefined;
            }
        };
        _this.handleDataStreamConnectionClosed = function (connection) {
            for (var targetIdentifier in _this.dataStreamConnections) {
                var connection0 = _this.dataStreamConnections[targetIdentifier];
                if (connection === connection0) {
                    debug("HDS connection disconnected for targetIdentifier %s", targetIdentifier);
                    delete _this.dataStreamConnections[targetIdentifier];
                    break;
                }
            }
        };
        // ------------------------------- AUDIO CONFIGURATION -------------------------------
        _this.handleSelectedAudioConfigurationWrite = function (value, callback) {
            var data = Buffer.from(value, 'base64');
            var objects = tlv.decode(data);
            var selectedAudioStreamConfiguration = tlv.decode(objects[1 /* SELECTED_AUDIO_INPUT_STREAM_CONFIGURATION */]);
            var codec = selectedAudioStreamConfiguration[1 /* CODEC_TYPE */][0];
            var parameters = tlv.decode(selectedAudioStreamConfiguration[2 /* CODEC_PARAMETERS */]);
            var channels = parameters[1 /* CHANNEL */][0];
            var bitrate = parameters[2 /* BIT_RATE */][0];
            var samplerate = parameters[3 /* SAMPLE_RATE */][0];
            _this.selectedAudioConfiguration = {
                codecType: codec,
                parameters: {
                    channels: channels,
                    bitrate: bitrate,
                    samplerate: samplerate,
                    rtpTime: 20
                }
            };
            _this.selectedAudioConfigurationString = _this.buildSelectedAudioConfigurationTLV({
                audioCodecConfiguration: _this.selectedAudioConfiguration,
            });
            callback();
        };
        _this.buildSupportedAudioConfigurationTLV = function (configuration) {
            var codecConfigurationTLV = _this.buildCodecConfigurationTLV(configuration.audioCodecConfiguration);
            var supportedAudioStreamConfiguration = tlv.encode(1 /* AUDIO_CODEC_CONFIGURATION */, codecConfigurationTLV);
            return supportedAudioStreamConfiguration.toString('base64');
        };
        _this.buildSelectedAudioConfigurationTLV = function (configuration) {
            var codecConfigurationTLV = _this.buildCodecConfigurationTLV(configuration.audioCodecConfiguration);
            var supportedAudioStreamConfiguration = tlv.encode(1 /* SELECTED_AUDIO_INPUT_STREAM_CONFIGURATION */, codecConfigurationTLV);
            return supportedAudioStreamConfiguration.toString('base64');
        };
        _this.buildCodecConfigurationTLV = function (codecConfiguration) {
            var parameters = codecConfiguration.parameters;
            var parametersTLV = tlv.encode(1 /* CHANNEL */, parameters.channels, 2 /* BIT_RATE */, parameters.bitrate, 3 /* SAMPLE_RATE */, parameters.samplerate);
            if (parameters.rtpTime) {
                parametersTLV = Buffer.concat([
                    parametersTLV,
                    tlv.encode(4 /* PACKET_TIME */, parameters.rtpTime)
                ]);
            }
            return tlv.encode(1 /* CODEC_TYPE */, codecConfiguration.codecType, 2 /* CODEC_PARAMETERS */, parametersTLV);
        };
        _this.audioSupported = audioProducerConstructor !== undefined;
        _this.audioProducerConstructor = audioProducerConstructor;
        _this.audioProducerOptions = producerOptions;
        var configuration = _this.constructSupportedConfiguration();
        _this.supportedConfiguration = _this.buildTargetControlSupportedConfigurationTLV(configuration);
        var audioConfiguration = _this.constructSupportedAudioConfiguration();
        _this.supportedAudioConfiguration = _this.buildSupportedAudioConfigurationTLV(audioConfiguration);
        _this.selectedAudioConfiguration = {
            codecType: 3 /* OPUS */,
            parameters: {
                channels: 1,
                bitrate: 0 /* VARIABLE */,
                samplerate: 1 /* KHZ_16 */,
                rtpTime: 20,
            }
        };
        _this.selectedAudioConfigurationString = _this.buildSelectedAudioConfigurationTLV({
            audioCodecConfiguration: _this.selectedAudioConfiguration,
        });
        return _this;
    }
    // -----------------------------------------------------------------------------------
    RemoteController.prototype.constructServices = function () {
        this.targetControlManagementService = new Service_1.Service.TargetControlManagement('', '');
        this.targetControlManagementService.setCharacteristic(Characteristic_1.Characteristic.TargetControlSupportedConfiguration, this.supportedConfiguration);
        this.targetControlManagementService.setCharacteristic(Characteristic_1.Characteristic.TargetControlList, this.targetConfigurationsString);
        this.targetControlManagementService.setPrimaryService();
        // you can also expose multiple TargetControl services to control multiple apple tvs simultaneously.
        // should we extend this class to support multiple TargetControl services or should users just create a second accessory?
        this.targetControlService = new Service_1.Service.TargetControl('', '');
        this.targetControlService.setCharacteristic(Characteristic_1.Characteristic.ActiveIdentifier, 0);
        this.targetControlService.setCharacteristic(Characteristic_1.Characteristic.Active, false);
        this.targetControlService.setCharacteristic(Characteristic_1.Characteristic.ButtonEvent, this.lastButtonEvent);
        if (this.audioSupported) {
            this.siriService = new Service_1.Service.Siri('', '');
            this.siriService.setCharacteristic(Characteristic_1.Characteristic.SiriInputType, 0 /* PUSH_BUTTON_TRIGGERED_APPLE_TV */);
            this.audioStreamManagementService = new Service_1.Service.AudioStreamManagement('', '');
            this.audioStreamManagementService.setCharacteristic(Characteristic_1.Characteristic.SupportedAudioStreamConfiguration, this.supportedAudioConfiguration);
            this.audioStreamManagementService.setCharacteristic(Characteristic_1.Characteristic.SelectedAudioStreamConfiguration, this.selectedAudioConfigurationString);
            this.dataStreamManagement = new datastream_1.DataStreamManagement();
            this.siriService.addLinkedService(this.dataStreamManagement.getService());
            this.siriService.addLinkedService(this.audioStreamManagementService);
        }
        return {
            targetControlManagement: this.targetControlManagementService,
            targetControl: this.targetControlService,
            siri: this.siriService,
            audioStreamManagement: this.audioStreamManagementService,
            dataStreamTransportManagement: this.dataStreamManagement && this.dataStreamManagement.getService()
        };
    };
    RemoteController.prototype.initWithServices = function (serviceMap) {
        this.targetControlManagementService = serviceMap.targetControlManagement;
        this.targetControlService = serviceMap.targetControl;
        this.siriService = serviceMap.siri;
        this.audioStreamManagementService = serviceMap.audioStreamManagement;
        this.dataStreamManagement = new datastream_1.DataStreamManagement(serviceMap.dataStreamTransportManagement);
    };
    RemoteController.prototype.configureServices = function () {
        var _a;
        var _this = this;
        if (!this.targetControlManagementService || !this.targetControlService) {
            throw new Error("Unexpected state: Services not configured!"); // playing it save
        }
        this.targetControlManagementService.getCharacteristic(Characteristic_1.Characteristic.TargetControlList)
            .on("get" /* GET */, function (callback) {
            callback(null, _this.targetConfigurationsString);
        })
            .on("set" /* SET */, function (value, callback) {
            _this.handleTargetControlWrite(value, callback);
        });
        this.targetControlService.getCharacteristic(Characteristic_1.Characteristic.ActiveIdentifier)
            .on("get" /* GET */, function (callback) {
            callback(undefined, _this.activeIdentifier);
        });
        this.targetControlService.getCharacteristic(Characteristic_1.Characteristic.Active)
            .on("get" /* GET */, function (callback) {
            callback(undefined, _this.isActive());
        })
            .on("set" /* SET */, function (value, callback, context, connectionID) {
            _this.handleActiveWrite(value, callback, connectionID);
        });
        this.targetControlService.getCharacteristic(Characteristic_1.Characteristic.ButtonEvent)
            .on("get" /* GET */, function (callback) {
            callback(undefined, _this.lastButtonEvent);
        });
        if (this.audioSupported) {
            this.audioStreamManagementService.getCharacteristic(Characteristic_1.Characteristic.SelectedAudioStreamConfiguration)
                .on("get" /* GET */, function (callback) {
                callback(null, _this.selectedAudioConfigurationString);
            })
                .on("set" /* SET */, function (value, callback) {
                _this.handleSelectedAudioConfigurationWrite(value, callback);
            }).getValue();
            this.dataStreamManagement
                .onEventMessage("targetControl" /* TARGET_CONTROL */, "whoami" /* WHOAMI */, this.handleTargetControlWhoAmI.bind(this))
                .onServerEvent("connection-closed" /* CONNECTION_CLOSED */, this.handleDataStreamConnectionClosed.bind(this));
            this.eventHandler = (_a = {},
                _a["ack" /* ACK */] = this.handleDataSendAckEvent.bind(this),
                _a["close" /* CLOSE */] = this.handleDataSendCloseEvent.bind(this),
                _a);
        }
    };
    RemoteController.prototype.handleFactoryReset = function () {
        debug("Accessory was unpaired. Resetting targets...");
        this.handleResetTargets(undefined);
    };
    RemoteController.prototype.serialize = function () {
        if (!this.activeIdentifier && Object.keys(this.targetConfigurations).length === 0) {
            return undefined;
        }
        return {
            activeIdentifier: this.activeIdentifier,
            targetConfigurations: this.targetConfigurations,
        };
    };
    RemoteController.prototype.deserialize = function (serialized) {
        this.activeIdentifier = serialized.activeIdentifier;
        this.targetConfigurations = serialized.targetConfigurations;
        this.updatedTargetConfiguration();
    };
    RemoteController.prototype.setupStateChangeDelegate = function (delegate) {
        this.stateChangeDelegate = delegate;
    };
    return RemoteController;
}(EventEmitter_1.EventEmitter));
exports.RemoteController = RemoteController;
// noinspection JSUnusedGlobalSymbols
/**
 * @deprecated - only there for backwards compatibility, please use {@see RemoteController} directly
 */
var HomeKitRemoteController = /** @class */ (function (_super) {
    __extends(HomeKitRemoteController, _super);
    function HomeKitRemoteController() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return HomeKitRemoteController;
}(RemoteController)); // backwards compatibility
exports.HomeKitRemoteController = HomeKitRemoteController;
var SiriAudioSessionEvents;
(function (SiriAudioSessionEvents) {
    SiriAudioSessionEvents["CLOSE"] = "close";
})(SiriAudioSessionEvents = exports.SiriAudioSessionEvents || (exports.SiriAudioSessionEvents = {}));
/**
 * Represents an ongoing audio transmission
 */
var SiriAudioSession = /** @class */ (function (_super) {
    __extends(SiriAudioSession, _super);
    function SiriAudioSession(connection, selectedAudioConfiguration, producerConstructor, producerOptions) {
        var _this = _super.call(this) || this;
        _this.producerRunning = false; // indicates if the producer is running
        _this.state = 0 /* STARTING */;
        _this.endOfStream = false;
        _this.audioFrameQueue = [];
        _this.maxQueueSize = 1024;
        _this.sequenceNumber = 0;
        _this.handleSiriAudioFrame = function (frame) {
            if (_this.state >= 2 /* CLOSING */) {
                return;
            }
            if (_this.producerTimer) { // if producerTimer is defined, then this is the first frame we are receiving
                clearTimeout(_this.producerTimer);
                _this.producerTimer = undefined;
            }
            if (frame && _this.audioFrameQueue.length < _this.maxQueueSize) { // add frame to queue whilst it is not full
                _this.audioFrameQueue.push(frame);
            }
            if (_this.state !== 1 /* SENDING */) { // dataSend isn't open yet
                return;
            }
            var queued;
            var _loop_2 = function () {
                var packets = [];
                queued.forEach(function (frame) {
                    var packetData = {
                        data: frame.data,
                        metadata: {
                            rms: new datastream_1.Float32(frame.rms),
                            sequenceNumber: new datastream_1.Int64(_this.sequenceNumber++),
                        }
                    };
                    packets.push(packetData);
                });
                var message = {
                    packets: packets,
                    streamId: new datastream_1.Int64(_this.streamId),
                    endOfStream: _this.endOfStream,
                };
                try {
                    _this.connection.sendEvent("dataSend" /* DATA_SEND */, "data" /* DATA */, message);
                }
                catch (error) {
                    debug("Error occurred when trying to send audio frame of hds connection: %s", error.message);
                    _this.stopAudioProducer();
                    _this.closed();
                }
                if (_this.endOfStream) {
                    return "break";
                }
            };
            while ((queued = _this.popSome()) !== null) {
                var state_1 = _loop_2();
                if (state_1 === "break")
                    break;
            }
        };
        _this.handleProducerError = function (error) {
            if (_this.state >= 2 /* CLOSING */) {
                return;
            }
            _this.stopAudioProducer(); // ensure backend is closed
            if (_this.state === 1 /* SENDING */) { // if state is less than sending dataSend isn't open (yet)
                _this.sendDataSendCloseEvent(error); // cancel submission
            }
        };
        _this.handleDataSendAckEvent = function (endOfStream) {
            assert_1.default.strictEqual(endOfStream, true);
            debug("Received acknowledgment for siri audio stream with streamId %s, closing it now", _this.streamId);
            _this.sendDataSendCloseEvent(datastream_1.DataSendCloseReason.NORMAL);
        };
        _this.handleDataSendCloseEvent = function (reason) {
            debug("Received close event from controller with reason %s for stream with streamId %s", datastream_1.DataSendCloseReason[reason], _this.streamId);
            if (_this.state <= 1 /* SENDING */) {
                _this.stopAudioProducer();
            }
            _this.closed();
        };
        _this.sendDataSendCloseEvent = function (reason) {
            assert_1.default(_this.state >= 1 /* SENDING */, "state was less than SENDING");
            assert_1.default(_this.state <= 2 /* CLOSING */, "state was higher than CLOSING");
            _this.connection.sendEvent("dataSend" /* DATA_SEND */, "close" /* CLOSE */, {
                streamId: new datastream_1.Int64(_this.streamId),
                reason: new datastream_1.Int64(reason),
            });
            _this.closed();
        };
        _this.handleDataStreamConnectionClosed = function () {
            debug("Closing audio session with streamId %d", _this.streamId);
            if (_this.state <= 1 /* SENDING */) {
                _this.stopAudioProducer();
            }
            _this.closed();
        };
        _this.closed = function () {
            var lastState = _this.state;
            _this.state = 3 /* CLOSED */;
            if (lastState !== 3 /* CLOSED */) {
                _this.emit("close" /* CLOSE */);
                _this.connection.removeListener("closed" /* CLOSED */, _this.closeListener);
            }
        };
        _this.connection = connection;
        _this.selectedAudioConfiguration = selectedAudioConfiguration;
        _this.producer = new producerConstructor(_this.handleSiriAudioFrame.bind(_this), _this.handleProducerError.bind(_this), producerOptions);
        _this.connection.on("closed" /* CLOSED */, _this.closeListener = _this.handleDataStreamConnectionClosed.bind(_this));
        return _this;
    }
    /**
     * Called when siri button is pressed
     */
    SiriAudioSession.prototype.start = function () {
        var _this = this;
        debug("Sending request to start siri audio stream");
        // opening dataSend
        this.connection.sendRequest("dataSend" /* DATA_SEND */, "open" /* OPEN */, {
            target: "controller",
            type: "audio.siri"
        }, function (error, status, message) {
            if (_this.state === 3 /* CLOSED */) {
                debug("Ignoring dataSend open response as the session is already closed");
                return;
            }
            assert_1.default.strictEqual(_this.state, 0 /* STARTING */);
            _this.state = 1 /* SENDING */;
            if (error || status) {
                if (error) { // errors get produced by hap-nodejs
                    debug("Error occurred trying to start siri audio stream: %s", error.message);
                }
                else if (status) { // status codes are those returned by the hds response
                    debug("Controller responded with non-zero status code: %s", datastream_1.HDSStatus[status]);
                }
                _this.closed();
            }
            else {
                _this.streamId = message["streamId"];
                if (!_this.producerRunning) { // audio producer errored in the meantime
                    _this.sendDataSendCloseEvent(datastream_1.DataSendCloseReason.CANCELLED);
                }
                else {
                    debug("Successfully setup siri audio stream with streamId %d", _this.streamId);
                }
            }
        });
        this.startAudioProducer(); // start audio producer and queue frames in the meantime
    };
    /**
     * @returns if the audio session is closing
     */
    SiriAudioSession.prototype.isClosing = function () {
        return this.state >= 2 /* CLOSING */;
    };
    /**
     * Called when siri button is released (or active identifier is changed to another device)
     */
    SiriAudioSession.prototype.stop = function () {
        assert_1.default(this.state <= 1 /* SENDING */, "state was higher than SENDING");
        debug("Stopping siri audio stream with streamId %d", this.streamId);
        this.endOfStream = true; // mark as endOfStream
        this.stopAudioProducer();
        if (this.state === 1 /* SENDING */) {
            this.handleSiriAudioFrame(undefined); // send out last few audio frames with endOfStream property set
            this.state = 2 /* CLOSING */; // we are waiting for an acknowledgment (triggered by endOfStream property)
        }
        else { // if state is not SENDING (aka state is STARTING) the callback for DATA_SEND OPEN did not yet return (or never will)
            this.closed();
        }
    };
    SiriAudioSession.prototype.startAudioProducer = function () {
        var _this = this;
        this.producer.startAudioProduction(this.selectedAudioConfiguration);
        this.producerRunning = true;
        this.producerTimer = setTimeout(function () {
            debug("Didn't receive any frames from audio producer for stream with streamId %s. Canceling the stream now.", _this.streamId);
            _this.producerTimer = undefined;
            _this.handleProducerError(datastream_1.DataSendCloseReason.CANCELLED);
        }, 3000);
    };
    SiriAudioSession.prototype.stopAudioProducer = function () {
        this.producer.stopAudioProduction();
        this.producerRunning = false;
        if (this.producerTimer) {
            clearTimeout(this.producerTimer);
            this.producerTimer = undefined;
        }
    };
    SiriAudioSession.prototype.popSome = function () {
        if (this.audioFrameQueue.length < 5 && !this.endOfStream) {
            return null;
        }
        var size = Math.min(this.audioFrameQueue.length, 5); // 5 frames per hap packet seems fine
        var result = [];
        for (var i = 0; i < size; i++) {
            var element = this.audioFrameQueue.shift(); // removes first element
            result.push(element);
        }
        return result;
    };
    return SiriAudioSession;
}(EventEmitter_1.EventEmitter));
exports.SiriAudioSession = SiriAudioSession;
//# sourceMappingURL=RemoteController.js.map