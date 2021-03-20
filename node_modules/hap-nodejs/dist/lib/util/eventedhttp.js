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
exports.Session = exports.HAPSessionEvents = exports.EventedHTTPServer = exports.EventedHTTPServerEvents = void 0;
var debug_1 = __importDefault(require("debug"));
var http_1 = __importDefault(require("http"));
var net_1 = __importDefault(require("net"));
var os_1 = __importDefault(require("os"));
var EventEmitter_1 = require("../EventEmitter");
var uuid = __importStar(require("./uuid"));
var debug = debug_1.default('HAP-NodeJS:EventedHTTPServer');
var EventedHTTPServerEvents;
(function (EventedHTTPServerEvents) {
    EventedHTTPServerEvents["LISTENING"] = "listening";
    EventedHTTPServerEvents["REQUEST"] = "request";
    EventedHTTPServerEvents["DECRYPT"] = "decrypt";
    EventedHTTPServerEvents["ENCRYPT"] = "encrypt";
    EventedHTTPServerEvents["CLOSE"] = "close";
    EventedHTTPServerEvents["SESSION_CLOSE"] = "session-close";
})(EventedHTTPServerEvents = exports.EventedHTTPServerEvents || (exports.EventedHTTPServerEvents = {}));
/**
 * EventedHTTPServer provides an HTTP-like server that supports HAP "extensions" for security and events.
 *
 * Implementation
 * --------------
 * In order to implement the "custom HTTP" server required by the HAP protocol (see HAPServer.js) without completely
 * reinventing the wheel, we create both a generic TCP socket server as well as a standard Node HTTP server.
 * The TCP socket server acts as a proxy, allowing users of this class to transform data (for encryption) as necessary
 * and passing through bytes directly to the HTTP server for processing. This way we get Node to do all
 * the "heavy lifting" of HTTP like parsing headers and formatting responses.
 *
 * Events are sent by simply waiting for current HTTP traffic to subside and then sending a custom response packet
 * directly down the wire via the socket.
 *
 * Each connection to the main TCP server gets its own internal HTTP server, so we can track ongoing requests/responses
 * for safe event insertion.
 *
 * @event 'listening' => function() { }
 *        Emitted when the server is fully set up and ready to receive connections.
 *
 * @event 'request' => function(request, response, session, events) { }
 *        Just like the 'http' module, request is http.IncomingMessage and response is http.ServerResponse.
 *        The 'session' param is an arbitrary object that you can use to store data associated with this connection;
 *        it will not be used by this class. The 'events' param is an object where the keys are the names of
 *        events that this connection has signed up for. It is initially empty and listeners are expected to manage it.
 *
 * @event 'decrypt' => function(data, {decrypted.data}, session) { }
 *        Fired when we receive data from the client device. You may detemine whether the data is encrypted, and if
 *        so, you can decrypt the data and store it into a new 'data' property of the 'decrypted' argument. If data is not
 *        encrypted, you can simply leave 'data' as null and the original data will be passed through as-is.
 *
 * @event 'encrypt' => function(data, {encrypted.data}, session) { }
 *        Fired when we wish to send data to the client device. If necessary, set the 'data' property of the
 *        'encrypted' argument to be the encrypted data and it will be sent instead.
 */
var EventedHTTPServer = /** @class */ (function (_super) {
    __extends(EventedHTTPServer, _super);
    function EventedHTTPServer() {
        var _this = _super.call(this) || this;
        /**
         * Session dictionary indexed by username/identifier. The username uniquely identifies every person added to the home.
         * So there can be multiple sessions open for a single username (multiple devices connected to the same Apple ID).
         */
        _this.sessions = {};
        _this.listen = function (targetPort) {
            _this._tcpServer.listen(targetPort);
            _this._tcpServer.on('listening', function () {
                var address = _this._tcpServer.address();
                if (address && typeof address !== 'string') {
                    var port = address.port;
                    debug("Server listening on port %s", port);
                    _this.emit("listening" /* LISTENING */, port);
                }
            });
            _this._tcpServer.on('connection', _this._onConnection);
        };
        _this.stop = function () {
            _this._tcpServer.close();
            _this._connections.forEach(function (connection) {
                connection.close();
            });
            _this._connections = [];
        };
        _this.sendEvent = function (event, data, contentType, exclude) {
            for (var _i = 0, _a = _this._connections; _i < _a.length; _i++) {
                var connection = _a[_i];
                connection.sendEvent(event, data, contentType, exclude);
            }
        };
        // Called by net.Server when a new client connects. We will set up a new EventedHTTPServerConnection to manage the
        // lifetime of this connection.
        _this._onConnection = function (socket) {
            var connection = new EventedHTTPServerConnection(_this, socket);
            // pass on session events to our listeners directly
            connection.on("request" /* REQUEST */, function (request, response, session, events) { _this.emit("request" /* REQUEST */, request, response, session, events); });
            connection.on("encrypt" /* ENCRYPT */, function (data, encrypted, session) { _this.emit("encrypt" /* ENCRYPT */, data, encrypted, session); });
            connection.on("decrypt" /* DECRYPT */, function (data, decrypted, session) { _this.emit("decrypt" /* DECRYPT */, data, decrypted, session); });
            connection.on("close" /* CLOSE */, function (events) { _this._handleConnectionClose(connection, events); });
            _this._connections.push(connection);
        };
        _this._handleConnectionClose = function (connection, events) {
            _this.emit("session-close" /* SESSION_CLOSE */, connection.sessionID, events);
            // remove it from our array of connections for events
            _this._connections.splice(_this._connections.indexOf(connection), 1);
        };
        _this._tcpServer = net_1.default.createServer();
        _this._connections = []; // track all open connections (for sending events)
        return _this;
    }
    return EventedHTTPServer;
}(EventEmitter_1.EventEmitter));
exports.EventedHTTPServer = EventedHTTPServer;
var HAPSessionEvents;
(function (HAPSessionEvents) {
    HAPSessionEvents["CLOSED"] = "closed";
})(HAPSessionEvents = exports.HAPSessionEvents || (exports.HAPSessionEvents = {}));
var Session = /** @class */ (function (_super) {
    __extends(Session, _super);
    function Session(connection) {
        var _this = _super.call(this) || this;
        _this.authenticated = false;
        /**
         * establishSession gets called after a pair verify.
         * establishSession does not get called after the first pairing gets added, as any HomeKit controller will initiate a
         * pair verify after the pair setup procedure.
         */
        _this.establishSession = function (username) {
            _this.authenticated = true;
            _this.username = username;
            var sessions = _this._server.sessions[username];
            if (!sessions) {
                sessions = [];
                _this._server.sessions[username] = sessions;
            }
            if (sessions.includes(_this)) {
                return; // ensure this doesn't get added more than one time
            }
            sessions.push(_this);
        };
        // called when socket of this session is destroyed
        _this._connectionDestroyed = function () {
            delete Session.sessionsBySessionID[_this.sessionID];
            if (_this.username) {
                var sessions = _this._server.sessions[_this.username];
                if (sessions) {
                    var index = sessions.indexOf(_this);
                    if (index >= 0) {
                        sessions[index].authenticated = false;
                        sessions.splice(index, 1);
                    }
                    if (!sessions.length)
                        delete _this._server.sessions[_this.username];
                }
            }
            _this.emit("closed" /* CLOSED */);
        };
        _this._server = connection.server;
        _this._connection = connection;
        _this.sessionID = connection.sessionID;
        Session.sessionsBySessionID[_this.sessionID] = _this;
        return _this;
    }
    Session.prototype.getLocalAddress = function (ipVersion) {
        var infos = os_1.default.networkInterfaces()[this._connection.networkInterface];
        if (ipVersion === "ipv4") {
            for (var _i = 0, infos_1 = infos; _i < infos_1.length; _i++) {
                var info = infos_1[_i];
                if (info.family === "IPv4") {
                    return info.address;
                }
            }
            throw new Error("Could not find " + ipVersion + " address for interface " + this._connection.networkInterface);
        }
        else {
            var localUniqueAddress = undefined;
            for (var _a = 0, infos_2 = infos; _a < infos_2.length; _a++) {
                var info = infos_2[_a];
                if (info.family === "IPv6") {
                    if (!info.scopeid) {
                        return info.address;
                    }
                    else if (!localUniqueAddress) {
                        localUniqueAddress = info.address;
                    }
                }
            }
            if (!localUniqueAddress) {
                throw new Error("Could not find " + ipVersion + " address for interface " + this._connection.networkInterface);
            }
            return localUniqueAddress;
        }
    };
    Session.getSession = function (sessionID) {
        return this.sessionsBySessionID[sessionID];
    };
    /*
      Session dictionary indexed by sessionID. SessionID is a custom generated id by HAP-NodeJS unique to every open connection.
      SessionID gets passed to get/set handlers for characteristics. We mainly need this dictionary in order
      to access the sharedSecret in the HAPEncryption object from the SetupDataStreamTransport characteristic set handler.
     */
    Session.sessionsBySessionID = {};
    Session.destroyExistingConnectionsAfterUnpair = function (initiator, username) {
        var sessions = initiator._server.sessions[username];
        if (sessions) {
            sessions.forEach(function (session) {
                session.authenticated = false;
                if (initiator.sessionID === session.sessionID) {
                    // the session which initiated the unpair removed it's own username, wait until the unpair request is finished
                    // until we kill his connection
                    session._connection._killSocketAfterWrite = true;
                }
                else {
                    // as HomeKit requires it, destroy any active session which got unpaired
                    session._connection._clientSocket.destroy();
                }
            });
        }
    };
    return Session;
}(EventEmitter_1.EventEmitter));
exports.Session = Session;
/**
 * Manages a single iOS-initiated HTTP connection during its lifetime.
 *
 * @event 'request' => function(request, response) { }
 * @event 'decrypt' => function(data, {decrypted.data}, session) { }
 * @event 'encrypt' => function(data, {encrypted.data}, session) { }
 * @event 'close' => function() { }
 */
var EventedHTTPServerConnection = /** @class */ (function (_super) {
    __extends(EventedHTTPServerConnection, _super);
    function EventedHTTPServerConnection(server, clientSocket) {
        var _this = _super.call(this) || this;
        _this.sendEvent = function (event, data, contentType, excludeEvents) {
            // has this connection subscribed to the given event? if not, nothing to do!
            if (!_this._events[event]) {
                return;
            }
            // does this connection's 'events' object match the excludeEvents object? if so, don't send the event.
            if (excludeEvents === _this._events) {
                debug("[%s] Muting event '%s' notification for this connection since it originated here.", _this._remoteAddress, event);
                return;
            }
            debug("[%s] Sending HTTP event '%s' with data: %s", _this._remoteAddress, event, data.toString('utf8'));
            // ensure data is a Buffer
            if (typeof data === 'string') {
                data = Buffer.from(data);
            }
            // format this payload as an HTTP response
            var linebreak = Buffer.from("0D0A", "hex");
            data = Buffer.concat([
                Buffer.from('EVENT/1.0 200 OK'), linebreak,
                Buffer.from('Content-Type: ' + contentType), linebreak,
                Buffer.from('Content-Length: ' + data.length), linebreak,
                linebreak,
                data
            ]);
            // if we're in the middle of writing an HTTP response already, put this event in the queue for when
            // we're done. otherwise send it immediately.
            if (_this._writingResponse) {
                _this._pendingEventData.push(data);
            }
            else {
                // give listeners an opportunity to encrypt this data before sending it to the client
                var encrypted = { data: null };
                _this.emit("encrypt" /* ENCRYPT */, data, encrypted, _this._session);
                if (encrypted.data) {
                    // @ts-ignore
                    data = encrypted.data;
                }
                _this._clientSocket.write(data);
            }
        };
        _this.close = function () {
            _this._clientSocket.end();
        };
        _this._sendPendingEvents = function () {
            if (_this._pendingEventData.length === 0) {
                return;
            }
            // an existing HTTP response was finished, so let's flush our pending event buffer if necessary!
            debug("[%s] Writing pending HTTP event data", _this._remoteAddress);
            _this._pendingEventData.forEach(function (event) {
                var encrypted = { data: null };
                _this.emit("encrypt" /* ENCRYPT */, event, encrypted, _this._session);
                if (encrypted.data) {
                    // @ts-ignore
                    event = encrypted.data;
                }
                _this._clientSocket.write(event);
            });
            // clear the queue
            _this._pendingEventData = [];
        };
        // Called only once right after constructor finishes
        _this._onHttpServerListening = function () {
            _this._httpPort = _this._httpServer.address().port;
            debug("[%s] HTTP server listening on port %s", _this._remoteAddress, _this._httpPort);
            // closes before this are due to retrying listening, which don't need to be handled
            _this._httpServer.on('close', _this._onHttpServerClose);
            // now we can establish a connection to this running HTTP server for proxying data
            _this._serverSocket = net_1.default.createConnection(_this._httpPort);
            _this._serverSocket.on('connect', _this._onServerSocketConnect);
            _this._serverSocket.on('data', _this._onServerSocketData);
            _this._serverSocket.on('close', _this._onServerSocketClose);
            _this._serverSocket.on('error', _this._onServerSocketError); // we MUST register for this event, otherwise the error will bubble up to the top and crash the node process entirely.
        };
        // Called only once right after onHttpServerListening
        _this._onServerSocketConnect = function () {
            // we are now fully set up:
            //  - clientSocket is connected to the iOS device
            //  - serverSocket is connected to the httpServer
            //  - ready to proxy data!
            _this._fullySetup = true;
            // start by flushing any pending buffered data received from the client while we were setting up
            if (_this._pendingClientSocketData && _this._pendingClientSocketData.length > 0) {
                _this._serverSocket && _this._serverSocket.write(_this._pendingClientSocketData);
                _this._pendingClientSocketData = null;
            }
        };
        // Received data from client (iOS)
        _this._onClientSocketData = function (data) {
            // _writingResponse is reverted to false in _onHttpServerRequest(...) after response was written
            _this._writingResponse = true;
            // give listeners an opportunity to decrypt this data before processing it as HTTP
            var decrypted = { data: null, error: null };
            _this.emit("decrypt" /* DECRYPT */, data, decrypted, _this._session);
            if (decrypted.error) {
                // decryption and/or verification failed, disconnect the client
                debug("[%s] Error occurred trying to decrypt incoming packet: %s", _this._remoteAddress, decrypted.error.message);
                _this.close();
            }
            else {
                if (decrypted.data) {
                    data = decrypted.data;
                }
                if (_this._fullySetup) {
                    // proxy it along to the HTTP server
                    _this._serverSocket && _this._serverSocket.write(data);
                }
                else {
                    // we're not setup yet, so add this data to our buffer
                    _this._pendingClientSocketData = Buffer.concat([_this._pendingClientSocketData, data]);
                }
            }
        };
        // Received data from HTTP Server
        _this._onServerSocketData = function (data) {
            // give listeners an opportunity to encrypt this data before sending it to the client
            var encrypted = { data: null };
            _this.emit("encrypt" /* ENCRYPT */, data, encrypted, _this._session);
            if (encrypted.data)
                data = encrypted.data;
            // proxy it along to the client (iOS)
            _this._clientSocket.write(data);
            if (_this._killSocketAfterWrite) {
                setTimeout(function () {
                    _this._clientSocket.destroy();
                }, 10);
            }
        };
        // Our internal HTTP Server has been closed (happens after we call this._httpServer.close() below)
        _this._onServerSocketClose = function () {
            debug("[%s] HTTP connection was closed", _this._remoteAddress);
            // make sure the iOS side is closed as well
            _this._clientSocket.destroy();
            // we only support a single long-lived connection to our internal HTTP server. Since it's closed,
            // we'll need to shut it down entirely.
            _this._httpServer.close();
        };
        // Our internal HTTP Server has been closed (happens after we call this._httpServer.close() below)
        _this._onServerSocketError = function (err) {
            debug("[%s] HTTP connection error: ", _this._remoteAddress, err.message);
            // _onServerSocketClose will be called next
        };
        _this._onHttpServerRequest = function (request, response) {
            debug("[%s] HTTP request: %s", _this._remoteAddress, request.url);
            // sign up to know when the response is ended, so we can safely send EVENT responses
            response.on('finish', function () {
                debug("[%s] HTTP Response is finished", _this._remoteAddress);
                _this._writingResponse = false;
                _this._sendPendingEvents();
            });
            // pass it along to listeners
            _this.emit("request" /* REQUEST */, request, response, _this._session, _this._events);
        };
        _this._onHttpServerClose = function () {
            debug("[%s] HTTP server was closed", _this._remoteAddress);
            // notify listeners that we are completely closed
            _this.emit("close" /* CLOSE */, _this._events);
        };
        _this._onHttpServerError = function (err) {
            debug("[%s] HTTP server error: %s", _this._remoteAddress, err.message);
            if (err.code === 'EADDRINUSE') {
                _this._httpServer.close();
                _this._httpServer.listen(0);
            }
        };
        _this._onClientSocketClose = function () {
            debug("[%s] Client connection closed", _this._remoteAddress);
            // shutdown the other side
            _this._serverSocket && _this._serverSocket.destroy();
            _this._session._connectionDestroyed();
        };
        _this._onClientSocketError = function (err) {
            debug("[%s] Client connection error: %s", _this._remoteAddress, err.message);
            // _onClientSocketClose will be called next
        };
        _this.server = server;
        _this.sessionID = uuid.generate(clientSocket.remoteAddress + ':' + clientSocket.remotePort);
        _this._remoteAddress = clientSocket.remoteAddress; // cache because it becomes undefined in 'onClientSocketClose'
        _this.networkInterface = EventedHTTPServerConnection.getLocalNetworkInterface(clientSocket);
        _this._pendingClientSocketData = Buffer.alloc(0); // data received from client before HTTP proxy is fully setup
        _this._fullySetup = false; // true when we are finished establishing connections
        _this._writingResponse = false; // true while we are composing an HTTP response (so events can wait)
        _this._killSocketAfterWrite = false;
        _this._pendingEventData = []; // queue of unencrypted event data waiting to be sent until after an in-progress HTTP response is being written
        // clientSocket is the socket connected to the actual iOS device
        _this._clientSocket = clientSocket;
        _this._clientSocket.on('data', _this._onClientSocketData);
        _this._clientSocket.on('close', _this._onClientSocketClose);
        _this._clientSocket.on('error', _this._onClientSocketError); // we MUST register for this event, otherwise the error will bubble up to the top and crash the node process entirely.
        // serverSocket is our connection to our own internal httpServer
        _this._serverSocket = null; // created after httpServer 'listening' event
        // create our internal HTTP server for this connection that we will proxy data to and from
        _this._httpServer = http_1.default.createServer();
        _this._httpServer.timeout = 0; // clients expect to hold connections open as long as they want
        _this._httpServer.keepAliveTimeout = 0; // workaround for https://github.com/nodejs/node/issues/13391
        _this._httpServer.on('listening', _this._onHttpServerListening);
        _this._httpServer.on('request', _this._onHttpServerRequest);
        _this._httpServer.on('error', _this._onHttpServerError);
        _this._httpServer.listen(0);
        // an arbitrary dict that users of this class can store values in to associate with this particular connection
        _this._session = new Session(_this);
        // a collection of event names subscribed to by this connection
        _this._events = {}; // this._events[eventName] = true (value is arbitrary, but must be truthy)
        debug("[%s] New connection from client at interface %s", _this._remoteAddress, _this.networkInterface);
        return _this;
    }
    EventedHTTPServerConnection.getLocalNetworkInterface = function (socket) {
        var localAddress = socket.localAddress;
        if (localAddress.startsWith("::ffff:")) { // IPv4-Mapped IPv6 Address https://tools.ietf.org/html/rfc4291#section-2.5.5.2
            localAddress = localAddress.substring(7);
        }
        else {
            var index = localAddress.indexOf("%");
            if (index !== -1) { // link-local ipv6
                localAddress = localAddress.substring(0, index);
            }
        }
        var interfaces = os_1.default.networkInterfaces();
        for (var _i = 0, _a = Object.entries(interfaces); _i < _a.length; _i++) {
            var _b = _a[_i], name = _b[0], infos = _b[1];
            for (var _c = 0, infos_3 = infos; _c < infos_3.length; _c++) {
                var info = infos_3[_c];
                if (info.address === localAddress) {
                    return name;
                }
            }
        }
        console.log("WARNING couldn't map socket coming from " + socket.remoteAddress + ":" + socket.remotePort + " at local address " + socket.localAddress + " to a interface!");
        return Object.keys(interfaces)[1]; // just use the first interface after the loopback interface as fallback
    };
    return EventedHTTPServerConnection;
}(EventEmitter_1.EventEmitter));
//# sourceMappingURL=eventedhttp.js.map