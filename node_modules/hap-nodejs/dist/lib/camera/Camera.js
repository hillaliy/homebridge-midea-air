"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LegacyCameraSourceAdapter = void 0;
var LegacyCameraSourceAdapter = /** @class */ (function () {
    function LegacyCameraSourceAdapter(cameraSource) {
        this.cameraSource = cameraSource;
    }
    LegacyCameraSourceAdapter.prototype.handleSnapshotRequest = function (request, callback) {
        this.cameraSource.handleSnapshotRequest(request, function (error, buffer) {
            callback(error ? error : undefined, buffer);
        });
    };
    LegacyCameraSourceAdapter.prototype.prepareStream = function (request, callback) {
        this.cameraSource.prepareStream(request, function (response) {
            callback(undefined, response);
        });
    };
    LegacyCameraSourceAdapter.prototype.handleStreamRequest = function (request, callback) {
        // @ts-ignore
        this.cameraSource.handleStreamRequest(request);
        callback();
    };
    LegacyCameraSourceAdapter.prototype.forwardCloseConnection = function (sessionID) {
        // In the legacy type CameraSource API it was need that the plugin dev would forward this call to the
        // handleCloseConnection of the "StreamController". This is not needed anymore and is automatically handled
        // by HAP-NodeJS. However devs could possibly define other stuff in there so we still forward this call.
        this.cameraSource.handleCloseConnection(sessionID);
    };
    return LegacyCameraSourceAdapter;
}());
exports.LegacyCameraSourceAdapter = LegacyCameraSourceAdapter;
//# sourceMappingURL=Camera.js.map