"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GStreamerAudioProducer = void 0;
var assert_1 = __importDefault(require("assert"));
var debug_1 = __importDefault(require("debug"));
var child_process_1 = require("child_process");
var __1 = require("..");
var debug = debug_1.default("HAP-NodeJS:Remote:GStreamer");
var AudioType;
(function (AudioType) {
    AudioType[AudioType["GENERIC"] = 2049] = "GENERIC";
    AudioType[AudioType["VOICE"] = 2048] = "VOICE";
})(AudioType || (AudioType = {}));
var Bandwidth;
(function (Bandwidth) {
    Bandwidth[Bandwidth["NARROW_BAND"] = 1101] = "NARROW_BAND";
    Bandwidth[Bandwidth["MEDIUM_BAND"] = 1102] = "MEDIUM_BAND";
    Bandwidth[Bandwidth["WIDE_BAND"] = 1103] = "WIDE_BAND";
    Bandwidth[Bandwidth["SUPER_WIDE_BAND"] = 1104] = "SUPER_WIDE_BAND";
    Bandwidth[Bandwidth["FULL_BAND"] = 1105] = "FULL_BAND";
    Bandwidth[Bandwidth["AUTO"] = -1000] = "AUTO";
})(Bandwidth || (Bandwidth = {}));
var BitrateType;
(function (BitrateType) {
    BitrateType[BitrateType["CONSTANT"] = 0] = "CONSTANT";
    BitrateType[BitrateType["VARIABLE"] = 1] = "VARIABLE";
})(BitrateType || (BitrateType = {}));
/**
 * SiriAudioStreamProducer utilizing gstreamer and alsa audio devices to create opus audio frames.
 *
 * This producer is mainly tested on a RaspberryPi, but should also work on other linux based devices using alsa.
 *
 * This producer requires some packages to be installed. It is adviced to install the following (for example via apt-get):
 * gstreamer1.0-plugins-base, gstreamer1.0-x, gstreamer1.0-tools, libgstreamer1.0-dev, gstreamer1.0-doc,
 * gstreamer1.0-plugins-good, gstreamer1.0-plugins- ugly, gstreamer1.0-plugins-bad, gstreamer1.0-alsa
 *
 */
var GStreamerAudioProducer = /** @class */ (function () {
    function GStreamerAudioProducer(frameHandler, errorHandler, options) {
        this.options = {
            alsaSrc: "plughw:1"
        };
        this.running = false;
        this.frameHandler = frameHandler;
        this.errorHandler = errorHandler;
        for (var key in options) {
            // @ts-ignore
            GStreamerAudioProducer.options[key] = options[key];
        }
    }
    GStreamerAudioProducer.prototype.startAudioProduction = function (selectedAudioConfiguration) {
        var _this = this;
        if (this.running) {
            throw new Error("Gstreamer already running");
        }
        var codecParameters = selectedAudioConfiguration.parameters;
        assert_1.default(selectedAudioConfiguration.codecType === 3 /* OPUS */);
        var bitrateType = 1 /* VARIABLE */;
        switch (codecParameters.bitrate) {
            case 1 /* CONSTANT */:
                bitrateType = 0 /* CONSTANT */;
                break;
            case 0 /* VARIABLE */:
                bitrateType = 1 /* VARIABLE */;
                break;
        }
        var bandwidth = 1104 /* SUPER_WIDE_BAND */;
        switch (codecParameters.samplerate) {
            case 0 /* KHZ_8 */:
                bandwidth = 1101 /* NARROW_BAND */;
                break;
            case 1 /* KHZ_16 */:
                bandwidth = 1103 /* WIDE_BAND */;
                break;
            case 2 /* KHZ_24 */:
                bandwidth = 1104 /* SUPER_WIDE_BAND */;
                break;
        }
        var packetTime = codecParameters.rtpTime;
        debug("Launching gstreamer...");
        this.running = true;
        var args = "-q " +
            "alsasrc device=" + this.options.alsaSrc + " ! " +
            "capsfilter caps=audio/x-raw,format=S16LE,rate=24000 ! " +
            // "level post-messages=true interval=" + packetTime + "000000 ! " + // used to capture rms
            "opusenc " +
            "bitrate-type=" + bitrateType + " " +
            "bitrate=24000 " +
            "audio-type=" + 2048 /* VOICE */ + " " +
            "bandwidth=" + bandwidth + " " +
            "frame-size=" + packetTime + " ! " +
            "fdsink fd=1";
        this.process = child_process_1.spawn("gst-launch-1.0", args.split(" "), { env: process.env });
        this.process.on("error", function (error) {
            if (_this.running) {
                debug("Failed to spawn gstreamer process: " + error.message);
                _this.errorHandler(__1.DataSendCloseReason.CANCELLED);
            }
            else {
                debug("Failed to kill gstreamer process: " + error.message);
            }
        });
        this.process.stdout.on("data", function (data) {
            if (!_this.running) { // received data after it was closed
                return;
            }
            /*
                This listener seems to get called with only one opus frame most of the time.
                Though it happens regularly that another or many more frames get appended.
                This causes some problems as opus frames don't contain their data length in the "header".
                Opus relies on the container format to specify the length of the frame.
                Although sometimes multiple opus frames are squashed together the decoder seems to be able
                to handle that as it just creates a not very noticeable distortion.
                If we would want to make this perfect we would need to write a nodejs c++ submodule or something
                to interface directly with gstreamer api.
             */
            _this.frameHandler({
                data: data,
                rms: 0.25 // only way currently to extract rms from gstreamer is by interfacing with the api directly (nodejs c++ submodule could be a solution)
            });
        });
        this.process.stderr.on("data", function (data) {
            debug("GStreamer process reports the following error: " + String(data));
        });
        this.process.on("exit", function (code, signal) {
            if (signal !== "SIGTERM") { // if we receive SIGTERM, process exited gracefully (we stopped it)
                debug("GStreamer process unexpectedly exited with code %d (signal: %s)", code, signal);
                _this.errorHandler(__1.DataSendCloseReason.UNEXPECTED_FAILURE);
            }
        });
    };
    GStreamerAudioProducer.prototype.stopAudioProduction = function () {
        if (this.running) {
            this.process.kill("SIGTERM");
            this.running = false;
        }
        this.process = undefined;
    };
    return GStreamerAudioProducer;
}());
exports.GStreamerAudioProducer = GStreamerAudioProducer;
//# sourceMappingURL=gstreamer-audioProducer.js.map