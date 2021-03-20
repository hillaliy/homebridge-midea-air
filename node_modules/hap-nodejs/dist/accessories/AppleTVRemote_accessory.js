"use strict";
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
var __1 = require("..");
var http = __importStar(require("http"));
var url_1 = __importDefault(require("url"));
var gstreamer_audioProducer_1 = require("./gstreamer-audioProducer");
var remoteUUID = __1.uuid.generate('hap-nodejs:accessories:remote');
var remote = exports.accessory = new __1.Accessory('Remote', remoteUUID);
// @ts-ignore
remote.username = "DB:AF:E0:5C:69:76";
// @ts-ignore
remote.pincode = "874-23-897";
remote.category = 32 /* TARGET_CONTROLLER */;
// ----------------- for siri support -----------------
// CHANGE this to enable siri support. Read docs in 'gstreamer-audioProducer.ts' for necessary package dependencies
var siriSupport = false;
var gstreamerOptions = { // any configuration regarding the producer can be made here
};
// ----------------------------------------------------
var controller = siriSupport
    ? new __1.RemoteController(gstreamer_audioProducer_1.GStreamerAudioProducer, gstreamerOptions)
    : new __1.RemoteController();
remote.configureController(controller);
/*
    This example plugin exposes an simple http api to interact with the remote and play around.
    The supported routes are listed below. The http server runs on port 8080 as default.
    This example should not be used except for testing as the http server is unsecured.

    /listTargets  -  list all currently configured apple tvs and their respective configuration
    /getActiveTarget  -  return the current target id of the controlled device
    /getActive  -  get the value of the active characteristic (active means the apple tv for the activeTarget is listening)

    /press?button=<buttonId>&time=<timeInMS>  - presses a given button for a given time. Time is optional and defaults to 200ms
    /button?button=<buttonId>&state=<stateId>  - send a single button event
    /getTargetId?name=<name of apple TV>  -   get the target identifier for the given name of the apple tv
    /setActiveTarget?identifier=<id>  - set currently controlled apple tv
 */
http.createServer(function (request, response) {
    if (request.method !== "GET") {
        response.writeHead(405, { "Content-Type": "text/html" });
        response.end("Method Not Allowed");
        return;
    }
    var parsedPath = url_1.default.parse(request.url, true);
    var pathname = parsedPath.pathname.substring(1, parsedPath.pathname.length);
    var query = parsedPath.query;
    if (pathname === "setActiveTarget") {
        if (query === undefined || query.identifier === undefined) {
            response.writeHead(400, { "Content-Type": "text/html" });
            response.end("Bad request. Must include 'identifier' in query string!");
            return;
        }
        var targetIdentifier = parseInt(query.identifier, 10);
        if (!controller.isConfigured(targetIdentifier)) {
            response.writeHead(400, { "Content-Type": "text/html" });
            response.end("Bad request. No target found for given identifier " + targetIdentifier);
            return;
        }
        controller.setActiveIdentifier(targetIdentifier);
        response.writeHead(200, { "Content-Type": "text/html" });
        response.end("OK");
        return;
    }
    else if (pathname === "getActiveTarget") {
        response.writeHead(200, { "Content-Type": "text/html" });
        response.end(controller.activeIdentifier + "");
        return;
    }
    else if (pathname === "getTargetId") {
        if (query === undefined || query.name === undefined) {
            response.writeHead(400, { "Content-Type": "text/html" });
            response.end("Bad request. Must include 'name' in query string!");
            return;
        }
        var targetIdentifier = controller.getTargetIdentifierByName(query.name);
        if (targetIdentifier === undefined) {
            response.writeHead(400, { "Content-Type": "text/html" });
            response.end("Bad request. No target found for given name " + query.name);
            return;
        }
        response.writeHead(200, { "Content-Type": "text/html" });
        response.end("" + targetIdentifier);
        return;
    }
    else if (pathname === "button") {
        if (query === undefined || query.state === undefined || query.button === undefined) {
            response.writeHead(400, { "Content-Type": "text/html" });
            response.end("Bad request. Must include 'state' and 'button' in query string!");
            return;
        }
        var buttonState = parseInt(query.state, 10);
        var button = parseInt(query.button, 10);
        // @ts-ignore
        if (__1.ButtonState[buttonState] === undefined) {
            response.writeHead(400, { "Content-Type": "text/html" });
            response.end("Bad request. Unknown button state " + query.state);
            return;
        }
        // @ts-ignore
        if (__1.ButtonType[button] === undefined) {
            response.writeHead(400, { "Content-Type": "text/html" });
            response.end("Bad request. Unknown button " + query.button);
            return;
        }
        if (buttonState === 0 /* UP */) {
            controller.releaseButton(button);
        }
        else if (buttonState === 1 /* DOWN */) {
            controller.pushButton(button);
        }
        response.writeHead(200, { "Content-Type": "text/html" });
        response.end("OK");
        return;
    }
    else if (pathname === "press") {
        if (query === undefined || query.button === undefined) {
            response.writeHead(400, { "Content-Type": "text/html" });
            response.end("Bad request. Must include 'button' in query string!");
            return;
        }
        var time = 200;
        if (query.time !== undefined) {
            var parsedTime = parseInt(query.time, 10);
            if (parsedTime)
                time = parsedTime;
        }
        var button = parseInt(query.button, 10);
        // @ts-ignore
        if (__1.ButtonType[button] === undefined) {
            response.writeHead(400, { "Content-Type": "text/html" });
            response.end("Bad request. Unknown button " + query.button);
            return;
        }
        controller.pushAndReleaseButton(button, time);
        response.writeHead(200, { "Content-Type": "text/html" });
        response.end("OK");
        return;
    }
    else if (pathname === "listTargets") {
        var targets = controller.targetConfigurations;
        response.writeHead(200, { "Content-Type": "application/json" });
        response.end(JSON.stringify(targets, undefined, 4));
        return;
    }
    else if (pathname === "getActive") {
        response.writeHead(200, { "Content-Type": "text/html" });
        response.end(controller.isActive() ? "true" : "false");
        return;
    }
    else {
        response.writeHead(404, { "Content-Type": "text/html" });
        response.end("Not Found. No path found for " + pathname);
        return;
    }
}).listen(8080);
//# sourceMappingURL=AppleTVRemote_accessory.js.map