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
exports.StreamController = exports.RTPStreamManagement = exports.StreamRequestTypes = exports.AudioStreamingSamplerate = exports.AudioStreamingCodecType = exports.SRTPCryptoSuites = exports.H264Level = exports.H264Profile = void 0;
var crypto_1 = __importDefault(require("crypto"));
var debug_1 = __importDefault(require("debug"));
var net_1 = __importDefault(require("net"));
var index_1 = require("../../index");
var Characteristic_1 = require("../Characteristic");
var controller_1 = require("../controller");
var Service_1 = require("../Service");
var eventedhttp_1 = require("../util/eventedhttp");
var tlv = __importStar(require("../util/tlv"));
var RTPProxy_1 = __importDefault(require("./RTPProxy"));
var debug = debug_1.default('HAP-NodeJS:Camera:RTPStreamManagement');
// ---------------------------------- TLV DEFINITIONS START ----------------------------------
var StreamingStatusTypes;
(function (StreamingStatusTypes) {
    StreamingStatusTypes[StreamingStatusTypes["STATUS"] = 1] = "STATUS";
})(StreamingStatusTypes || (StreamingStatusTypes = {}));
var StreamingStatus;
(function (StreamingStatus) {
    StreamingStatus[StreamingStatus["AVAILABLE"] = 0] = "AVAILABLE";
    StreamingStatus[StreamingStatus["IN_USE"] = 1] = "IN_USE";
    StreamingStatus[StreamingStatus["UNAVAILABLE"] = 2] = "UNAVAILABLE";
})(StreamingStatus || (StreamingStatus = {}));
// ----------
var SupportedVideoStreamConfigurationTypes;
(function (SupportedVideoStreamConfigurationTypes) {
    SupportedVideoStreamConfigurationTypes[SupportedVideoStreamConfigurationTypes["VIDEO_CODEC_CONFIGURATION"] = 1] = "VIDEO_CODEC_CONFIGURATION";
})(SupportedVideoStreamConfigurationTypes || (SupportedVideoStreamConfigurationTypes = {}));
var VideoCodecConfigurationTypes;
(function (VideoCodecConfigurationTypes) {
    VideoCodecConfigurationTypes[VideoCodecConfigurationTypes["CODEC_TYPE"] = 1] = "CODEC_TYPE";
    VideoCodecConfigurationTypes[VideoCodecConfigurationTypes["CODEC_PARAMETERS"] = 2] = "CODEC_PARAMETERS";
    VideoCodecConfigurationTypes[VideoCodecConfigurationTypes["ATTRIBUTES"] = 3] = "ATTRIBUTES";
})(VideoCodecConfigurationTypes || (VideoCodecConfigurationTypes = {}));
var VideoCodecParametersTypes;
(function (VideoCodecParametersTypes) {
    VideoCodecParametersTypes[VideoCodecParametersTypes["PROFILE_ID"] = 1] = "PROFILE_ID";
    VideoCodecParametersTypes[VideoCodecParametersTypes["LEVEL"] = 2] = "LEVEL";
    VideoCodecParametersTypes[VideoCodecParametersTypes["PACKETIZATION_MODE"] = 3] = "PACKETIZATION_MODE";
    VideoCodecParametersTypes[VideoCodecParametersTypes["CVO_ENABLED"] = 4] = "CVO_ENABLED";
    VideoCodecParametersTypes[VideoCodecParametersTypes["CVO_ID"] = 5] = "CVO_ID";
})(VideoCodecParametersTypes || (VideoCodecParametersTypes = {}));
var VideoAttributesTypes;
(function (VideoAttributesTypes) {
    VideoAttributesTypes[VideoAttributesTypes["IMAGE_WIDTH"] = 1] = "IMAGE_WIDTH";
    VideoAttributesTypes[VideoAttributesTypes["IMAGE_HEIGHT"] = 2] = "IMAGE_HEIGHT";
    VideoAttributesTypes[VideoAttributesTypes["FRAME_RATE"] = 3] = "FRAME_RATE";
})(VideoAttributesTypes || (VideoAttributesTypes = {}));
var VideoCodecType;
(function (VideoCodecType) {
    VideoCodecType[VideoCodecType["H264"] = 0] = "H264";
})(VideoCodecType || (VideoCodecType = {}));
var H264Profile;
(function (H264Profile) {
    H264Profile[H264Profile["BASELINE"] = 0] = "BASELINE";
    H264Profile[H264Profile["MAIN"] = 1] = "MAIN";
    H264Profile[H264Profile["HIGH"] = 2] = "HIGH";
})(H264Profile = exports.H264Profile || (exports.H264Profile = {}));
var H264Level;
(function (H264Level) {
    H264Level[H264Level["LEVEL3_1"] = 0] = "LEVEL3_1";
    H264Level[H264Level["LEVEL3_2"] = 1] = "LEVEL3_2";
    H264Level[H264Level["LEVEL4_0"] = 2] = "LEVEL4_0";
})(H264Level = exports.H264Level || (exports.H264Level = {}));
var VideoCodecPacketizationMode;
(function (VideoCodecPacketizationMode) {
    VideoCodecPacketizationMode[VideoCodecPacketizationMode["NON_INTERLEAVED"] = 0] = "NON_INTERLEAVED";
})(VideoCodecPacketizationMode || (VideoCodecPacketizationMode = {}));
var VideoCodecCVO;
(function (VideoCodecCVO) {
    VideoCodecCVO[VideoCodecCVO["UNSUPPORTED"] = 1] = "UNSUPPORTED";
    VideoCodecCVO[VideoCodecCVO["SUPPORTED"] = 2] = "SUPPORTED";
})(VideoCodecCVO || (VideoCodecCVO = {}));
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
})(AudioCodecTypes || (AudioCodecTypes = {}));
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
})(AudioBitrate || (AudioBitrate = {}));
var AudioSamplerate;
(function (AudioSamplerate) {
    AudioSamplerate[AudioSamplerate["KHZ_8"] = 0] = "KHZ_8";
    AudioSamplerate[AudioSamplerate["KHZ_16"] = 1] = "KHZ_16";
    AudioSamplerate[AudioSamplerate["KHZ_24"] = 2] = "KHZ_24";
    // 3, 4, 5 are theoretically defined, but no idea to what kHz value they correspond to
    // probably KHZ_32, KHZ_44_1, KHZ_48 (as supported by Secure Video recordings)
})(AudioSamplerate || (AudioSamplerate = {}));
// ----------
var SupportedRTPConfigurationTypes;
(function (SupportedRTPConfigurationTypes) {
    SupportedRTPConfigurationTypes[SupportedRTPConfigurationTypes["SRTP_CRYPTO_SUITE"] = 2] = "SRTP_CRYPTO_SUITE";
})(SupportedRTPConfigurationTypes || (SupportedRTPConfigurationTypes = {}));
var SRTPCryptoSuites;
(function (SRTPCryptoSuites) {
    SRTPCryptoSuites[SRTPCryptoSuites["AES_CM_128_HMAC_SHA1_80"] = 0] = "AES_CM_128_HMAC_SHA1_80";
    SRTPCryptoSuites[SRTPCryptoSuites["AES_CM_256_HMAC_SHA1_80"] = 1] = "AES_CM_256_HMAC_SHA1_80";
    SRTPCryptoSuites[SRTPCryptoSuites["NONE"] = 2] = "NONE";
})(SRTPCryptoSuites = exports.SRTPCryptoSuites || (exports.SRTPCryptoSuites = {}));
// ----------
var SetupEndpointsTypes;
(function (SetupEndpointsTypes) {
    SetupEndpointsTypes[SetupEndpointsTypes["SESSION_ID"] = 1] = "SESSION_ID";
    SetupEndpointsTypes[SetupEndpointsTypes["CONTROLLER_ADDRESS"] = 3] = "CONTROLLER_ADDRESS";
    SetupEndpointsTypes[SetupEndpointsTypes["VIDEO_SRTP_PARAMETERS"] = 4] = "VIDEO_SRTP_PARAMETERS";
    SetupEndpointsTypes[SetupEndpointsTypes["AUDIO_SRTP_PARAMETERS"] = 5] = "AUDIO_SRTP_PARAMETERS";
})(SetupEndpointsTypes || (SetupEndpointsTypes = {}));
var AddressTypes;
(function (AddressTypes) {
    AddressTypes[AddressTypes["ADDRESS_VERSION"] = 1] = "ADDRESS_VERSION";
    AddressTypes[AddressTypes["ADDRESS"] = 2] = "ADDRESS";
    AddressTypes[AddressTypes["VIDEO_RTP_PORT"] = 3] = "VIDEO_RTP_PORT";
    AddressTypes[AddressTypes["AUDIO_RTP_PORT"] = 4] = "AUDIO_RTP_PORT";
})(AddressTypes || (AddressTypes = {}));
var IPAddressVersion;
(function (IPAddressVersion) {
    IPAddressVersion[IPAddressVersion["IPV4"] = 0] = "IPV4";
    IPAddressVersion[IPAddressVersion["IPV6"] = 1] = "IPV6";
})(IPAddressVersion || (IPAddressVersion = {}));
var SRTPParametersTypes;
(function (SRTPParametersTypes) {
    SRTPParametersTypes[SRTPParametersTypes["SRTP_CRYPTO_SUITE"] = 1] = "SRTP_CRYPTO_SUITE";
    SRTPParametersTypes[SRTPParametersTypes["MASTER_KEY"] = 2] = "MASTER_KEY";
    SRTPParametersTypes[SRTPParametersTypes["MASTER_SALT"] = 3] = "MASTER_SALT"; // 14 bytes
})(SRTPParametersTypes || (SRTPParametersTypes = {}));
var SetupEndpointsResponseTypes;
(function (SetupEndpointsResponseTypes) {
    SetupEndpointsResponseTypes[SetupEndpointsResponseTypes["SESSION_ID"] = 1] = "SESSION_ID";
    SetupEndpointsResponseTypes[SetupEndpointsResponseTypes["STATUS"] = 2] = "STATUS";
    SetupEndpointsResponseTypes[SetupEndpointsResponseTypes["ACCESSORY_ADDRESS"] = 3] = "ACCESSORY_ADDRESS";
    SetupEndpointsResponseTypes[SetupEndpointsResponseTypes["VIDEO_SRTP_PARAMETERS"] = 4] = "VIDEO_SRTP_PARAMETERS";
    SetupEndpointsResponseTypes[SetupEndpointsResponseTypes["AUDIO_SRTP_PARAMETERS"] = 5] = "AUDIO_SRTP_PARAMETERS";
    SetupEndpointsResponseTypes[SetupEndpointsResponseTypes["VIDEO_SSRC"] = 6] = "VIDEO_SSRC";
    SetupEndpointsResponseTypes[SetupEndpointsResponseTypes["AUDIO_SSRC"] = 7] = "AUDIO_SSRC";
})(SetupEndpointsResponseTypes || (SetupEndpointsResponseTypes = {}));
var SetupEndpointsStatus;
(function (SetupEndpointsStatus) {
    SetupEndpointsStatus[SetupEndpointsStatus["SUCCESS"] = 0] = "SUCCESS";
    SetupEndpointsStatus[SetupEndpointsStatus["BUSY"] = 1] = "BUSY";
    SetupEndpointsStatus[SetupEndpointsStatus["ERROR"] = 2] = "ERROR";
})(SetupEndpointsStatus || (SetupEndpointsStatus = {}));
// ----------
var SelectedRTPStreamConfigurationTypes;
(function (SelectedRTPStreamConfigurationTypes) {
    SelectedRTPStreamConfigurationTypes[SelectedRTPStreamConfigurationTypes["SESSION_CONTROL"] = 1] = "SESSION_CONTROL";
    SelectedRTPStreamConfigurationTypes[SelectedRTPStreamConfigurationTypes["SELECTED_VIDEO_PARAMETERS"] = 2] = "SELECTED_VIDEO_PARAMETERS";
    SelectedRTPStreamConfigurationTypes[SelectedRTPStreamConfigurationTypes["SELECTED_AUDIO_PARAMETERS"] = 3] = "SELECTED_AUDIO_PARAMETERS";
})(SelectedRTPStreamConfigurationTypes || (SelectedRTPStreamConfigurationTypes = {}));
var SessionControlTypes;
(function (SessionControlTypes) {
    SessionControlTypes[SessionControlTypes["SESSION_IDENTIFIER"] = 1] = "SESSION_IDENTIFIER";
    SessionControlTypes[SessionControlTypes["COMMAND"] = 2] = "COMMAND";
})(SessionControlTypes || (SessionControlTypes = {}));
var SessionControlCommand;
(function (SessionControlCommand) {
    SessionControlCommand[SessionControlCommand["END_SESSION"] = 0] = "END_SESSION";
    SessionControlCommand[SessionControlCommand["START_SESSION"] = 1] = "START_SESSION";
    SessionControlCommand[SessionControlCommand["SUSPEND_SESSION"] = 2] = "SUSPEND_SESSION";
    SessionControlCommand[SessionControlCommand["RESUME_SESSION"] = 3] = "RESUME_SESSION";
    SessionControlCommand[SessionControlCommand["RECONFIGURE_SESSION"] = 4] = "RECONFIGURE_SESSION";
})(SessionControlCommand || (SessionControlCommand = {}));
var SelectedVideoParametersTypes;
(function (SelectedVideoParametersTypes) {
    SelectedVideoParametersTypes[SelectedVideoParametersTypes["CODEC_TYPE"] = 1] = "CODEC_TYPE";
    SelectedVideoParametersTypes[SelectedVideoParametersTypes["CODEC_PARAMETERS"] = 2] = "CODEC_PARAMETERS";
    SelectedVideoParametersTypes[SelectedVideoParametersTypes["ATTRIBUTES"] = 3] = "ATTRIBUTES";
    SelectedVideoParametersTypes[SelectedVideoParametersTypes["RTP_PARAMETERS"] = 4] = "RTP_PARAMETERS";
})(SelectedVideoParametersTypes || (SelectedVideoParametersTypes = {}));
var VideoRTPParametersTypes;
(function (VideoRTPParametersTypes) {
    VideoRTPParametersTypes[VideoRTPParametersTypes["PAYLOAD_TYPE"] = 1] = "PAYLOAD_TYPE";
    VideoRTPParametersTypes[VideoRTPParametersTypes["SYNCHRONIZATION_SOURCE"] = 2] = "SYNCHRONIZATION_SOURCE";
    VideoRTPParametersTypes[VideoRTPParametersTypes["MAX_BIT_RATE"] = 3] = "MAX_BIT_RATE";
    VideoRTPParametersTypes[VideoRTPParametersTypes["MIN_RTCP_INTERVAL"] = 4] = "MIN_RTCP_INTERVAL";
    VideoRTPParametersTypes[VideoRTPParametersTypes["MAX_MTU"] = 5] = "MAX_MTU";
})(VideoRTPParametersTypes || (VideoRTPParametersTypes = {}));
var SelectedAudioParametersTypes;
(function (SelectedAudioParametersTypes) {
    SelectedAudioParametersTypes[SelectedAudioParametersTypes["CODEC_TYPE"] = 1] = "CODEC_TYPE";
    SelectedAudioParametersTypes[SelectedAudioParametersTypes["CODEC_PARAMETERS"] = 2] = "CODEC_PARAMETERS";
    SelectedAudioParametersTypes[SelectedAudioParametersTypes["RTP_PARAMETERS"] = 3] = "RTP_PARAMETERS";
    SelectedAudioParametersTypes[SelectedAudioParametersTypes["COMFORT_NOISE"] = 4] = "COMFORT_NOISE";
})(SelectedAudioParametersTypes || (SelectedAudioParametersTypes = {}));
var AudioRTPParametersTypes;
(function (AudioRTPParametersTypes) {
    AudioRTPParametersTypes[AudioRTPParametersTypes["PAYLOAD_TYPE"] = 1] = "PAYLOAD_TYPE";
    AudioRTPParametersTypes[AudioRTPParametersTypes["SYNCHRONIZATION_SOURCE"] = 2] = "SYNCHRONIZATION_SOURCE";
    AudioRTPParametersTypes[AudioRTPParametersTypes["MAX_BIT_RATE"] = 3] = "MAX_BIT_RATE";
    AudioRTPParametersTypes[AudioRTPParametersTypes["MIN_RTCP_INTERVAL"] = 4] = "MIN_RTCP_INTERVAL";
    AudioRTPParametersTypes[AudioRTPParametersTypes["COMFORT_NOISE_PAYLOAD_TYPE"] = 6] = "COMFORT_NOISE_PAYLOAD_TYPE";
})(AudioRTPParametersTypes || (AudioRTPParametersTypes = {}));
function isLegacySRTPOptions(options) {
    return "srtp" in options;
}
var AudioStreamingCodecType;
(function (AudioStreamingCodecType) {
    AudioStreamingCodecType["PCMU"] = "PCMU";
    AudioStreamingCodecType["PCMA"] = "PCMA";
    AudioStreamingCodecType["AAC_ELD"] = "AAC-eld";
    AudioStreamingCodecType["OPUS"] = "OPUS";
    AudioStreamingCodecType["MSBC"] = "mSBC";
    AudioStreamingCodecType["AMR"] = "AMR";
    AudioStreamingCodecType["AMR_WB"] = "AMR-WB";
})(AudioStreamingCodecType = exports.AudioStreamingCodecType || (exports.AudioStreamingCodecType = {}));
var AudioStreamingSamplerate;
(function (AudioStreamingSamplerate) {
    AudioStreamingSamplerate[AudioStreamingSamplerate["KHZ_8"] = 8] = "KHZ_8";
    AudioStreamingSamplerate[AudioStreamingSamplerate["KHZ_16"] = 16] = "KHZ_16";
    AudioStreamingSamplerate[AudioStreamingSamplerate["KHZ_24"] = 24] = "KHZ_24";
})(AudioStreamingSamplerate = exports.AudioStreamingSamplerate || (exports.AudioStreamingSamplerate = {}));
var StreamRequestTypes;
(function (StreamRequestTypes) {
    StreamRequestTypes["RECONFIGURE"] = "reconfigure";
    StreamRequestTypes["START"] = "start";
    StreamRequestTypes["STOP"] = "stop";
})(StreamRequestTypes = exports.StreamRequestTypes || (exports.StreamRequestTypes = {}));
var RTPStreamManagement = /** @class */ (function () {
    function RTPStreamManagement(id, options, delegate, service) {
        this.videoOnly = false;
        this.sessionIdentifier = undefined;
        this.streamStatus = 0 /* AVAILABLE */; // use _updateStreamStatus to update this property
        this.selectedConfiguration = null; // base64 representation of the currently selected configuration
        this.delegate = delegate;
        this.requireProxy = options.proxy || false;
        this.disableAudioProxy = options.disable_audio_proxy || false;
        if (isLegacySRTPOptions(options)) {
            this.supportedCryptoSuites = [options.srtp ? 0 /* AES_CM_128_HMAC_SHA1_80 */ : 2 /* NONE */];
        }
        else {
            this.supportedCryptoSuites = options.supportedCryptoSuites;
        }
        if (this.supportedCryptoSuites.length === 0) {
            this.supportedCryptoSuites.push(2 /* NONE */);
        }
        if (!options.video) {
            throw new Error('Video parameters cannot be undefined in options');
        }
        this.supportedRTPConfiguration = this._supportedRTPConfiguration(this.supportedCryptoSuites);
        this.supportedVideoStreamConfiguration = this._supportedVideoStreamConfiguration(options.video);
        this.supportedAudioStreamConfiguration = this._supportedAudioStreamConfiguration(options.audio);
        this.setupEndpointsResponse = RTPStreamManagement.initialSetupEndpointsResponse();
        this.service = service || this.constructService(id);
        this.setupServiceHandlers();
    }
    RTPStreamManagement.prototype.forceStop = function () {
        this.handleSessionClosed();
    };
    RTPStreamManagement.prototype.getService = function () {
        return this.service;
    };
    // Private
    RTPStreamManagement.prototype.handleCloseConnection = function (connectionID) {
        if (this.connectionID && this.connectionID === connectionID) {
            this._handleStopStream();
        }
    };
    RTPStreamManagement.prototype.handleFactoryReset = function () {
        this.selectedConfiguration = null;
        this.setupEndpointsResponse = RTPStreamManagement.initialSetupEndpointsResponse();
        // on a factory reset the assumption is that all connections were already terminated and thus "handleStopStream" was already called
    };
    RTPStreamManagement.prototype.constructService = function (id) {
        var managementService = new Service_1.Service.CameraRTPStreamManagement('', id.toString());
        managementService.setCharacteristic(Characteristic_1.Characteristic.Active, true);
        managementService.setCharacteristic(Characteristic_1.Characteristic.SupportedRTPConfiguration, this.supportedRTPConfiguration);
        managementService.setCharacteristic(Characteristic_1.Characteristic.SupportedVideoStreamConfiguration, this.supportedVideoStreamConfiguration);
        managementService.setCharacteristic(Characteristic_1.Characteristic.SupportedAudioStreamConfiguration, this.supportedAudioStreamConfiguration);
        return managementService;
    };
    RTPStreamManagement.prototype.setupServiceHandlers = function () {
        var _this = this;
        this._updateStreamStatus(0 /* AVAILABLE */); // reset streaming status to available
        this.service.setCharacteristic(Characteristic_1.Characteristic.SetupEndpoints, this.setupEndpointsResponse); // reset SetupEndpoints to default
        this.service.getCharacteristic(Characteristic_1.Characteristic.SelectedRTPStreamConfiguration)
            .on("get" /* GET */, function (callback) {
            callback(null, _this.selectedConfiguration);
        })
            .on("set" /* SET */, this._handleSelectedStreamConfigurationWrite.bind(this));
        this.service.getCharacteristic(Characteristic_1.Characteristic.SetupEndpoints)
            .on("get" /* GET */, function (callback) {
            callback(null, _this.setupEndpointsResponse);
        })
            .on("set" /* SET */, function (value, callback, context, connectionID) {
            _this.handleSetupEndpoints(value, callback, connectionID);
        });
    };
    RTPStreamManagement.prototype.handleSessionClosed = function () {
        this.selectedConfiguration = tlv.encode(1 /* SESSION_CONTROL */, tlv.encode(2 /* COMMAND */, SessionControlCommand.SUSPEND_SESSION)).toString("base64");
        this.setupEndpointsResponse = tlv.encode(2 /* STATUS */, 2 /* ERROR */).toString("base64");
        this._updateStreamStatus(0 /* AVAILABLE */);
        this.sessionIdentifier = undefined;
        this.connectionID = undefined;
        this.ipVersion = undefined;
        if (this.videoProxy) {
            this.videoProxy.destroy();
            this.videoProxy = undefined;
        }
        if (this.audioProxy) {
            this.audioProxy.destroy();
            this.audioProxy = undefined;
        }
    };
    RTPStreamManagement.prototype._handleSelectedStreamConfigurationWrite = function (value, callback) {
        var _this = this;
        var data = Buffer.from(value, 'base64');
        var objects = tlv.decode(data);
        var sessionControl = tlv.decode(objects[1 /* SESSION_CONTROL */]);
        var sessionIdentifier = index_1.uuid.unparse(sessionControl[1 /* SESSION_IDENTIFIER */]);
        var requestType = sessionControl[2 /* COMMAND */][0];
        if (sessionIdentifier !== this.sessionIdentifier) {
            debug("Received unknown session Identifier with request to " + SessionControlCommand[requestType]);
            callback(new Error(-70410 /* INVALID_VALUE_IN_REQUEST */ + ""));
            return;
        }
        this.selectedConfiguration = value;
        // intercept the callback chain to check if an error occurred.
        var streamCallback = function (error, writeResponse) {
            callback(error, writeResponse); // does not support writeResponse, but how knows what comes in the future.
            if (error) {
                _this.handleSessionClosed();
            }
        };
        switch (requestType) {
            case SessionControlCommand.START_SESSION:
                var selectedVideoParameters = tlv.decode(objects[2 /* SELECTED_VIDEO_PARAMETERS */]);
                var selectedAudioParameters = tlv.decode(objects[3 /* SELECTED_AUDIO_PARAMETERS */]);
                this._handleStartStream(selectedVideoParameters, selectedAudioParameters, streamCallback);
                break;
            case SessionControlCommand.RECONFIGURE_SESSION:
                var reconfiguredVideoParameters = tlv.decode(objects[2 /* SELECTED_VIDEO_PARAMETERS */]);
                this.handleReconfigureStream(reconfiguredVideoParameters, streamCallback);
                break;
            case SessionControlCommand.END_SESSION:
                this._handleStopStream(streamCallback);
                break;
            case SessionControlCommand.RESUME_SESSION:
            case SessionControlCommand.SUSPEND_SESSION:
            default:
                debug("Unhandled request type " + SessionControlCommand[requestType]);
                callback(new Error(-70410 /* INVALID_VALUE_IN_REQUEST */ + ""));
                return;
        }
    };
    RTPStreamManagement.prototype._handleStartStream = function (videoConfiguration, audioConfiguration, callback) {
        // selected video configuration
        // noinspection JSUnusedLocalSymbols
        var videoCodec = videoConfiguration[1 /* CODEC_TYPE */]; // always 0x00 for h264
        var videoParametersTLV = videoConfiguration[2 /* CODEC_PARAMETERS */];
        var videoAttributesTLV = videoConfiguration[3 /* ATTRIBUTES */];
        var videoRTPParametersTLV = videoConfiguration[4 /* RTP_PARAMETERS */];
        // video parameters
        var videoParameters = tlv.decode(videoParametersTLV);
        var h264Profile = videoParameters[1 /* PROFILE_ID */][0];
        var h264Level = videoParameters[2 /* LEVEL */][0];
        var packetizationMode = videoParameters[3 /* PACKETIZATION_MODE */][0];
        var cvoEnabled = videoParameters[4 /* CVO_ENABLED */];
        var cvoId = undefined;
        if (cvoEnabled && cvoEnabled[0] === 2 /* SUPPORTED */) {
            cvoId = videoParameters[5 /* CVO_ID */].readUInt8(0);
        }
        // video attributes
        var videoAttributes = tlv.decode(videoAttributesTLV);
        var width = videoAttributes[1 /* IMAGE_WIDTH */].readUInt16LE(0);
        var height = videoAttributes[2 /* IMAGE_HEIGHT */].readUInt16LE(0);
        var frameRate = videoAttributes[3 /* FRAME_RATE */].readUInt8(0);
        // video rtp parameters
        var videoRTPParameters = tlv.decode(videoRTPParametersTLV);
        var videoPayloadType = videoRTPParameters[1 /* PAYLOAD_TYPE */].readUInt8(0); // 99
        var videoSSRC = videoRTPParameters[2 /* SYNCHRONIZATION_SOURCE */].readUInt32LE(0);
        var videoMaximumBitrate = videoRTPParameters[3 /* MAX_BIT_RATE */].readUInt16LE(0);
        var videoRTCPInterval = videoRTPParameters[4 /* MIN_RTCP_INTERVAL */].readFloatLE(0);
        var maxMTU = this.ipVersion === "ipv6" ? 1228 : 1378; // default values ipv4: 1378 bytes; ipv6: 1228 bytes
        if (videoRTPParameters[5 /* MAX_MTU */]) {
            maxMTU = videoRTPParameters[5 /* MAX_MTU */].readUInt16LE(0);
        }
        // selected audio configuration
        var audioCodec = audioConfiguration[1 /* CODEC_TYPE */][0];
        var audioParametersTLV = audioConfiguration[2 /* CODEC_PARAMETERS */];
        var audioRTPParametersTLV = audioConfiguration[3 /* RTP_PARAMETERS */];
        var comfortNoise = !!audioConfiguration[4 /* COMFORT_NOISE */].readUInt8(0);
        // audio parameters
        var audioParameters = tlv.decode(audioParametersTLV);
        var channels = audioParameters[1 /* CHANNEL */][0];
        var audioBitrate = audioParameters[2 /* BIT_RATE */][0];
        var samplerate = audioParameters[3 /* SAMPLE_RATE */][0];
        var rtpPacketTime = audioParameters[4 /* PACKET_TIME */].readUInt8(0);
        // audio rtp parameters
        var audioRTPParameters = tlv.decode(audioRTPParametersTLV);
        var audioPayloadType = audioRTPParameters[1 /* PAYLOAD_TYPE */].readUInt8(0); // 110
        var audioSSRC = audioRTPParameters[2 /* SYNCHRONIZATION_SOURCE */].readUInt32LE(0);
        var audioMaximumBitrate = audioRTPParameters[3 /* MAX_BIT_RATE */].readUInt16LE(0);
        var audioRTCPInterval = audioRTPParameters[4 /* MIN_RTCP_INTERVAL */].readFloatLE(0);
        var comfortNoisePayloadType = audioRTPParameters[6 /* COMFORT_NOISE_PAYLOAD_TYPE */].readUInt8(0); // 13
        if (this.requireProxy) {
            this.videoProxy.setOutgoingPayloadType(videoPayloadType);
            if (!this.disableAudioProxy) {
                this.audioProxy.setOutgoingPayloadType(audioPayloadType);
            }
        }
        var videoInfo = {
            profile: h264Profile,
            level: h264Level,
            packetizationMode: packetizationMode,
            cvoId: cvoId,
            width: width,
            height: height,
            fps: frameRate,
            pt: videoPayloadType,
            ssrc: videoSSRC,
            max_bit_rate: videoMaximumBitrate,
            rtcp_interval: videoRTCPInterval,
            mtu: maxMTU,
        };
        var audioCodecName;
        var samplerateNum;
        switch (audioCodec) {
            case 0 /* PCMU */:
                audioCodecName = "PCMU" /* PCMU */;
                break;
            case 1 /* PCMA */:
                audioCodecName = "PCMA" /* PCMA */;
                break;
            case 2 /* AAC_ELD */:
                audioCodecName = "AAC-eld" /* AAC_ELD */;
                break;
            case 3 /* OPUS */:
                audioCodecName = "OPUS" /* OPUS */;
                break;
            case 4 /* MSBC */:
                audioCodecName = "mSBC" /* MSBC */;
                break;
            case 5 /* AMR */:
                audioCodecName = "AMR" /* AMR */;
                break;
            case 6 /* AMR_WB */:
                audioCodecName = "AMR-WB" /* AMR_WB */;
                break;
            default:
                throw new Error("Encountered unknown selected audio codec " + audioCodec);
        }
        switch (samplerate) {
            case 0 /* KHZ_8 */:
                samplerateNum = 8;
                break;
            case 1 /* KHZ_16 */:
                samplerateNum = 16;
                break;
            case 2 /* KHZ_24 */:
                samplerateNum = 24;
                break;
            default:
                throw new Error("Encountered unknown selected audio samplerate " + samplerate);
        }
        var audioInfo = {
            codec: audioCodecName,
            channel: channels,
            bit_rate: audioBitrate,
            sample_rate: samplerateNum,
            packet_time: rtpPacketTime,
            pt: audioPayloadType,
            ssrc: audioSSRC,
            max_bit_rate: audioMaximumBitrate,
            rtcp_interval: audioRTCPInterval,
            comfort_pt: comfortNoisePayloadType,
            comfortNoiseEnabled: comfortNoise,
        };
        var request = {
            sessionID: this.sessionIdentifier,
            type: "start" /* START */,
            video: videoInfo,
            audio: audioInfo,
        };
        this.delegate.handleStreamRequest(request, function (error) { return callback(error); });
    };
    RTPStreamManagement.prototype.handleReconfigureStream = function (videoConfiguration, callback) {
        // selected video configuration
        var videoAttributesTLV = videoConfiguration[3 /* ATTRIBUTES */];
        var videoRTPParametersTLV = videoConfiguration[4 /* RTP_PARAMETERS */];
        // video attributes
        var videoAttributes = tlv.decode(videoAttributesTLV);
        var width = videoAttributes[1 /* IMAGE_WIDTH */].readUInt16LE(0);
        var height = videoAttributes[2 /* IMAGE_HEIGHT */].readUInt16LE(0);
        var frameRate = videoAttributes[3 /* FRAME_RATE */].readUInt8(0);
        // video rtp parameters
        var videoRTPParameters = tlv.decode(videoRTPParametersTLV);
        var videoMaximumBitrate = videoRTPParameters[3 /* MAX_BIT_RATE */].readUInt16LE(0);
        var videoRTCPInterval = videoRTPParameters[4 /* MIN_RTCP_INTERVAL */].readFloatLE(0) || 0.5; // seems to be always zero, use default of 0.5
        var reconfiguredVideoInfo = {
            width: width,
            height: height,
            fps: frameRate,
            max_bit_rate: videoMaximumBitrate,
            rtcp_interval: videoRTCPInterval,
        };
        var request = {
            sessionID: this.sessionIdentifier,
            type: "reconfigure" /* RECONFIGURE */,
            video: reconfiguredVideoInfo,
        };
        this.delegate.handleStreamRequest(request, function (error) { return callback(error); });
    };
    RTPStreamManagement.prototype._handleStopStream = function (callback) {
        var request = {
            sessionID: this.sessionIdentifier,
            type: "stop" /* STOP */,
        };
        this.handleSessionClosed();
        this.delegate.handleStreamRequest(request, function (error) { return callback ? callback(error) : undefined; });
    };
    RTPStreamManagement.prototype.handleSetupEndpoints = function (value, callback, connectionID) {
        var _this = this;
        var data = Buffer.from(value, 'base64');
        var objects = tlv.decode(data);
        var sessionIdentifier = index_1.uuid.unparse(objects[1 /* SESSION_ID */]);
        if (this.streamStatus !== 0 /* AVAILABLE */) {
            this.setupEndpointsResponse = tlv.encode(1 /* SESSION_ID */, index_1.uuid.write(sessionIdentifier), 2 /* STATUS */, 1 /* BUSY */).toString("base64");
            callback();
            return;
        }
        this.connectionID = connectionID;
        this.sessionIdentifier = sessionIdentifier;
        this._updateStreamStatus(1 /* IN_USE */);
        var session = eventedhttp_1.Session.getSession(connectionID);
        // Address
        var targetAddressPayload = objects[3 /* CONTROLLER_ADDRESS */];
        var processedAddressInfo = tlv.decode(targetAddressPayload);
        var addressVersion = processedAddressInfo[1 /* ADDRESS_VERSION */][0];
        var controllerAddress = processedAddressInfo[2 /* ADDRESS */].toString('utf8');
        var targetVideoPort = processedAddressInfo[3 /* VIDEO_RTP_PORT */].readUInt16LE(0);
        var targetAudioPort = processedAddressInfo[4 /* AUDIO_RTP_PORT */].readUInt16LE(0);
        // Video SRTP Params
        var videoSRTPPayload = objects[4 /* VIDEO_SRTP_PARAMETERS */];
        var processedVideoInfo = tlv.decode(videoSRTPPayload);
        var videoCryptoSuite = processedVideoInfo[1 /* SRTP_CRYPTO_SUITE */][0];
        var videoMasterKey = processedVideoInfo[2 /* MASTER_KEY */];
        var videoMasterSalt = processedVideoInfo[3 /* MASTER_SALT */];
        // Audio SRTP Params
        var audioSRTPPayload = objects[5 /* AUDIO_SRTP_PARAMETERS */];
        var processedAudioInfo = tlv.decode(audioSRTPPayload);
        var audioCryptoSuite = processedAudioInfo[1 /* SRTP_CRYPTO_SUITE */][0];
        var audioMasterKey = processedAudioInfo[2 /* MASTER_KEY */];
        var audioMasterSalt = processedAudioInfo[3 /* MASTER_SALT */];
        debug('Session: ', sessionIdentifier, '\nControllerAddress: ', controllerAddress, '\nVideoPort: ', targetVideoPort, '\nAudioPort: ', targetAudioPort, '\nVideo Crypto: ', videoCryptoSuite, '\nVideo Master Key: ', videoMasterKey, '\nVideo Master Salt: ', videoMasterSalt, '\nAudio Crypto: ', audioCryptoSuite, '\nAudio Master Key: ', audioMasterKey, '\nAudio Master Salt: ', audioMasterSalt);
        var prepareRequest = {
            sessionID: sessionIdentifier,
            targetAddress: controllerAddress,
            addressVersion: addressVersion === 1 /* IPV6 */ ? "ipv6" : "ipv4",
            video: {
                port: targetVideoPort,
                srtpCryptoSuite: videoCryptoSuite,
                srtp_key: videoMasterKey,
                srtp_salt: videoMasterSalt,
            },
            audio: {
                port: targetAudioPort,
                srtpCryptoSuite: audioCryptoSuite,
                srtp_key: audioMasterKey,
                srtp_salt: audioMasterSalt,
            },
        };
        var promises = [];
        if (this.requireProxy) {
            prepareRequest.targetAddress = session.getLocalAddress(addressVersion === 1 /* IPV6 */ ? "ipv6" : "ipv4"); // ip versions must be the same
            this.videoProxy = new RTPProxy_1.default({
                outgoingAddress: controllerAddress,
                outgoingPort: targetVideoPort,
                outgoingSSRC: crypto_1.default.randomBytes(4).readUInt32LE(0),
                disabled: false
            });
            promises.push(this.videoProxy.setup().then(function () {
                prepareRequest.video.proxy_rtp = _this.videoProxy.incomingRTPPort();
                prepareRequest.video.proxy_rtcp = _this.videoProxy.incomingRTCPPort();
            }));
            if (!this.disableAudioProxy) {
                this.audioProxy = new RTPProxy_1.default({
                    outgoingAddress: controllerAddress,
                    outgoingPort: targetAudioPort,
                    outgoingSSRC: crypto_1.default.randomBytes(4).readUInt32LE(0),
                    disabled: this.videoOnly
                });
                promises.push(this.audioProxy.setup().then(function () {
                    prepareRequest.audio.proxy_rtp = _this.audioProxy.incomingRTPPort();
                    prepareRequest.audio.proxy_rtcp = _this.audioProxy.incomingRTCPPort();
                }));
            }
        }
        Promise.all(promises).then(function () {
            _this.delegate.prepareStream(prepareRequest, index_1.once(function (error, response) {
                if (error || !response) {
                    debug("PrepareStream request encountered an error: " + (error ? error.message : undefined));
                    _this.setupEndpointsResponse = tlv.encode(1 /* SESSION_ID */, index_1.uuid.write(sessionIdentifier), 2 /* STATUS */, 2 /* ERROR */).toString("base64");
                    _this.handleSessionClosed();
                    callback(error);
                }
                else {
                    _this.generateSetupEndpointResponse(session, sessionIdentifier, prepareRequest, response, callback);
                }
            }));
        });
    };
    RTPStreamManagement.prototype.generateSetupEndpointResponse = function (session, identifier, request, response, callback) {
        var address;
        var addressVersion = request.addressVersion;
        var videoPort;
        var audioPort;
        var videoCryptoSuite;
        var videoSRTPKey;
        var videoSRTPSalt;
        var audioCryptoSuite;
        var audioSRTPKey;
        var audioSRTPSalt;
        var videoSSRC;
        var audioSSRC;
        if (!this.videoOnly && !response.audio) {
            throw new Error("Audio was enabled but not supplied in PrepareStreamResponse!");
        }
        // Provide default values if audio was not supplied
        var audio = response.audio || {
            port: request.audio.port,
            ssrc: controller_1.CameraController.generateSynchronisationSource(),
            srtp_key: request.audio.srtp_key,
            srtp_salt: request.audio.srtp_salt,
        };
        if (!this.requireProxy) {
            var videoInfo = response.video;
            var audioInfo = audio;
            if (response.addressOverride) {
                addressVersion = net_1.default.isIPv4(response.addressOverride) ? "ipv4" : "ipv6";
                address = response.addressOverride;
            }
            else {
                address = session.getLocalAddress(addressVersion);
            }
            if (request.addressVersion !== addressVersion) {
                throw new Error("Incoming and outgoing ip address versions must match! Expected " + request.addressVersion + " but got " + addressVersion);
            }
            videoPort = videoInfo.port;
            audioPort = audioInfo.port;
            if (request.video.srtpCryptoSuite !== 2 /* NONE */
                && (videoInfo.srtp_key === undefined || videoInfo.srtp_salt === undefined)) {
                throw new Error("SRTP was selected for the prepared video stream, but no 'srtp_key' or 'srtp_salt' was specified!");
            }
            if (request.audio.srtpCryptoSuite !== 2 /* NONE */
                && (audioInfo.srtp_key === undefined || audioInfo.srtp_salt === undefined)) {
                throw new Error("SRTP was selected for the prepared audio stream, but no 'srtp_key' or 'srtp_salt' was specified!");
            }
            videoCryptoSuite = request.video.srtpCryptoSuite;
            videoSRTPKey = videoInfo.srtp_key || Buffer.alloc(0); // key and salt are zero-length for cryptoSuite = NONE
            videoSRTPSalt = videoInfo.srtp_salt || Buffer.alloc(0);
            audioCryptoSuite = request.audio.srtpCryptoSuite;
            audioSRTPKey = audioInfo.srtp_key || Buffer.alloc(0); // key and salt are zero-length for cryptoSuite = NONE
            audioSRTPSalt = audioInfo.srtp_salt || Buffer.alloc(0);
            videoSSRC = videoInfo.ssrc;
            audioSSRC = audioInfo.ssrc;
        }
        else {
            var videoInfo = response.video;
            address = session.getLocalAddress(request.addressVersion);
            videoCryptoSuite = 2 /* NONE */;
            videoSRTPKey = Buffer.alloc(0);
            videoSRTPSalt = Buffer.alloc(0);
            audioCryptoSuite = 2 /* NONE */;
            audioSRTPKey = Buffer.alloc(0);
            audioSRTPSalt = Buffer.alloc(0);
            this.videoProxy.setIncomingPayloadType(videoInfo.proxy_pt);
            this.videoProxy.setServerAddress(videoInfo.proxy_server_address);
            this.videoProxy.setServerRTPPort(videoInfo.proxy_server_rtp);
            this.videoProxy.setServerRTCPPort(videoInfo.proxy_server_rtcp);
            videoPort = this.videoProxy.outgoingLocalPort();
            videoSSRC = this.videoProxy.outgoingSSRC;
            if (!this.disableAudioProxy) {
                var audioInfo = response.audio;
                this.audioProxy.setIncomingPayloadType(audioInfo.proxy_pt);
                this.audioProxy.setServerAddress(audioInfo.proxy_server_address);
                this.audioProxy.setServerRTPPort(audioInfo.proxy_server_rtp);
                this.audioProxy.setServerRTCPPort(audioInfo.proxy_server_rtcp);
                audioPort = this.audioProxy.outgoingLocalPort();
                audioSSRC = this.audioProxy.outgoingSSRC;
            }
            else {
                var audioInfo = response.audio;
                audioPort = audioInfo.port;
                audioSSRC = audioInfo.ssrc;
            }
        }
        this.ipVersion = addressVersion; // we need to save this in order to calculate some default mtu values later
        var accessoryAddress = tlv.encode(1 /* ADDRESS_VERSION */, addressVersion === "ipv4" ? 0 /* IPV4 */ : 1 /* IPV6 */, 2 /* ADDRESS */, address, 3 /* VIDEO_RTP_PORT */, tlv.writeUInt16(videoPort), 4 /* AUDIO_RTP_PORT */, tlv.writeUInt16(audioPort));
        var videoSRTPParameters = tlv.encode(1 /* SRTP_CRYPTO_SUITE */, videoCryptoSuite, 2 /* MASTER_KEY */, videoSRTPKey, 3 /* MASTER_SALT */, videoSRTPSalt);
        var audioSRTPParameters = tlv.encode(1 /* SRTP_CRYPTO_SUITE */, audioCryptoSuite, 2 /* MASTER_KEY */, audioSRTPKey, 3 /* MASTER_SALT */, audioSRTPSalt);
        this.setupEndpointsResponse = tlv.encode(1 /* SESSION_ID */, index_1.uuid.write(identifier), 2 /* STATUS */, 0 /* SUCCESS */, 3 /* ACCESSORY_ADDRESS */, accessoryAddress, 4 /* VIDEO_SRTP_PARAMETERS */, videoSRTPParameters, 5 /* AUDIO_SRTP_PARAMETERS */, audioSRTPParameters, 6 /* VIDEO_SSRC */, tlv.writeUInt32(videoSSRC), 7 /* AUDIO_SSRC */, tlv.writeUInt32(audioSSRC)).toString("base64");
        callback();
    };
    RTPStreamManagement.prototype._updateStreamStatus = function (status) {
        this.streamStatus = status;
        this.service.updateCharacteristic(Characteristic_1.Characteristic.StreamingStatus, tlv.encode(1 /* STATUS */, this.streamStatus).toString('base64'));
    };
    RTPStreamManagement.prototype._supportedRTPConfiguration = function (supportedCryptoSuites) {
        if (supportedCryptoSuites.length === 1 && supportedCryptoSuites[0] === 2 /* NONE */) {
            debug("Client claims it doesn't support SRTP. The stream may stops working with future iOS releases.");
        }
        var buffers = [];
        supportedCryptoSuites.forEach(function (suite) {
            if (buffers.length > 0) {
                buffers.push(tlv.encode(tlv.EMPTY_TLV_TYPE, Buffer.alloc(0)));
            }
            buffers.push(tlv.encode(2 /* SRTP_CRYPTO_SUITE */, suite));
        });
        return Buffer.concat(buffers).toString("base64");
    };
    RTPStreamManagement.prototype._supportedVideoStreamConfiguration = function (videoOptions) {
        if (!videoOptions.codec) {
            throw new Error('Video codec cannot be undefined');
        }
        if (!videoOptions.resolutions) {
            throw new Error('Video resolutions cannot be undefined');
        }
        var videoParametersBuffers = [];
        videoOptions.codec.profiles.forEach(function (profile) {
            if (videoParametersBuffers.length > 0) {
                videoParametersBuffers.push(tlv.encode(tlv.EMPTY_TLV_TYPE, Buffer.alloc(0)));
            }
            videoParametersBuffers.push(tlv.encode(1 /* PROFILE_ID */, profile));
        });
        var levelsOffset = videoParametersBuffers.length;
        videoOptions.codec.levels.forEach(function (level) {
            if (videoParametersBuffers.length > levelsOffset) {
                videoParametersBuffers.push(tlv.encode(tlv.EMPTY_TLV_TYPE, Buffer.alloc(0)));
            }
            videoParametersBuffers.push(tlv.encode(2 /* LEVEL */, level));
        });
        videoParametersBuffers.push(tlv.encode(3 /* PACKETIZATION_MODE */, 0 /* NON_INTERLEAVED */));
        if (videoOptions.cvoId) {
            videoParametersBuffers.push(tlv.encode(4 /* CVO_ENABLED */, 2 /* SUPPORTED */, 5 /* CVO_ID */, videoOptions.cvoId));
        }
        var videoAttributesBuffers = [];
        videoOptions.resolutions.forEach(function (resolution) {
            if (resolution.length != 3) {
                throw new Error('Unexpected video resolution');
            }
            var width = Buffer.alloc(2);
            var height = Buffer.alloc(2);
            var frameRate = Buffer.alloc(1);
            width.writeUInt16LE(resolution[0], 0);
            height.writeUInt16LE(resolution[1], 0);
            frameRate.writeUInt8(resolution[2], 0);
            if (videoAttributesBuffers.length > 0) {
                videoAttributesBuffers.push(tlv.encode(tlv.EMPTY_TLV_TYPE, Buffer.alloc(0)));
            }
            videoAttributesBuffers.push(tlv.encode(3 /* ATTRIBUTES */, tlv.encode(1 /* IMAGE_WIDTH */, width, 2 /* IMAGE_HEIGHT */, height, 3 /* FRAME_RATE */, frameRate)));
        });
        var videoStreamConfiguration = tlv.encode(1 /* CODEC_TYPE */, 0 /* H264 */, 2 /* CODEC_PARAMETERS */, Buffer.concat(videoParametersBuffers));
        var videoAttributes = Buffer.concat(videoAttributesBuffers);
        return tlv.encode(1 /* VIDEO_CODEC_CONFIGURATION */, Buffer.concat([videoStreamConfiguration, videoAttributes])).toString('base64');
    };
    RTPStreamManagement.prototype.checkForLegacyAudioCodecRepresentation = function (codecs) {
        var codecMap = {};
        codecs.slice().forEach(function (codec) {
            var previous = codecMap[codec.type];
            if (previous) {
                if (typeof previous.samplerate === "number") {
                    previous.samplerate = [previous.samplerate];
                }
                previous.samplerate = previous.samplerate.concat(codec.samplerate);
                var index = codecs.indexOf(codec);
                if (index >= 0) {
                    codecs.splice(index, 1);
                }
            }
            else {
                codecMap[codec.type] = codec;
            }
        });
    };
    RTPStreamManagement.prototype._supportedAudioStreamConfiguration = function (audioOptions) {
        // Only AAC-ELD and OPUS are accepted by iOS currently, and we need to give it something it will accept
        // for it to start the video stream.
        var comfortNoise = audioOptions && !!audioOptions.comfort_noise;
        var supportedCodecs = (audioOptions && audioOptions.codecs) || [];
        this.checkForLegacyAudioCodecRepresentation(supportedCodecs);
        var codecConfigurationsBuffers = [];
        if (supportedCodecs.length === 0) { // Fake a Codec if we haven't got anything
            debug("Client doesn't support any audio codec that HomeKit supports.");
            this.videoOnly = true;
            supportedCodecs.push({
                type: "OPUS" /* OPUS */,
                samplerate: [16 /* KHZ_16 */, 24 /* KHZ_24 */],
            });
        }
        supportedCodecs.forEach(function (codec) {
            var type;
            switch (codec.type) {
                case "OPUS" /* OPUS */:
                    type = 3 /* OPUS */;
                    break;
                case "AAC-eld" /* AAC_ELD */:
                    type = 2 /* AAC_ELD */;
                    break;
                case "PCMA" /* PCMA */:
                    type = 1 /* PCMA */;
                    break;
                case "PCMU" /* PCMU */:
                    type = 0 /* PCMU */;
                    break;
                case "mSBC" /* MSBC */:
                    type = 4 /* MSBC */;
                    break;
                case "AMR" /* AMR */:
                    type = 5 /* AMR */;
                    break;
                case "AMR-WB" /* AMR_WB */:
                    type = 6 /* AMR_WB */;
                    break;
                default:
                    debug("Unsupported codec: ", codec.type);
                    return;
            }
            var providedSamplerates = typeof codec.samplerate === "number" ? [codec.samplerate] : codec.samplerate;
            var samplerateBuffers = [];
            providedSamplerates.forEach(function (rate) {
                var samplerate;
                switch (rate) {
                    case 8 /* KHZ_8 */:
                        samplerate = 0 /* KHZ_8 */;
                        break;
                    case 16 /* KHZ_16 */:
                        samplerate = 1 /* KHZ_16 */;
                        break;
                    case 24 /* KHZ_24 */:
                        samplerate = 2 /* KHZ_24 */;
                        break;
                    default:
                        debug("Unsupported sample rate: ", codec.samplerate);
                        return;
                }
                if (samplerateBuffers.length > 0) {
                    samplerateBuffers.push(tlv.encode(tlv.EMPTY_TLV_TYPE, Buffer.alloc(0)));
                }
                samplerateBuffers.push(tlv.encode(3 /* SAMPLE_RATE */, samplerate));
            });
            if (samplerateBuffers.length === 0) {
                throw new Error("Audio samplerate cannot be empty!");
            }
            var audioParameters = Buffer.concat([
                tlv.encode(1 /* CHANNEL */, Math.max(1, codec.audioChannels || 1), 2 /* BIT_RATE */, codec.bitrate || 0 /* VARIABLE */),
                Buffer.concat(samplerateBuffers),
            ]);
            var audioConfiguration = tlv.encode(1 /* CODEC_TYPE */, type, 2 /* CODEC_PARAMETERS */, audioParameters);
            if (codecConfigurationsBuffers.length > 0) {
                codecConfigurationsBuffers.push(tlv.encode(tlv.EMPTY_TLV_TYPE, Buffer.alloc(0)));
            }
            codecConfigurationsBuffers.push(tlv.encode(1 /* AUDIO_CODEC_CONFIGURATION */, audioConfiguration));
        });
        codecConfigurationsBuffers.push(tlv.encode(2 /* COMFORT_NOISE_SUPPORT */, comfortNoise ? 1 : 0));
        return Buffer.concat(codecConfigurationsBuffers).toString("base64");
    };
    RTPStreamManagement.initialSetupEndpointsResponse = function () {
        return tlv.encode(2 /* STATUS */, 2 /* ERROR */).toString("base64");
    };
    /**
     * @deprecated Please use the SRTPCryptoSuites const enum above. Scheduled to be removed in 2021-06.
     */
    // @ts-ignore
    RTPStreamManagement.SRTPCryptoSuites = SRTPCryptoSuites;
    /**
     * @deprecated Please use the H264Profile const enum above. Scheduled to be removed in 2021-06.
     */
    // @ts-ignore
    RTPStreamManagement.VideoCodecParamProfileIDTypes = H264Profile;
    /**
     * @deprecated won't be updated anymore. Please use the H264Level const enum above. Scheduled to be removed in 2021-06.
     */
    // @ts-ignore
    RTPStreamManagement.VideoCodecParamLevelTypes = Object.freeze({ TYPE3_1: 0, TYPE3_2: 1, TYPE4_0: 2 });
    return RTPStreamManagement;
}());
exports.RTPStreamManagement = RTPStreamManagement;
/**
 * @deprecated - only there for backwards compatibility, please use {@see RTPStreamManagement} directly
 */
var StreamController = /** @class */ (function (_super) {
    __extends(StreamController, _super);
    // noinspection JSDeprecatedSymbols
    function StreamController(id, options, delegate, service) {
        var _this = _super.call(this, id, options, new index_1.LegacyCameraSourceAdapter(delegate), service) || this;
        _this.options = options;
        return _this;
    }
    return StreamController;
}(RTPStreamManagement));
exports.StreamController = StreamController;
//# sourceMappingURL=RTPStreamManagement.js.map