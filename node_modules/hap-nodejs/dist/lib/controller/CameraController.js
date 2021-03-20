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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CameraController = exports.CameraControllerEvents = void 0;
var __1 = require("../..");
var EventEmitter_1 = require("../EventEmitter");
var crypto_1 = __importDefault(require("crypto"));
var CameraControllerEvents;
(function (CameraControllerEvents) {
    CameraControllerEvents["MICROPHONE_PROPERTIES_CHANGED"] = "microphone-change";
    CameraControllerEvents["SPEAKER_PROPERTIES_CHANGED"] = "speaker-change";
})(CameraControllerEvents = exports.CameraControllerEvents || (exports.CameraControllerEvents = {}));
/**
 * Everything needed to expose a HomeKit Camera.
 *
 * @event 'microphone-change' => (muted: boolean, volume: number) => void
 *      Emitted when the mute state or the volume changed. The Apple Home App typically does not set those values
 *      except the mute state. When you adjust the volume in the Camera view it will reset the muted state if it was set previously.
 *      The value of volume has nothing to do with the volume slider in the Camera view of the Home app.
 * @event 'speaker-change' => (muted: boolean, volume: number) => void
 *      Emitted when the mute state or the volume changed. The Apple Home App typically does not set those values
 *      except the mute state. When you unmute the device microphone it will reset the mute state if it was set previously.
 */
var CameraController = /** @class */ (function (_super) {
    __extends(CameraController, _super);
    function CameraController(options, legacyMode) {
        if (legacyMode === void 0) { legacyMode = false; }
        var _this = _super.call(this) || this;
        _this.controllerType = "camera" /* CAMERA */;
        // private readonly recordingOptions: CameraRecordingOptions, // soon
        _this.legacyMode = false;
        _this.streamManagements = [];
        _this.microphoneMuted = false;
        _this.microphoneVolume = 100;
        _this.speakerMuted = false;
        _this.speakerVolume = 100;
        _this.streamCount = Math.max(1, options.cameraStreamCount || 1);
        _this.delegate = options.delegate;
        _this.streamingOptions = options.streamingOptions;
        _this.legacyMode = legacyMode; // legacy mode will prent from Microphone and Speaker services to get created to avoid collisions
        return _this;
    }
    // ----------------------------------- STREAM API ------------------------------------
    /**
     * Call this method if you want to forcefully suspend an ongoing streaming session.
     * This would be adequate if the the rtp server or media encoding encountered an unexpected error.
     *
     * @param sessionId {SessionIdentifier} - id of the current ongoing streaming session
     */
    CameraController.prototype.forceStopStreamingSession = function (sessionId) {
        this.streamManagements.forEach(function (management) {
            if (management.sessionIdentifier === sessionId) {
                management.forceStop();
            }
        });
    };
    CameraController.generateSynchronisationSource = function () {
        var ssrc = crypto_1.default.randomBytes(4); // range [-2.14748e+09 - 2.14748e+09]
        ssrc[0] = 0;
        return ssrc.readInt32BE(0);
    };
    // ----------------------------- MICROPHONE/SPEAKER API ------------------------------
    CameraController.prototype.setMicrophoneMuted = function (muted) {
        if (muted === void 0) { muted = true; }
        if (!this.microphoneService) {
            return;
        }
        this.microphoneMuted = muted;
        this.microphoneService.updateCharacteristic(__1.Characteristic.Mute, muted);
    };
    CameraController.prototype.setMicrophoneVolume = function (volume) {
        if (!this.microphoneService) {
            return;
        }
        this.microphoneVolume = volume;
        this.microphoneService.updateCharacteristic(__1.Characteristic.Volume, volume);
    };
    CameraController.prototype.setSpeakerMuted = function (muted) {
        if (muted === void 0) { muted = true; }
        if (!this.speakerService) {
            return;
        }
        this.speakerMuted = muted;
        this.speakerService.updateCharacteristic(__1.Characteristic.Mute, muted);
    };
    CameraController.prototype.setSpeakerVolume = function (volume) {
        if (!this.speakerService) {
            return;
        }
        this.speakerVolume = volume;
        this.speakerService.updateCharacteristic(__1.Characteristic.Volume, volume);
    };
    CameraController.prototype.emitMicrophoneChange = function () {
        this.emit("microphone-change" /* MICROPHONE_PROPERTIES_CHANGED */, this.microphoneMuted, this.microphoneVolume);
    };
    CameraController.prototype.emitSpeakerChange = function () {
        this.emit("speaker-change" /* SPEAKER_PROPERTIES_CHANGED */, this.speakerMuted, this.speakerVolume);
    };
    // -----------------------------------------------------------------------------------
    CameraController.prototype.constructServices = function () {
        for (var i = 0; i < this.streamCount; i++) {
            this.streamManagements.push(new __1.RTPStreamManagement(i, this.streamingOptions, this.delegate));
        }
        if (!this.legacyMode && this.streamingOptions.audio) {
            // In theory the Microphone Service is a necessity. In practice its not. lol. So we just add it if the user wants to support audio
            this.microphoneService = new __1.Service.Microphone('', '');
            this.microphoneService.setCharacteristic(__1.Characteristic.Volume, this.microphoneVolume);
            if (this.streamingOptions.audio.twoWayAudio) {
                this.speakerService = new __1.Service.Speaker('', '');
                this.speakerService.setCharacteristic(__1.Characteristic.Volume, this.speakerVolume);
            }
        }
        var serviceMap = {
            microphone: this.microphoneService,
            speaker: this.speakerService,
        };
        this.streamManagements.forEach(function (management, index) { return serviceMap[CameraController.STREAM_MANAGEMENT + index] = management.getService(); });
        return serviceMap;
    };
    CameraController.prototype.initWithServices = function (serviceMap) {
        var _a;
        var modifiedServiceMap = false;
        for (var i = 0; true; i++) {
            var streamManagementService = serviceMap[CameraController.STREAM_MANAGEMENT + i];
            if (i < this.streamCount) {
                if (streamManagementService) { // normal init
                    this.streamManagements.push(new __1.RTPStreamManagement(i, this.streamingOptions, this.delegate, streamManagementService));
                }
                else { // stream count got bigger, we need to create a new service
                    var management = new __1.RTPStreamManagement(i, this.streamingOptions, this.delegate);
                    this.streamManagements.push(management);
                    serviceMap[CameraController.STREAM_MANAGEMENT + i] = management.getService();
                    modifiedServiceMap = true;
                }
            }
            else {
                if (streamManagementService) { // stream count got reduced, we need to remove old service
                    delete serviceMap[CameraController.STREAM_MANAGEMENT + i];
                    modifiedServiceMap = true;
                }
                else {
                    break; // we finished counting and we got no saved service; we are finished
                }
            }
        }
        // MICROPHONE
        if (!this.legacyMode && this.streamingOptions.audio) { // microphone should be present
            if (serviceMap.microphone) {
                this.microphoneService = serviceMap.microphone;
            }
            else {
                // microphone wasn't created yet => create a new one
                this.microphoneService = new __1.Service.Microphone('', '');
                this.microphoneService.setCharacteristic(__1.Characteristic.Volume, this.microphoneVolume);
                serviceMap.microphone = this.microphoneService;
                modifiedServiceMap = true;
            }
        }
        else if (serviceMap.microphone) { // microphone service supplied, though settings seemed to have changed
            // we need to remove it
            delete serviceMap.microphone;
            modifiedServiceMap = true;
        }
        // SPEAKER
        if (!this.legacyMode && ((_a = this.streamingOptions.audio) === null || _a === void 0 ? void 0 : _a.twoWayAudio)) { // speaker should be present
            if (serviceMap.speaker) {
                this.speakerService = serviceMap.speaker;
            }
            else {
                // speaker wasn't created yet => create a new one
                this.speakerService = new __1.Service.Speaker('', '');
                this.speakerService.setCharacteristic(__1.Characteristic.Volume, this.speakerVolume);
                serviceMap.speaker = this.speakerService;
                modifiedServiceMap = true;
            }
        }
        else if (serviceMap.speaker) { // speaker service supplied, though settings seemed to have changed
            // we need to remove it
            delete serviceMap.speaker;
            modifiedServiceMap = true;
        }
        if (this.migrateFromDoorbell(serviceMap)) {
            modifiedServiceMap = true;
        }
        if (modifiedServiceMap) { // serviceMap must only be returned if anything actually changed
            return serviceMap;
        }
    };
    // overwritten in DoorbellController (to avoid cyclic dependencies, i hate typescript for that)
    CameraController.prototype.migrateFromDoorbell = function (serviceMap) {
        if (serviceMap.doorbell) { // See NOTICE in DoorbellController
            delete serviceMap.doorbell;
            return true;
        }
        return false;
    };
    CameraController.prototype.configureServices = function () {
        var _this = this;
        if (this.microphoneService) {
            this.microphoneService.getCharacteristic(__1.Characteristic.Mute)
                .on("get" /* GET */, function (callback) {
                callback(undefined, _this.microphoneMuted);
            })
                .on("set" /* SET */, function (value, callback) {
                _this.microphoneMuted = value;
                callback();
                _this.emitMicrophoneChange();
            });
            this.microphoneService.getCharacteristic(__1.Characteristic.Volume)
                .on("get" /* GET */, function (callback) {
                callback(undefined, _this.microphoneVolume);
            })
                .on("set" /* SET */, function (value, callback) {
                _this.microphoneVolume = value;
                callback();
                _this.emitMicrophoneChange();
            });
        }
        if (this.speakerService) {
            this.speakerService.getCharacteristic(__1.Characteristic.Mute)
                .on("get" /* GET */, function (callback) {
                callback(undefined, _this.speakerMuted);
            })
                .on("set" /* SET */, function (value, callback) {
                _this.speakerMuted = value;
                callback();
                _this.emitSpeakerChange();
            });
            this.speakerService.getCharacteristic(__1.Characteristic.Volume)
                .on("get" /* GET */, function (callback) {
                callback(undefined, _this.speakerVolume);
            })
                .on("set" /* SET */, function (value, callback) {
                _this.speakerVolume = value;
                callback();
                _this.emitSpeakerChange();
            });
        }
    };
    CameraController.prototype.handleFactoryReset = function () {
        this.streamManagements.forEach(function (management) { return management.handleFactoryReset(); });
    };
    CameraController.prototype.handleSnapshotRequest = function (height, width, callback) {
        this.delegate.handleSnapshotRequest({
            height: height,
            width: width,
        }, callback);
    };
    CameraController.prototype.handleCloseConnection = function (sessionID) {
        this.streamManagements.forEach(function (management) { return management.handleCloseConnection(sessionID); });
        if (this.delegate instanceof __1.LegacyCameraSourceAdapter) {
            this.delegate.forwardCloseConnection(sessionID);
        }
    };
    CameraController.STREAM_MANAGEMENT = "streamManagement"; // key to index all RTPStreamManagement services
    return CameraController;
}(EventEmitter_1.EventEmitter));
exports.CameraController = CameraController;
//# sourceMappingURL=CameraController.js.map