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
Object.defineProperty(exports, "__esModule", { value: true });
var dgram = require('dgram');
var EventEmitter = require('events').EventEmitter;
/**
 * RTPProxy to proxy unencrypted RTP and RTCP
 *
 * At early days of HomeKit camera support, HomeKit allowed for unencrypted RTP stream.
 * The proxy was created to deal with RTCP and SSRC related stuff from external streams back in that days.
 * Later HomeKit removed support for unencrypted stream so it’s mostly no longer useful anymore, only really for testing
 * with a custom HAP controller.
 */
var RTPProxy = /** @class */ (function (_super) {
    __extends(RTPProxy, _super);
    function RTPProxy(options) {
        var _this = _super.call(this) || this;
        _this.options = options;
        _this.startingPort = 10000;
        _this.setup = function () {
            return _this.createSocketPair(_this.type)
                .then(function (sockets) {
                _this.incomingRTPSocket = sockets[0];
                _this.incomingRTCPSocket = sockets[1];
                return _this.createSocket(_this.type);
            }).then(function (socket) {
                _this.outgoingSocket = socket;
                _this.onBound();
            });
        };
        _this.destroy = function () {
            if (_this.incomingRTPSocket) {
                _this.incomingRTPSocket.close();
            }
            if (_this.incomingRTCPSocket) {
                _this.incomingRTCPSocket.close();
            }
            if (_this.outgoingSocket) {
                _this.outgoingSocket.close();
            }
        };
        _this.incomingRTPPort = function () {
            var address = _this.incomingRTPSocket.address();
            if (typeof address !== 'string') {
                return address.port;
            }
        };
        _this.incomingRTCPPort = function () {
            var address = _this.incomingRTCPSocket.address();
            if (typeof address !== 'string') {
                return address.port;
            }
        };
        _this.outgoingLocalPort = function () {
            var address = _this.outgoingSocket.address();
            if (typeof address !== 'string') {
                return address.port;
            }
            return 0; // won't happen
        };
        _this.setServerAddress = function (address) {
            _this.serverAddress = address;
        };
        _this.setServerRTPPort = function (port) {
            _this.serverRTPPort = port;
        };
        _this.setServerRTCPPort = function (port) {
            _this.serverRTCPPort = port;
        };
        _this.setIncomingPayloadType = function (pt) {
            _this.incomingPayloadType = pt;
        };
        _this.setOutgoingPayloadType = function (pt) {
            _this.outgoingPayloadType = pt;
        };
        _this.sendOut = function (msg) {
            // Just drop it if we're not setup yet, I guess.
            if (!_this.outgoingAddress || !_this.outgoingPort)
                return;
            _this.outgoingSocket.send(msg, _this.outgoingPort, _this.outgoingAddress);
        };
        _this.sendBack = function (msg) {
            // Just drop it if we're not setup yet, I guess.
            if (!_this.serverAddress || !_this.serverRTCPPort)
                return;
            _this.outgoingSocket.send(msg, _this.serverRTCPPort, _this.serverAddress);
        };
        _this.onBound = function () {
            if (_this.disabled)
                return;
            _this.incomingRTPSocket.on('message', function (msg, rinfo) {
                _this.rtpMessage(msg);
            });
            _this.incomingRTCPSocket.on('message', function (msg, rinfo) {
                _this.rtcpMessage(msg);
            });
            _this.outgoingSocket.on('message', function (msg, rinfo) {
                _this.rtcpReply(msg);
            });
        };
        _this.rtpMessage = function (msg) {
            if (msg.length < 12) {
                // Not a proper RTP packet. Just forward it.
                _this.sendOut(msg);
                return;
            }
            var mpt = msg.readUInt8(1);
            var pt = mpt & 0x7F;
            if (pt == _this.incomingPayloadType) {
                // @ts-ignore
                mpt = (mpt & 0x80) | _this.outgoingPayloadType;
                msg.writeUInt8(mpt, 1);
            }
            if (_this.incomingSSRC === null)
                _this.incomingSSRC = msg.readUInt32BE(4);
            msg.writeUInt32BE(_this.outgoingSSRC, 8);
            _this.sendOut(msg);
        };
        _this.processRTCPMessage = function (msg, transform) {
            var rtcpPackets = [];
            var offset = 0;
            while ((offset + 4) <= msg.length) {
                var pt = msg.readUInt8(offset + 1);
                var len = msg.readUInt16BE(offset + 2) * 4;
                if ((offset + 4 + len) > msg.length)
                    break;
                var packet = msg.slice(offset, offset + 4 + len);
                packet = transform(pt, packet);
                if (packet)
                    rtcpPackets.push(packet);
                offset += 4 + len;
            }
            if (rtcpPackets.length > 0)
                return Buffer.concat(rtcpPackets);
            return null;
        };
        _this.rtcpMessage = function (msg) {
            var processed = _this.processRTCPMessage(msg, function (pt, packet) {
                if (pt != 200 || packet.length < 8)
                    return packet;
                if (_this.incomingSSRC === null)
                    _this.incomingSSRC = packet.readUInt32BE(4);
                packet.writeUInt32BE(_this.outgoingSSRC, 4);
                return packet;
            });
            if (processed)
                _this.sendOut(processed);
        };
        _this.rtcpReply = function (msg) {
            var processed = _this.processRTCPMessage(msg, function (pt, packet) {
                if (pt != 201 || packet.length < 12)
                    return packet;
                // Assume source 1 is the one we want to edit.
                // @ts-ignore
                packet.writeUInt32BE(_this.incomingSSRC, 8);
                return packet;
            });
            if (processed)
                _this.sendOut(processed);
        };
        _this.createSocket = function (type) {
            return new Promise(function (resolve, reject) {
                var retry = function () {
                    var socket = dgram.createSocket(type);
                    var bindErrorHandler = function () {
                        if (_this.startingPort == 65535)
                            _this.startingPort = 10000;
                        else
                            ++_this.startingPort;
                        socket.close();
                        retry();
                    };
                    socket.once('error', bindErrorHandler);
                    socket.on('listening', function () {
                        resolve(socket);
                    });
                    socket.bind(_this.startingPort);
                };
                retry();
            });
        };
        _this.createSocketPair = function (type) {
            return new Promise(function (resolve, reject) {
                var retry = function () {
                    var socket1 = dgram.createSocket(type);
                    var socket2 = dgram.createSocket(type);
                    var state = { socket1: 0, socket2: 0 };
                    var recheck = function () {
                        if (state.socket1 == 0 || state.socket2 == 0)
                            return;
                        if (state.socket1 == 2 && state.socket2 == 2) {
                            resolve([socket1, socket2]);
                            return;
                        }
                        if (_this.startingPort == 65534)
                            _this.startingPort = 10000;
                        else
                            ++_this.startingPort;
                        socket1.close();
                        socket2.close();
                        retry();
                    };
                    socket1.once('error', function () {
                        state.socket1 = 1;
                        recheck();
                    });
                    socket2.once('error', function () {
                        state.socket2 = 1;
                        recheck();
                    });
                    socket1.once('listening', function () {
                        state.socket1 = 2;
                        recheck();
                    });
                    socket2.once('listening', function () {
                        state.socket2 = 2;
                        recheck();
                    });
                    socket1.bind(_this.startingPort);
                    socket2.bind(_this.startingPort + 1);
                };
                retry();
            });
        };
        _this.type = options.isIPV6 ? 'udp6' : 'udp4';
        _this.startingPort = 10000;
        _this.outgoingAddress = options.outgoingAddress;
        _this.outgoingPort = options.outgoingPort;
        _this.incomingPayloadType = 0;
        _this.outgoingSSRC = options.outgoingSSRC;
        _this.disabled = options.disabled;
        _this.incomingSSRC = null;
        _this.outgoingPayloadType = null;
        return _this;
    }
    return RTPProxy;
}(EventEmitter));
exports.default = RTPProxy;
//# sourceMappingURL=RTPProxy.js.map