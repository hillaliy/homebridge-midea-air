"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var __1 = require("..");
var child_process_1 = require("child_process");
var cameraUUID = __1.uuid.generate('hap-nodejs:accessories:ip-camera');
var camera = exports.accessory = new __1.Accessory('IPCamera', cameraUUID);
// @ts-ignore
camera.username = "9F:B2:46:0C:40:DB";
// @ts-ignore
camera.pincode = "948-23-459";
camera.category = 17 /* IP_CAMERA */;
var FFMPEGH264ProfileNames = [
    "baseline",
    "main",
    "high"
];
var FFMPEGH264LevelNames = [
    "3.1",
    "3.2",
    "4.0"
];
var ports = new Set();
function getPort() {
    for (var i = 5011;; i++) {
        if (!ports.has(i)) {
            ports.add(i);
            return i;
        }
    }
}
var ExampleCamera = /** @class */ (function () {
    function ExampleCamera() {
        this.ffmpegDebugOutput = false;
        // keep track of sessions
        this.pendingSessions = {};
        this.ongoingSessions = {};
    }
    ExampleCamera.prototype.handleSnapshotRequest = function (request, callback) {
        var _this = this;
        var ffmpegCommand = "-f lavfi -i testsrc=s=" + request.width + "x" + request.height + " -vframes 1 -f mjpeg -";
        var ffmpeg = child_process_1.spawn("ffmpeg", ffmpegCommand.split(" "), { env: process.env });
        var snapshotBuffers = [];
        ffmpeg.stdout.on('data', function (data) { return snapshotBuffers.push(data); });
        ffmpeg.stderr.on('data', function (data) {
            if (_this.ffmpegDebugOutput) {
                console.log("SNAPSHOT: " + String(data));
            }
        });
        ffmpeg.on('exit', function (code, signal) {
            if (signal) {
                console.log("Snapshot process was killed with signal: " + signal);
                callback(new Error("killed with signal " + signal));
            }
            else if (code === 0) {
                console.log("Successfully captured snapshot at " + request.width + "x" + request.height);
                callback(undefined, Buffer.concat(snapshotBuffers));
            }
            else {
                console.log("Snapshot process exited with code " + code);
                callback(new Error("Snapshot process exited with code " + code));
            }
        });
    };
    // called when iOS request rtp setup
    ExampleCamera.prototype.prepareStream = function (request, callback) {
        var sessionId = request.sessionID;
        var targetAddress = request.targetAddress;
        var video = request.video;
        var videoCryptoSuite = video.srtpCryptoSuite; // could be used to support multiple crypto suite (or support no suite for debugging)
        var videoSrtpKey = video.srtp_key;
        var videoSrtpSalt = video.srtp_salt;
        var videoSSRC = __1.CameraController.generateSynchronisationSource();
        var localPort = getPort();
        var sessionInfo = {
            address: targetAddress,
            videoPort: video.port,
            localVideoPort: localPort,
            videoCryptoSuite: videoCryptoSuite,
            videoSRTP: Buffer.concat([videoSrtpKey, videoSrtpSalt]),
            videoSSRC: videoSSRC,
        };
        var response = {
            video: {
                port: localPort,
                ssrc: videoSSRC,
                srtp_key: videoSrtpKey,
                srtp_salt: videoSrtpSalt,
            },
        };
        this.pendingSessions[sessionId] = sessionInfo;
        callback(undefined, response);
    };
    // called when iOS device asks stream to start/stop/reconfigure
    ExampleCamera.prototype.handleStreamRequest = function (request, callback) {
        var _this = this;
        var sessionId = request.sessionID;
        switch (request.type) {
            case "start" /* START */: {
                var sessionInfo = this.pendingSessions[sessionId];
                var video = request.video;
                var profile = FFMPEGH264ProfileNames[video.profile];
                var level = FFMPEGH264LevelNames[video.level];
                var width = video.width;
                var height = video.height;
                var fps = video.fps;
                var payloadType = video.pt;
                var maxBitrate = video.max_bit_rate;
                var rtcpInterval = video.rtcp_interval; // usually 0.5
                var mtu = video.mtu; // maximum transmission unit
                var address = sessionInfo.address;
                var videoPort = sessionInfo.videoPort;
                var localVideoPort = sessionInfo.localVideoPort;
                var ssrc = sessionInfo.videoSSRC;
                var cryptoSuite = sessionInfo.videoCryptoSuite;
                var videoSRTP = sessionInfo.videoSRTP.toString("base64");
                console.log("Starting video stream (" + width + "x" + height + ", " + fps + " fps, " + maxBitrate + " kbps, " + mtu + " mtu)...");
                var videoffmpegCommand = "-re -f lavfi -i testsrc=s=" + width + "x" + height + ":r=" + fps + " -map 0:0 " +
                    ("-c:v h264 -pix_fmt yuv420p -r " + fps + " -an -sn -dn -b:v " + maxBitrate + "k ") +
                    ("-profile:v " + profile + " -level:v " + level + " ") +
                    ("-payload_type " + payloadType + " -ssrc " + ssrc + " -f rtp ");
                if (cryptoSuite !== 2 /* NONE */) {
                    var suite = void 0;
                    switch (cryptoSuite) {
                        case 0 /* AES_CM_128_HMAC_SHA1_80 */: // actually ffmpeg just supports AES_CM_128_HMAC_SHA1_80
                            suite = "AES_CM_128_HMAC_SHA1_80";
                            break;
                        case 1 /* AES_CM_256_HMAC_SHA1_80 */:
                            suite = "AES_CM_256_HMAC_SHA1_80";
                            break;
                    }
                    videoffmpegCommand += "-srtp_out_suite " + suite + " -srtp_out_params " + videoSRTP + " s";
                }
                videoffmpegCommand += "rtp://" + address + ":" + videoPort + "?rtcpport=" + videoPort + "&localrtcpport=" + localVideoPort + "&pkt_size=" + mtu;
                if (this.ffmpegDebugOutput) {
                    console.log("FFMPEG command: ffmpeg " + videoffmpegCommand);
                }
                var ffmpegVideo = child_process_1.spawn('ffmpeg', videoffmpegCommand.split(' '), { env: process.env });
                var started_1 = false;
                ffmpegVideo.stderr.on('data', function (data) {
                    console.log(data.toString("utf8"));
                    if (!started_1) {
                        started_1 = true;
                        console.log("FFMPEG: received first frame");
                        callback(); // do not forget to execute callback once set up
                    }
                    if (_this.ffmpegDebugOutput) {
                        console.log("VIDEO: " + String(data));
                    }
                });
                ffmpegVideo.on('error', function (error) {
                    console.log("[Video] Failed to start video stream: " + error.message);
                    callback(new Error("ffmpeg process creation failed!"));
                });
                ffmpegVideo.on('exit', function (code, signal) {
                    var message = "[Video] ffmpeg exited with code: " + code + " and signal: " + signal;
                    if (code == null || code === 255) {
                        console.log(message + " (Video stream stopped!)");
                    }
                    else {
                        console.log(message + " (error)");
                        if (!started_1) {
                            callback(new Error(message));
                        }
                        else {
                            _this.controller.forceStopStreamingSession(sessionId);
                        }
                    }
                });
                this.ongoingSessions[sessionId] = {
                    localVideoPort: localVideoPort,
                    process: ffmpegVideo,
                };
                delete this.pendingSessions[sessionId];
                break;
            }
            case "reconfigure" /* RECONFIGURE */:
                // not supported by this example
                console.log("Received (unsupported) request to reconfigure to: " + JSON.stringify(request.video));
                callback();
                break;
            case "stop" /* STOP */:
                var ongoingSession = this.ongoingSessions[sessionId];
                ports.delete(ongoingSession.localVideoPort);
                try {
                    ongoingSession.process.kill('SIGKILL');
                }
                catch (e) {
                    console.log("Error occurred terminating the video process!");
                    console.log(e);
                }
                delete this.ongoingSessions[sessionId];
                console.log("Stopped streaming session!");
                callback();
                break;
        }
    };
    return ExampleCamera;
}());
var streamDelegate = new ExampleCamera();
var cameraController = new __1.CameraController({
    cameraStreamCount: 2,
    delegate: streamDelegate,
    streamingOptions: {
        // srtp: true, // legacy option which will just enable AES_CM_128_HMAC_SHA1_80 (can still be used though)
        supportedCryptoSuites: [2 /* NONE */, 0 /* AES_CM_128_HMAC_SHA1_80 */],
        video: {
            codec: {
                profiles: [0 /* BASELINE */, 1 /* MAIN */, 2 /* HIGH */],
                levels: [0 /* LEVEL3_1 */, 1 /* LEVEL3_2 */, 2 /* LEVEL4_0 */],
            },
            resolutions: [
                [1920, 1080, 30],
                [1280, 960, 30],
                [1280, 720, 30],
                [1024, 768, 30],
                [640, 480, 30],
                [640, 360, 30],
                [480, 360, 30],
                [480, 270, 30],
                [320, 240, 30],
                [320, 240, 15],
                [320, 180, 30],
            ],
        },
    }
});
streamDelegate.controller = cameraController;
camera.configureController(cameraController);
//# sourceMappingURL=Camera_accessory.js.map