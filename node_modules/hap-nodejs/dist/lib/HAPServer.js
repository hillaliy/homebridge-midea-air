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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HAPEncryption = exports.HAPServer = exports.HAPServerEventTypes = exports.Status = exports.Codes = void 0;
var crypto_1 = __importDefault(require("crypto"));
var debug_1 = __importDefault(require("debug"));
var tweetnacl_1 = __importDefault(require("tweetnacl"));
var url_1 = __importDefault(require("url"));
var hapCrypto = __importStar(require("./util/hapCrypto"));
var tlv = __importStar(require("./util/tlv"));
var eventedhttp_1 = require("./util/eventedhttp");
var once_1 = require("./util/once");
var EventEmitter_1 = require("./EventEmitter");
var fast_srp_hap_1 = require("fast-srp-hap");
var debug = debug_1.default('HAP-NodeJS:HAPServer');
var TLVValues;
(function (TLVValues) {
    TLVValues[TLVValues["REQUEST_TYPE"] = 0] = "REQUEST_TYPE";
    TLVValues[TLVValues["METHOD"] = 0] = "METHOD";
    TLVValues[TLVValues["USERNAME"] = 1] = "USERNAME";
    TLVValues[TLVValues["IDENTIFIER"] = 1] = "IDENTIFIER";
    TLVValues[TLVValues["SALT"] = 2] = "SALT";
    TLVValues[TLVValues["PUBLIC_KEY"] = 3] = "PUBLIC_KEY";
    TLVValues[TLVValues["PASSWORD_PROOF"] = 4] = "PASSWORD_PROOF";
    TLVValues[TLVValues["ENCRYPTED_DATA"] = 5] = "ENCRYPTED_DATA";
    TLVValues[TLVValues["SEQUENCE_NUM"] = 6] = "SEQUENCE_NUM";
    TLVValues[TLVValues["STATE"] = 6] = "STATE";
    TLVValues[TLVValues["ERROR_CODE"] = 7] = "ERROR_CODE";
    TLVValues[TLVValues["RETRY_DELAY"] = 8] = "RETRY_DELAY";
    TLVValues[TLVValues["CERTIFICATE"] = 9] = "CERTIFICATE";
    TLVValues[TLVValues["PROOF"] = 10] = "PROOF";
    TLVValues[TLVValues["SIGNATURE"] = 10] = "SIGNATURE";
    TLVValues[TLVValues["PERMISSIONS"] = 11] = "PERMISSIONS";
    TLVValues[TLVValues["FRAGMENT_DATA"] = 12] = "FRAGMENT_DATA";
    TLVValues[TLVValues["FRAGMENT_LAST"] = 13] = "FRAGMENT_LAST";
    TLVValues[TLVValues["SEPARATOR"] = 255] = "SEPARATOR"; // Zero-length TLV that separates different TLVs in a list.
})(TLVValues || (TLVValues = {}));
var Methods;
(function (Methods) {
    Methods[Methods["PAIR_SETUP"] = 0] = "PAIR_SETUP";
    Methods[Methods["PAIR_SETUP_WITH_AUTH"] = 1] = "PAIR_SETUP_WITH_AUTH";
    Methods[Methods["PAIR_VERIFY"] = 2] = "PAIR_VERIFY";
    Methods[Methods["ADD_PAIRING"] = 3] = "ADD_PAIRING";
    Methods[Methods["REMOVE_PAIRING"] = 4] = "REMOVE_PAIRING";
    Methods[Methods["LIST_PAIRINGS"] = 5] = "LIST_PAIRINGS";
})(Methods || (Methods = {}));
var States;
(function (States) {
    States[States["M1"] = 1] = "M1";
    States[States["M2"] = 2] = "M2";
    States[States["M3"] = 3] = "M3";
    States[States["M4"] = 4] = "M4";
    States[States["M5"] = 5] = "M5";
    States[States["M6"] = 6] = "M6";
})(States || (States = {}));
var Codes;
(function (Codes) {
    Codes[Codes["UNKNOWN"] = 1] = "UNKNOWN";
    Codes[Codes["INVALID_REQUEST"] = 2] = "INVALID_REQUEST";
    Codes[Codes["AUTHENTICATION"] = 2] = "AUTHENTICATION";
    Codes[Codes["BACKOFF"] = 3] = "BACKOFF";
    Codes[Codes["MAX_PEERS"] = 4] = "MAX_PEERS";
    Codes[Codes["MAX_TRIES"] = 5] = "MAX_TRIES";
    Codes[Codes["UNAVAILABLE"] = 6] = "UNAVAILABLE";
    Codes[Codes["BUSY"] = 7] = "BUSY"; // cannot accept pairing request at this time
})(Codes = exports.Codes || (exports.Codes = {}));
var Status;
(function (Status) {
    Status[Status["SUCCESS"] = 0] = "SUCCESS";
    Status[Status["INSUFFICIENT_PRIVILEGES"] = -70401] = "INSUFFICIENT_PRIVILEGES";
    Status[Status["SERVICE_COMMUNICATION_FAILURE"] = -70402] = "SERVICE_COMMUNICATION_FAILURE";
    Status[Status["RESOURCE_BUSY"] = -70403] = "RESOURCE_BUSY";
    Status[Status["READ_ONLY_CHARACTERISTIC"] = -70404] = "READ_ONLY_CHARACTERISTIC";
    Status[Status["WRITE_ONLY_CHARACTERISTIC"] = -70405] = "WRITE_ONLY_CHARACTERISTIC";
    Status[Status["NOTIFICATION_NOT_SUPPORTED"] = -70406] = "NOTIFICATION_NOT_SUPPORTED";
    Status[Status["OUT_OF_RESOURCE"] = -70407] = "OUT_OF_RESOURCE";
    Status[Status["OPERATION_TIMED_OUT"] = -70408] = "OPERATION_TIMED_OUT";
    Status[Status["RESOURCE_DOES_NOT_EXIST"] = -70409] = "RESOURCE_DOES_NOT_EXIST";
    Status[Status["INVALID_VALUE_IN_REQUEST"] = -70410] = "INVALID_VALUE_IN_REQUEST";
    Status[Status["INSUFFICIENT_AUTHORIZATION"] = -70411] = "INSUFFICIENT_AUTHORIZATION";
})(Status = exports.Status || (exports.Status = {}));
var HAPServerEventTypes;
(function (HAPServerEventTypes) {
    HAPServerEventTypes["IDENTIFY"] = "identify";
    HAPServerEventTypes["LISTENING"] = "listening";
    HAPServerEventTypes["PAIR"] = "pair";
    HAPServerEventTypes["ADD_PAIRING"] = "add-pairing";
    HAPServerEventTypes["REMOVE_PAIRING"] = "remove_pairing";
    HAPServerEventTypes["LIST_PAIRINGS"] = "list-pairings";
    HAPServerEventTypes["ACCESSORIES"] = "accessories";
    HAPServerEventTypes["GET_CHARACTERISTICS"] = "get-characteristics";
    HAPServerEventTypes["SET_CHARACTERISTICS"] = "set-characteristics";
    HAPServerEventTypes["SESSION_CLOSE"] = "session-close";
    HAPServerEventTypes["REQUEST_RESOURCE"] = "request-resource";
})(HAPServerEventTypes = exports.HAPServerEventTypes || (exports.HAPServerEventTypes = {}));
/**
 * The actual HAP server that iOS devices talk to.
 *
 * Notes
 * -----
 * It turns out that the IP-based version of HomeKit's HAP protocol operates over a sort of pseudo-HTTP.
 * Accessories are meant to host a TCP socket server that initially behaves exactly as an HTTP/1.1 server.
 * So iOS devices will open up a long-lived connection to this server and begin issuing HTTP requests.
 * So far, this conforms with HTTP/1.1 Keepalive. However, after the "pairing" process is complete, the
 * connection is expected to be "upgraded" to support full-packet encryption of both HTTP headers and data.
 * This encryption is NOT SSL. It is a customized ChaCha20+Poly1305 encryption layer.
 *
 * Additionally, this "HTTP Server" supports sending "event" responses at any time without warning. The iOS
 * device simply keeps the connection open after it's finished with HTTP request/response traffic, and while
 * the connection is open, the server can elect to issue "EVENT/1.0 200 OK" HTTP-style responses. These are
 * typically sent to inform the iOS device of a characteristic change for the accessory (like "Door was Unlocked").
 *
 * See eventedhttp.js for more detail on the implementation of this protocol.
 *
 * @event 'listening' => function() { }
 *        Emitted when the server is fully set up and ready to receive connections.
 *
 * @event 'identify' => function(callback(err)) { }
 *        Emitted when a client wishes for this server to identify itself before pairing. You must call the
 *        callback to respond to the client with success.
 *
 * @event 'pair' => function(username, publicKey, callback(err)) { }
 *        This event is emitted when a client completes the "pairing" process and exchanges encryption keys.
 *        Note that this does not mean the "Add Accessory" process in iOS has completed. You must call the
 *        callback to complete the process.
 *
 * @event 'verify' => function() { }
 *        This event is emitted after a client successfully completes the "verify" process, thereby authenticating
 *        itself to an Accessory as a known-paired client.
 *
 * @event 'unpair' => function(username, callback(err)) { }
 *        This event is emitted when a client has requested us to "remove their pairing info", or basically to unpair.
 *        You must call the callback to complete the process.
 *
 * @event 'accessories' => function(callback(err, accessories)) { }
 *        This event is emitted when a client requests the complete representation of Accessory data for
 *        this Accessory (for instance, what services, characteristics, etc. are supported) and any bridged
 *        Accessories in the case of a Bridge Accessory. The listener must call the provided callback function
 *        when the accessory data is ready. We will automatically JSON.stringify the data.
 *
 * @event 'get-characteristics' => function(data, events, callback(err, characteristics), remote, connectionID) { }
 *        This event is emitted when a client wishes to retrieve the current value of one or more characteristics.
 *        The listener must call the provided callback function when the values are ready. iOS clients can typically
 *        wait up to 10 seconds for this call to return. We will automatically JSON.stringify the data (which must
 *        be an array) and wrap it in an object with a top-level "characteristics" property.
 *
 * @event 'set-characteristics' => function(data, events, callback(err), remote, connectionID) { }
 *        This event is emitted when a client wishes to set the current value of one or more characteristics and/or
 *        subscribe to one or more events. The 'events' param is an initially-empty object, associated with the current
 *        connection, on which you may store event registration keys for later processing. The listener must call
 *        the provided callback when the request has been processed.
 */
var HAPServer = /** @class */ (function (_super) {
    __extends(HAPServer, _super);
    function HAPServer(accessoryInfo) {
        var _this = _super.call(this) || this;
        _this.accessoryInfo = accessoryInfo;
        _this.unsuccessfulPairAttempts = 0; // after 100 unsuccessful attempts the server won't accept any further attempts. Will currently be reset on a reboot
        _this.listen = function (port) {
            _this._httpServer.listen(port);
        };
        _this.stop = function () {
            _this._httpServer.stop();
            clearInterval(_this._keepAliveTimerID);
        };
        _this._onKeepAliveTimerTick = function () {
            // send out a "keepalive" event which all connections automatically sign up for once pairVerify is
            // completed. The event contains no actual data, so iOS devices will simply ignore it.
            _this.notifyClients('keepalive', { characteristics: [] });
        };
        /**
         * Notifies connected clients who have subscribed to a particular event.
         *
         * @param event {string} - the name of the event (only clients who have subscribed to this name will be notified)
         * @param data {object} - the object containing the event data; will be JSON.stringify'd automatically
         */
        _this.notifyClients = function (event, data, excludeEvents) {
            // encode notification data as JSON, set content-type, and hand it off to the server.
            _this._httpServer.sendEvent(event, JSON.stringify(data), "application/hap+json", excludeEvents);
        };
        _this._onListening = function (port) {
            _this.emit("listening" /* LISTENING */, port);
        };
        // Called when an HTTP request was detected.
        _this._onRequest = function (request, response, session, events) {
            debug("[%s] HAP Request: %s %s", _this.accessoryInfo.username, request.method, request.url);
            // collect request data, if any
            var requestData = Buffer.alloc(0);
            request.on('data', function (data) {
                requestData = Buffer.concat([requestData, data]);
            });
            request.on('end', function () {
                // parse request.url (which can contain querystring, etc.) into components, then extract just the path
                var pathname = url_1.default.parse(request.url).pathname;
                // all request data received; now process this request
                for (var path in HAPServer.handlers)
                    if (new RegExp('^' + path + '/?$').test(pathname)) { // match exact string and allow trailing slash
                        var handler = HAPServer.handlers[path];
                        _this[handler](request, response, session, events, requestData);
                        return;
                    }
                // nobody handled this? reply 404
                debug("[%s] WARNING: Handler for %s not implemented", _this.accessoryInfo.username, request.url);
                response.writeHead(404, "Not found", { 'Content-Type': 'text/html' });
                response.end();
            });
        };
        _this._onEncrypt = function (data, encrypted, session) {
            // instance of HAPEncryption (created in handlePairVerifyStepOne)
            var enc = session.encryption;
            // if accessoryToControllerKey is not empty, then encryption is enabled for this connection. However, we'll
            // need to be careful to ensure that we don't encrypt the last few bytes of the response from handlePairVerifyStepTwo.
            // Since all communication calls are asynchronous, we could easily receive this 'encrypt' event for those bytes.
            // So we want to make sure that we aren't encrypting data until we have *received* some encrypted data from the
            // client first.
            if (enc && enc.accessoryToControllerKey.length > 0 && enc.controllerToAccessoryCount.value > 0) {
                encrypted.data = hapCrypto.layerEncrypt(data, enc.accessoryToControllerCount, enc.accessoryToControllerKey);
            }
        };
        _this._onDecrypt = function (data, decrypted, session) {
            // possibly an instance of HAPEncryption (created in handlePairVerifyStepOne)
            var enc = session.encryption;
            // if controllerToAccessoryKey is not empty, then encryption is enabled for this connection.
            if (enc && enc.controllerToAccessoryKey.length > 0) {
                try {
                    decrypted.data = hapCrypto.layerDecrypt(data, enc.controllerToAccessoryCount, enc.controllerToAccessoryKey, enc.extraInfo);
                }
                catch (error) {
                    decrypted.error = error;
                }
            }
        };
        _this._onSessionClose = function (sessionID, events) {
            _this.emit("session-close" /* SESSION_CLOSE */, sessionID, events);
        };
        /**
         * Unpaired Accessory identification.
         */
        _this._handleIdentify = function (request, response, session, events, requestData) {
            // /identify only works if the accesory is not paired
            if (!_this.allowInsecureRequest && _this.accessoryInfo.paired()) {
                response.writeHead(400, { "Content-Type": "application/hap+json" });
                response.end(JSON.stringify({ status: -70401 /* INSUFFICIENT_PRIVILEGES */ }));
                return;
            }
            _this.emit("identify" /* IDENTIFY */, once_1.once(function (err) {
                if (!err) {
                    debug("[%s] Identification success", _this.accessoryInfo.username);
                    response.writeHead(204);
                    response.end();
                }
                else {
                    debug("[%s] Identification error: %s", _this.accessoryInfo.username, err.message);
                    response.writeHead(500);
                    response.end();
                }
            }));
        };
        /**
         * iOS <-> Accessory pairing process.
         */
        _this._handlePair = function (request, response, session, events, requestData) {
            // Can only be directly paired with one iOS device
            if (!_this.allowInsecureRequest && _this.accessoryInfo.paired()) {
                response.writeHead(200, { "Content-Type": "application/pairing+tlv8" });
                response.end(tlv.encode(6 /* STATE */, 2 /* M2 */, 7 /* ERROR_CODE */, 6 /* UNAVAILABLE */));
                return;
            }
            if (_this.unsuccessfulPairAttempts > 100) {
                response.writeHead(200, { "Content-Type": "application/pairing+tlv8" });
                response.end(tlv.encode(6 /* STATE */, 2 /* M2 */, 7 /* ERROR_CODE */, 5 /* MAX_TRIES */));
                return;
            }
            var objects = tlv.decode(requestData);
            var sequence = objects[6 /* SEQUENCE_NUM */][0]; // value is single byte with sequence number
            if (sequence == 1 /* M1 */)
                _this._handlePairStepOne(request, response, session);
            else if (sequence == 3 /* M3 */ && session._pairSetupState === 2 /* M2 */)
                _this._handlePairStepTwo(request, response, session, objects);
            else if (sequence == 5 /* M5 */ && session._pairSetupState === 4 /* M4 */)
                _this._handlePairStepThree(request, response, session, objects);
            else {
                // Invalid state/sequence number
                response.writeHead(400, { "Content-Type": "application/pairing+tlv8" });
                response.end(tlv.encode(6 /* STATE */, sequence + 1, 7 /* ERROR_CODE */, 1 /* UNKNOWN */));
                return;
            }
        };
        // M1 + M2
        _this._handlePairStepOne = function (request, response, session) {
            debug("[%s] Pair step 1/5", _this.accessoryInfo.username);
            var salt = crypto_1.default.randomBytes(16);
            var srpParams = fast_srp_hap_1.SRP.params.hap;
            fast_srp_hap_1.SRP.genKey(32).then(function (key) {
                // create a new SRP server
                var srpServer = new fast_srp_hap_1.SrpServer(srpParams, salt, Buffer.from("Pair-Setup"), Buffer.from(_this.accessoryInfo.pincode), key);
                var srpB = srpServer.computeB();
                // attach it to the current TCP session
                session.srpServer = srpServer;
                response.writeHead(200, { "Content-Type": "application/pairing+tlv8" });
                response.end(tlv.encode(6 /* SEQUENCE_NUM */, 2 /* M2 */, 2 /* SALT */, salt, 3 /* PUBLIC_KEY */, srpB));
                session._pairSetupState = 2 /* M2 */;
            }).catch(function (error) {
                debug("[%s] Error occurred when generating srp key: %s", _this.accessoryInfo.username, error.message);
                response.writeHead(200, { "Content-Type": "application/pairing+tlv8" });
                response.end(tlv.encode(6 /* STATE */, 2 /* M2 */, 7 /* ERROR_CODE */, 1 /* UNKNOWN */));
                return;
            });
        };
        // M3 + M4
        _this._handlePairStepTwo = function (request, response, session, objects) {
            debug("[%s] Pair step 2/5", _this.accessoryInfo.username);
            var A = objects[3 /* PUBLIC_KEY */]; // "A is a public key that exists only for a single login session."
            var M1 = objects[4 /* PASSWORD_PROOF */]; // "M1 is the proof that you actually know your own password."
            // pull the SRP server we created in stepOne out of the current session
            var srpServer = session.srpServer;
            srpServer.setA(A);
            try {
                srpServer.checkM1(M1);
            }
            catch (err) {
                // most likely the client supplied an incorrect pincode.
                _this.unsuccessfulPairAttempts++;
                debug("[%s] Error while checking pincode: %s", _this.accessoryInfo.username, err.message);
                response.writeHead(200, { "Content-Type": "application/pairing+tlv8" });
                response.end(tlv.encode(6 /* SEQUENCE_NUM */, 4 /* M4 */, 7 /* ERROR_CODE */, 2 /* AUTHENTICATION */));
                session._pairSetupState = undefined;
                return;
            }
            // "M2 is the proof that the server actually knows your password."
            var M2 = srpServer.computeM2();
            response.writeHead(200, { "Content-Type": "application/pairing+tlv8" });
            response.end(tlv.encode(6 /* SEQUENCE_NUM */, 4 /* M4 */, 4 /* PASSWORD_PROOF */, M2));
            session._pairSetupState = 4 /* M4 */;
        };
        // M5-1
        _this._handlePairStepThree = function (request, response, session, objects) {
            debug("[%s] Pair step 3/5", _this.accessoryInfo.username);
            // pull the SRP server we created in stepOne out of the current session
            var srpServer = session.srpServer;
            var encryptedData = objects[5 /* ENCRYPTED_DATA */];
            var messageData = Buffer.alloc(encryptedData.length - 16);
            var authTagData = Buffer.alloc(16);
            encryptedData.copy(messageData, 0, 0, encryptedData.length - 16);
            encryptedData.copy(authTagData, 0, encryptedData.length - 16, encryptedData.length);
            var S_private = srpServer.computeK();
            var encSalt = Buffer.from("Pair-Setup-Encrypt-Salt");
            var encInfo = Buffer.from("Pair-Setup-Encrypt-Info");
            var outputKey = hapCrypto.HKDF("sha512", encSalt, S_private, encInfo, 32);
            var plaintext;
            try {
                plaintext = hapCrypto.chacha20_poly1305_decryptAndVerify(outputKey, Buffer.from("PS-Msg05"), null, messageData, authTagData);
            }
            catch (error) {
                debug("[%s] Error while decrypting and verifying M5 subTlv: %s", _this.accessoryInfo.username);
                response.writeHead(200, { "Content-Type": "application/pairing+tlv8" });
                response.end(tlv.encode(6 /* SEQUENCE_NUM */, 4 /* M4 */, 7 /* ERROR_CODE */, 2 /* AUTHENTICATION */));
                session._pairSetupState = undefined;
                return;
            }
            // decode the client payload and pass it on to the next step
            var M5Packet = tlv.decode(plaintext);
            var clientUsername = M5Packet[1 /* USERNAME */];
            var clientLTPK = M5Packet[3 /* PUBLIC_KEY */];
            var clientProof = M5Packet[10 /* PROOF */];
            var hkdfEncKey = outputKey;
            _this._handlePairStepFour(request, response, session, clientUsername, clientLTPK, clientProof, hkdfEncKey);
        };
        // M5-2
        _this._handlePairStepFour = function (request, response, session, clientUsername, clientLTPK, clientProof, hkdfEncKey) {
            debug("[%s] Pair step 4/5", _this.accessoryInfo.username);
            var S_private = session.srpServer.computeK();
            var controllerSalt = Buffer.from("Pair-Setup-Controller-Sign-Salt");
            var controllerInfo = Buffer.from("Pair-Setup-Controller-Sign-Info");
            var outputKey = hapCrypto.HKDF("sha512", controllerSalt, S_private, controllerInfo, 32);
            var completeData = Buffer.concat([outputKey, clientUsername, clientLTPK]);
            if (!tweetnacl_1.default.sign.detached.verify(completeData, clientProof, clientLTPK)) {
                debug("[%s] Invalid signature", _this.accessoryInfo.username);
                response.writeHead(200, { "Content-Type": "application/pairing+tlv8" });
                response.end(tlv.encode(6 /* SEQUENCE_NUM */, 6 /* M6 */, 7 /* ERROR_CODE */, 2 /* AUTHENTICATION */));
                session._pairSetupState = undefined;
                return;
            }
            _this._handlePairStepFive(request, response, session, clientUsername, clientLTPK, hkdfEncKey);
        };
        // M5 - F + M6
        _this._handlePairStepFive = function (request, response, session, clientUsername, clientLTPK, hkdfEncKey) {
            debug("[%s] Pair step 5/5", _this.accessoryInfo.username);
            var S_private = session.srpServer.computeK();
            var accessorySalt = Buffer.from("Pair-Setup-Accessory-Sign-Salt");
            var accessoryInfo = Buffer.from("Pair-Setup-Accessory-Sign-Info");
            var outputKey = hapCrypto.HKDF("sha512", accessorySalt, S_private, accessoryInfo, 32);
            var serverLTPK = _this.accessoryInfo.signPk;
            var usernameData = Buffer.from(_this.accessoryInfo.username);
            var material = Buffer.concat([outputKey, usernameData, serverLTPK]);
            var privateKey = Buffer.from(_this.accessoryInfo.signSk);
            var serverProof = tweetnacl_1.default.sign.detached(material, privateKey);
            var message = tlv.encode(1 /* USERNAME */, usernameData, 3 /* PUBLIC_KEY */, serverLTPK, 10 /* PROOF */, serverProof);
            var encrypted = hapCrypto.chacha20_poly1305_encryptAndSeal(hkdfEncKey, Buffer.from("PS-Msg06"), null, message);
            // finally, notify listeners that we have been paired with a client
            _this.emit("pair" /* PAIR */, clientUsername.toString(), clientLTPK, once_1.once(function (err) {
                if (err) {
                    debug("[%s] Error adding pairing info: %s", _this.accessoryInfo.username, err.message);
                    response.writeHead(500, "Server Error");
                    response.end();
                    session._pairSetupState = undefined;
                    return;
                }
                // send final pairing response to client
                response.writeHead(200, { "Content-Type": "application/pairing+tlv8" });
                response.end(tlv.encode(6 /* SEQUENCE_NUM */, 0x06, 5 /* ENCRYPTED_DATA */, Buffer.concat([encrypted.ciphertext, encrypted.authTag])));
                session._pairSetupState = undefined;
            }));
        };
        /**
         * iOS <-> Accessory pairing verification.
         */
        _this._handlePairVerify = function (request, response, session, events, requestData) {
            var objects = tlv.decode(requestData);
            var sequence = objects[6 /* SEQUENCE_NUM */][0]; // value is single byte with sequence number
            if (sequence == 1 /* M1 */)
                _this._handlePairVerifyStepOne(request, response, session, objects);
            else if (sequence == 3 /* M3 */ && session._pairVerifyState === 2 /* M2 */)
                _this._handlePairVerifyStepTwo(request, response, session, events, objects);
            else {
                // Invalid state/sequence number
                response.writeHead(400, { "Content-Type": "application/pairing+tlv8" });
                response.end(tlv.encode(6 /* STATE */, sequence + 1, 7 /* ERROR_CODE */, 1 /* UNKNOWN */));
                return;
            }
        };
        _this._handlePairVerifyStepOne = function (request, response, session, objects) {
            debug("[%s] Pair verify step 1/2", _this.accessoryInfo.username);
            var clientPublicKey = objects[3 /* PUBLIC_KEY */]; // Buffer
            // generate new encryption keys for this session
            var keyPair = hapCrypto.generateCurve25519KeyPair();
            var secretKey = Buffer.from(keyPair.secretKey);
            var publicKey = Buffer.from(keyPair.publicKey);
            var sharedSec = Buffer.from(hapCrypto.generateCurve25519SharedSecKey(secretKey, clientPublicKey));
            var usernameData = Buffer.from(_this.accessoryInfo.username);
            var material = Buffer.concat([publicKey, usernameData, clientPublicKey]);
            var privateKey = Buffer.from(_this.accessoryInfo.signSk);
            var serverProof = tweetnacl_1.default.sign.detached(material, privateKey);
            var encSalt = Buffer.from("Pair-Verify-Encrypt-Salt");
            var encInfo = Buffer.from("Pair-Verify-Encrypt-Info");
            var outputKey = hapCrypto.HKDF("sha512", encSalt, sharedSec, encInfo, 32).slice(0, 32);
            // store keys in a new instance of HAPEncryption
            var enc = new HAPEncryption();
            enc.clientPublicKey = clientPublicKey;
            enc.secretKey = secretKey;
            enc.publicKey = publicKey;
            enc.sharedSec = sharedSec;
            enc.hkdfPairEncKey = outputKey;
            // store this in the current TCP session
            session.encryption = enc;
            // compose the response data in TLV format
            var message = tlv.encode(1 /* USERNAME */, usernameData, 10 /* PROOF */, serverProof);
            var encrypted = hapCrypto.chacha20_poly1305_encryptAndSeal(outputKey, Buffer.from("PV-Msg02"), null, message);
            response.writeHead(200, { "Content-Type": "application/pairing+tlv8" });
            response.end(tlv.encode(6 /* SEQUENCE_NUM */, 2 /* M2 */, 5 /* ENCRYPTED_DATA */, Buffer.concat([encrypted.ciphertext, encrypted.authTag]), 3 /* PUBLIC_KEY */, publicKey));
            session._pairVerifyState = 2 /* M2 */;
        };
        _this._handlePairVerifyStepTwo = function (request, response, session, events, objects) {
            debug("[%s] Pair verify step 2/2", _this.accessoryInfo.username);
            var encryptedData = objects[5 /* ENCRYPTED_DATA */];
            var messageData = Buffer.alloc(encryptedData.length - 16);
            var authTagData = Buffer.alloc(16);
            encryptedData.copy(messageData, 0, 0, encryptedData.length - 16);
            encryptedData.copy(authTagData, 0, encryptedData.length - 16, encryptedData.length);
            // instance of HAPEncryption (created in handlePairVerifyStepOne)
            var enc = session.encryption;
            var plaintext;
            try {
                plaintext = hapCrypto.chacha20_poly1305_decryptAndVerify(enc.hkdfPairEncKey, Buffer.from("PV-Msg03"), null, messageData, authTagData);
            }
            catch (error) {
                debug("[%s] M3: Failed to decrypt and/or verify", _this.accessoryInfo.username);
                response.writeHead(200, { "Content-Type": "application/pairing+tlv8" });
                response.end(tlv.encode(6 /* STATE */, 4 /* M4 */, 7 /* ERROR_CODE */, 2 /* AUTHENTICATION */));
                session._pairVerifyState = undefined;
                return;
            }
            var decoded = tlv.decode(plaintext);
            var clientUsername = decoded[1 /* USERNAME */];
            var proof = decoded[10 /* PROOF */];
            var material = Buffer.concat([enc.clientPublicKey, clientUsername, enc.publicKey]);
            // since we're paired, we should have the public key stored for this client
            var clientPublicKey = _this.accessoryInfo.getClientPublicKey(clientUsername.toString());
            // if we're not actually paired, then there's nothing to verify - this client thinks it's paired with us but we
            // disagree. Respond with invalid request (seems to match HomeKit Accessory Simulator behavior)
            if (!clientPublicKey) {
                debug("[%s] Client %s attempting to verify, but we are not paired; rejecting client", _this.accessoryInfo.username, clientUsername);
                response.writeHead(200, { "Content-Type": "application/pairing+tlv8" });
                response.end(tlv.encode(6 /* STATE */, 4 /* M4 */, 7 /* ERROR_CODE */, 2 /* AUTHENTICATION */));
                session._pairVerifyState = undefined;
                return;
            }
            if (!tweetnacl_1.default.sign.detached.verify(material, proof, clientPublicKey)) {
                debug("[%s] Client %s provided an invalid signature", _this.accessoryInfo.username, clientUsername);
                response.writeHead(200, { "Content-Type": "application/pairing+tlv8" });
                response.end(tlv.encode(6 /* STATE */, 4 /* M4 */, 7 /* ERROR_CODE */, 2 /* AUTHENTICATION */));
                session._pairVerifyState = undefined;
                return;
            }
            debug("[%s] Client %s verification complete", _this.accessoryInfo.username, clientUsername);
            response.writeHead(200, { "Content-Type": "application/pairing+tlv8" });
            response.end(tlv.encode(6 /* SEQUENCE_NUM */, 0x04));
            // now that the client has been verified, we must "upgrade" our pesudo-HTTP connection to include
            // TCP-level encryption. We'll do this by adding some more encryption vars to the session, and using them
            // in future calls to onEncrypt, onDecrypt.
            var encSalt = Buffer.from("Control-Salt");
            var infoRead = Buffer.from("Control-Read-Encryption-Key");
            var infoWrite = Buffer.from("Control-Write-Encryption-Key");
            enc.accessoryToControllerKey = hapCrypto.HKDF("sha512", encSalt, enc.sharedSec, infoRead, 32);
            enc.controllerToAccessoryKey = hapCrypto.HKDF("sha512", encSalt, enc.sharedSec, infoWrite, 32);
            // Our connection is now completely setup. We now want to subscribe this connection to special
            // "keepalive" events for detecting when connections are closed by the client.
            events['keepalive'] = true;
            session.establishSession(clientUsername.toString());
            session._pairVerifyState = undefined;
        };
        /**
         * Pair add/remove/list
         */
        _this._handlePairings = function (request, response, session, events, requestData) {
            // Only accept /pairing request if there is a secure session
            if (!_this.allowInsecureRequest && !session.authenticated) {
                response.writeHead(470, { "Content-Type": "application/hap+json" });
                response.end(JSON.stringify({ status: -70401 /* INSUFFICIENT_PRIVILEGES */ }));
                return;
            }
            var objects = tlv.decode(requestData);
            var method = objects[0 /* METHOD */][0]; // value is single byte with request type
            var state = objects[6 /* STATE */][0];
            if (state !== 1 /* M1 */) {
                return;
            }
            if (method === 3 /* ADD_PAIRING */) {
                var identifier = objects[1 /* IDENTIFIER */].toString();
                var publicKey = objects[3 /* PUBLIC_KEY */];
                var permissions = objects[11 /* PERMISSIONS */][0];
                _this.emit("add-pairing" /* ADD_PAIRING */, session, identifier, publicKey, permissions, once_1.once(function (errorCode, data) {
                    if (errorCode > 0) {
                        debug("[%s] Pairings: failed ADD_PAIRING with code %d", _this.accessoryInfo.username, errorCode);
                        response.writeHead(200, { "Content-Type": "application/pairing+tlv8" });
                        response.end(tlv.encode(6 /* STATE */, 2 /* M2 */, 7 /* ERROR_CODE */, errorCode));
                        return;
                    }
                    response.writeHead(200, { "Content-Type": "application/pairing+tlv8" });
                    response.end(tlv.encode(6 /* STATE */, 2 /* M2 */));
                    debug("[%s] Pairings: successfully executed ADD_PAIRING", _this.accessoryInfo.username);
                }));
            }
            else if (method === 4 /* REMOVE_PAIRING */) {
                var identifier = objects[1 /* IDENTIFIER */].toString();
                _this.emit("remove_pairing" /* REMOVE_PAIRING */, session, identifier, once_1.once(function (errorCode, data) {
                    if (errorCode > 0) {
                        debug("[%s] Pairings: failed REMOVE_PAIRING with code %d", _this.accessoryInfo.username, errorCode);
                        response.writeHead(200, { "Content-Type": "application/pairing+tlv8" });
                        response.end(tlv.encode(6 /* STATE */, 2 /* M2 */, 7 /* ERROR_CODE */, errorCode));
                        return;
                    }
                    response.writeHead(200, { "Content-Type": "application/pairing+tlv8" });
                    response.end(tlv.encode(6 /* STATE */, 2 /* M2 */));
                    debug("[%s] Pairings: successfully executed REMOVE_PAIRING", _this.accessoryInfo.username);
                }));
            }
            else if (method === 5 /* LIST_PAIRINGS */) {
                _this.emit("list-pairings" /* LIST_PAIRINGS */, session, once_1.once(function (errorCode, data) {
                    if (errorCode > 0) {
                        debug("[%s] Pairings: failed LIST_PAIRINGS with code %d", _this.accessoryInfo.username, errorCode);
                        response.writeHead(200, { "Content-Type": "application/pairing+tlv8" });
                        response.end(tlv.encode(6 /* STATE */, 2 /* M2 */, 7 /* ERROR_CODE */, errorCode));
                        return;
                    }
                    var tlvList = [];
                    data.forEach(function (value, index) {
                        if (index > 0) {
                            tlvList.push(255 /* SEPARATOR */, Buffer.alloc(0));
                        }
                        tlvList.push(1 /* IDENTIFIER */, value.username, 3 /* PUBLIC_KEY */, value.publicKey, 11 /* PERMISSIONS */, value.permission);
                    });
                    var list = tlv.encode.apply(tlv, __spreadArrays([6 /* STATE */, 2 /* M2 */], tlvList));
                    response.writeHead(200, { "Content-Type": "application/pairing+tlv8" });
                    response.end(list);
                    debug("[%s] Pairings: successfully executed LIST_PAIRINGS", _this.accessoryInfo.username);
                }));
            }
        };
        /*
         * Handlers for all after-pairing communication, or the bulk of HAP.
         */
        // Called when the client wishes to fetch all data regarding our published Accessories.
        _this._handleAccessories = function (request, response, session, events, requestData) {
            if (!_this.allowInsecureRequest && !session.authenticated) {
                response.writeHead(470, { "Content-Type": "application/hap+json" });
                response.end(JSON.stringify({ status: -70401 /* INSUFFICIENT_PRIVILEGES */ }));
                return;
            }
            // call out to listeners to retrieve the latest accessories JSON
            _this.emit("accessories" /* ACCESSORIES */, once_1.once(function (err, accessories) {
                if (err) {
                    debug("[%s] Error getting accessories: %s", _this.accessoryInfo.username, err.message);
                    response.writeHead(500, "Server Error");
                    response.end();
                    return;
                }
                response.writeHead(200, { "Content-Type": "application/hap+json" });
                response.end(JSON.stringify(accessories));
            }));
        };
        // Called when the client wishes to get or set particular characteristics
        _this._handleCharacteristics = function (request, response, session, events, requestData) {
            if (!_this.allowInsecureRequest && !session.authenticated) {
                response.writeHead(470, { "Content-Type": "application/hap+json" });
                response.end(JSON.stringify({ status: -70401 /* INSUFFICIENT_PRIVILEGES */ }));
                return;
            }
            if (request.method == "GET") {
                // Extract the query params from the URL which looks like: /characteristics?id=1.9,2.14,...
                var parseQueryString = true;
                var query = url_1.default.parse(request.url, parseQueryString).query; // { id: '1.9,2.14' }
                if (query == undefined || query.id == undefined) {
                    response.writeHead(500);
                    response.end();
                    return;
                }
                var sets = query.id.split(','); // ["1.9","2.14"]
                var data = []; // [{aid:1,iid:9},{aid:2,iid:14}]
                for (var i in sets) {
                    var ids = sets[i].split('.'); // ["1","9"]
                    var aid = parseInt(ids[0]); // accessory ID
                    var iid = parseInt(ids[1]); // instance ID (for characteristic)
                    data.push({ aid: aid, iid: iid });
                }
                _this.emit("get-characteristics" /* GET_CHARACTERISTICS */, data, events, once_1.once(function (err, characteristics) {
                    if (!characteristics && !err)
                        err = new Error("characteristics not supplied by the get-characteristics event callback");
                    if (err) {
                        debug("[%s] Error getting characteristics: %s", _this.accessoryInfo.username, err.stack);
                        // rewrite characteristics array to include error status for each characteristic requested
                        characteristics = [];
                        for (var i in data) {
                            characteristics.push({
                                aid: data[i].aid,
                                iid: data[i].iid,
                                status: -70402 /* SERVICE_COMMUNICATION_FAILURE */
                            });
                        }
                    }
                    var errorOccurred = false; // determine if we send a 207 Multi-Status
                    for (var i_1 = 0; i_1 < characteristics.length; i_1++) {
                        var value = characteristics[i_1];
                        if ((value.status !== undefined && value.status !== 0)
                            || (value.s !== undefined && value.s !== 0)) {
                            errorOccurred = true;
                            break;
                        }
                    }
                    if (errorOccurred) { // on a 207 Multi-Status EVERY characteristic MUST include a status property
                        for (var i_2 = 0; i_2 < characteristics.length; i_2++) {
                            var value = characteristics[i_2];
                            if (value.status === undefined) { // a status is undefined if the request was successful
                                value.status = 0; // a value of zero indicates success
                            }
                        }
                    }
                    // 207 "multi-status" is returned when an error occurs reading a characteristic. otherwise 200 is returned
                    response.writeHead(errorOccurred ? 207 : 200, { "Content-Type": "application/hap+json" });
                    response.end(JSON.stringify({ characteristics: characteristics }));
                }), false, session);
            }
            else if (request.method == "PUT") {
                if (!session.authenticated) {
                    if (!request.headers || (request.headers && request.headers["authorization"] !== _this.accessoryInfo.pincode)) {
                        response.writeHead(470, { "Content-Type": "application/hap+json" });
                        response.end(JSON.stringify({ status: -70401 /* INSUFFICIENT_PRIVILEGES */ }));
                        return;
                    }
                }
                if (requestData.length == 0) {
                    response.writeHead(400, { "Content-Type": "application/hap+json" });
                    response.end(JSON.stringify({ status: -70410 /* INVALID_VALUE_IN_REQUEST */ }));
                    return;
                }
                // requestData is a JSON payload like { characteristics: [ { aid: 1, iid: 8, value: true, ev: true } ] }
                var writeRequest = JSON.parse(requestData.toString());
                var data = writeRequest.characteristics; // pull out characteristics array
                // call out to listeners to retrieve the latest accessories JSON
                _this.emit("set-characteristics" /* SET_CHARACTERISTICS */, writeRequest, events, once_1.once(function (err, characteristics) {
                    if (err) {
                        debug("[%s] Error setting characteristics: %s", _this.accessoryInfo.username, err.message);
                        // rewrite characteristics array to include error status for each characteristic requested
                        characteristics = [];
                        for (var i in data) {
                            characteristics.push({
                                aid: data[i].aid,
                                iid: data[i].iid,
                                // @ts-ignore
                                status: -70402 /* SERVICE_COMMUNICATION_FAILURE */
                            });
                        }
                    }
                    var multiStatus = false;
                    for (var i_3 = 0; i_3 < characteristics.length; i_3++) {
                        var characteristic = characteristics[i_3];
                        if ((characteristic.status !== undefined && characteristic.status !== 0)
                            || (characteristic.s !== undefined && characteristic.s !== 0)
                            || characteristic.value !== undefined) { // also send multiStatus on write response requests
                            multiStatus = true;
                            break;
                        }
                    }
                    if (multiStatus) {
                        for (var i_4 = 0; i_4 < characteristics.length; i_4++) { // on a 207 Multi-Status EVERY characteristic MUST include a status property
                            var value = characteristics[i_4];
                            if (value.status === undefined) { // a status is undefined if the request was successful
                                value.status = 0; // a value of zero indicates success
                            }
                        }
                        // 207 is "multi-status" since HomeKit may be setting multiple things and any one can fail independently
                        response.writeHead(207, { "Content-Type": "application/hap+json" });
                        response.end(JSON.stringify({ characteristics: characteristics }));
                    }
                    else {
                        // if everything went fine send 204 no content response
                        response.writeHead(204); // 204 "No content"
                        response.end();
                    }
                }), false, session);
            }
        };
        // Called when controller requests a timed write
        _this._prepareWrite = function (request, response, session, events, requestData) {
            if (!_this.allowInsecureRequest && !session.authenticated) {
                response.writeHead(470, { "Content-Type": "application/hap+json" });
                response.end(JSON.stringify({ status: -70401 /* INSUFFICIENT_PRIVILEGES */ }));
                return;
            }
            if (request.method == "PUT") {
                if (requestData.length == 0) {
                    response.writeHead(400, { "Content-Type": "application/hap+json" });
                    response.end(JSON.stringify({ status: -70410 /* INVALID_VALUE_IN_REQUEST */ }));
                    return;
                }
                var data_1 = JSON.parse(requestData.toString());
                if (data_1.pid && data_1.ttl) {
                    debug("[%s] Received prepare write request with pid %d and ttl %d", _this.accessoryInfo.username, data_1.pid, data_1.ttl);
                    if (session.timedWriteTimeout) // clear any currently existing timeouts
                        clearTimeout(session.timedWriteTimeout);
                    session.timedWritePid = data_1.pid;
                    session.timedWriteTimeout = setTimeout(function () {
                        debug("[%s] Timed write request timed out for pid %d", _this.accessoryInfo.username, data_1.pid);
                        session.timedWritePid = undefined;
                        session.timedWriteTimeout = undefined;
                    }, data_1.ttl);
                    response.writeHead(200, { "Content-Type": "application/hap+json" });
                    response.end(JSON.stringify({ status: 0 /* SUCCESS */ }));
                    return;
                }
            }
        };
        // Called when controller request snapshot
        _this._handleResource = function (request, response, session, events, requestData) {
            if (!_this.allowInsecureRequest && !session.authenticated) {
                response.writeHead(470, { "Content-Type": "application/hap+json" });
                response.end(JSON.stringify({ status: -70401 /* INSUFFICIENT_PRIVILEGES */ }));
                return;
            }
            if (request.method == "POST") {
                if (!session.authenticated) {
                    if (!request.headers || (request.headers && request.headers["authorization"] !== _this.accessoryInfo.pincode)) {
                        response.writeHead(470, { "Content-Type": "application/hap+json" });
                        response.end(JSON.stringify({ status: -70401 /* INSUFFICIENT_PRIVILEGES */ }));
                        return;
                    }
                }
                if (requestData.length == 0) {
                    response.writeHead(400, { "Content-Type": "application/hap+json" });
                    response.end(JSON.stringify({ status: -70410 /* INVALID_VALUE_IN_REQUEST */ }));
                    return;
                }
                // requestData is a JSON payload
                var data = JSON.parse(requestData.toString());
                // call out to listeners to retrieve the resource, snapshot only right now
                _this.emit("request-resource" /* REQUEST_RESOURCE */, data, once_1.once(function (err, resource) {
                    if (err) {
                        debug("[%s] Error getting snapshot: %s", _this.accessoryInfo.username, err.message);
                        response.writeHead(404);
                        response.end();
                    }
                    else {
                        response.writeHead(200, { "Content-Type": "image/jpeg" });
                        response.end(resource);
                    }
                }));
            }
            else {
                response.writeHead(405);
                response.end();
            }
        };
        _this.accessoryInfo = accessoryInfo;
        _this.allowInsecureRequest = false;
        // internal server that does all the actual communication
        _this._httpServer = new eventedhttp_1.EventedHTTPServer();
        _this._httpServer.on("listening" /* LISTENING */, _this._onListening);
        _this._httpServer.on("request" /* REQUEST */, _this._onRequest);
        _this._httpServer.on("encrypt" /* ENCRYPT */, _this._onEncrypt);
        _this._httpServer.on("decrypt" /* DECRYPT */, _this._onDecrypt);
        _this._httpServer.on("session-close" /* SESSION_CLOSE */, _this._onSessionClose);
        // so iOS is very reluctant to actually disconnect HAP connections (as in, sending a FIN packet).
        // For instance, if you turn off wifi on your phone, it will not close the connection, instead
        // it will leave it open and hope that it's still valid when it returns to the network. And Node,
        // by itself, does not ever "discover" that the connection has been closed behind it, until a
        // potentially very long system-level socket timeout (like, days). To work around this, we have
        // invented a manual "keepalive" mechanism where we send "empty" events perodicially, such that
        // when Node attempts to write to the socket, it discovers that it's been disconnected after
        // an additional one-minute timeout (this timeout appears to be hardcoded).
        _this._keepAliveTimerID = setInterval(_this._onKeepAliveTimerTick, 1000 * 60 * 10); // send keepalive every 10 minutes
        return _this;
    }
    HAPServer.handlers = {
        '/identify': '_handleIdentify',
        '/pair-setup': '_handlePair',
        '/pair-verify': '_handlePairVerify',
        '/pairings': '_handlePairings',
        '/accessories': '_handleAccessories',
        '/characteristics': '_handleCharacteristics',
        '/prepare': '_prepareWrite',
        '/resource': '_handleResource'
    };
    return HAPServer;
}(EventEmitter_1.EventEmitter));
exports.HAPServer = HAPServer;
/**
 * Simple struct to hold vars needed to support HAP encryption.
 */
var HAPEncryption = /** @class */ (function () {
    function HAPEncryption() {
        // initialize member vars with null-object values
        this.clientPublicKey = Buffer.alloc(0);
        this.secretKey = Buffer.alloc(0);
        this.publicKey = Buffer.alloc(0);
        this.sharedSec = Buffer.alloc(0);
        this.hkdfPairEncKey = Buffer.alloc(0);
        this.accessoryToControllerCount = { value: 0 };
        this.controllerToAccessoryCount = { value: 0 };
        this.accessoryToControllerKey = Buffer.alloc(0);
        this.controllerToAccessoryKey = Buffer.alloc(0);
        this.extraInfo = {};
    }
    return HAPEncryption;
}());
exports.HAPEncryption = HAPEncryption;
//# sourceMappingURL=HAPServer.js.map