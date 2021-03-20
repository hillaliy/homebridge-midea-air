/// <reference types="node" />
import { SrpServer } from "fast-srp-hap";
import http, { IncomingMessage, OutgoingMessage, ServerResponse } from 'http';
import net, { Socket } from 'net';
import { Nullable, SessionIdentifier } from '../../types';
import { EventEmitter } from '../EventEmitter';
import { HAPEncryption } from '../HAPServer';
export declare const enum EventedHTTPServerEvents {
    LISTENING = "listening",
    REQUEST = "request",
    DECRYPT = "decrypt",
    ENCRYPT = "encrypt",
    CLOSE = "close",
    SESSION_CLOSE = "session-close"
}
export declare type Events = {
    [EventedHTTPServerEvents.LISTENING]: (port: number) => void;
    [EventedHTTPServerEvents.REQUEST]: (request: IncomingMessage, response: ServerResponse, session: Session, events: any) => void;
    [EventedHTTPServerEvents.DECRYPT]: (data: Buffer, decrypted: {
        data: Buffer;
        error: Error | null;
    }, session: Session) => void;
    [EventedHTTPServerEvents.ENCRYPT]: (data: Buffer, encrypted: {
        data: number | Buffer;
    }, session: Session) => void;
    [EventedHTTPServerEvents.CLOSE]: (events: any) => void;
    [EventedHTTPServerEvents.SESSION_CLOSE]: (sessionID: SessionIdentifier, events: any) => void;
};
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
export declare class EventedHTTPServer extends EventEmitter<Events> {
    _tcpServer: net.Server;
    _connections: EventedHTTPServerConnection[];
    /**
     * Session dictionary indexed by username/identifier. The username uniquely identifies every person added to the home.
     * So there can be multiple sessions open for a single username (multiple devices connected to the same Apple ID).
     */
    sessions: Record<string, Session[]>;
    constructor();
    listen: (targetPort: number) => void;
    stop: () => void;
    sendEvent: (event: string, data: Buffer | string, contentType: string, exclude?: Record<string, boolean> | undefined) => void;
    _onConnection: (socket: Socket) => void;
    _handleConnectionClose: (connection: EventedHTTPServerConnection, events: Record<string, boolean>) => void;
}
export declare const enum HAPSessionEvents {
    CLOSED = "closed"
}
export declare type HAPSessionEventMap = {
    [HAPSessionEvents.CLOSED]: () => void;
};
export declare class Session extends EventEmitter<HAPSessionEventMap> {
    readonly _server: EventedHTTPServer;
    readonly _connection: EventedHTTPServerConnection;
    private static sessionsBySessionID;
    sessionID: SessionIdentifier;
    _pairSetupState?: number;
    srpServer?: SrpServer;
    _pairVerifyState?: number;
    encryption?: HAPEncryption;
    authenticated: boolean;
    username?: string;
    timedWritePid?: number;
    timedWriteTimeout?: NodeJS.Timeout;
    constructor(connection: EventedHTTPServerConnection);
    getLocalAddress(ipVersion: "ipv4" | "ipv6"): string;
    /**
     * establishSession gets called after a pair verify.
     * establishSession does not get called after the first pairing gets added, as any HomeKit controller will initiate a
     * pair verify after the pair setup procedure.
     */
    establishSession: (username: string) => void;
    _connectionDestroyed: () => void;
    static destroyExistingConnectionsAfterUnpair: (initiator: Session, username: string) => void;
    static getSession(sessionID: SessionIdentifier): Session;
}
/**
 * Manages a single iOS-initiated HTTP connection during its lifetime.
 *
 * @event 'request' => function(request, response) { }
 * @event 'decrypt' => function(data, {decrypted.data}, session) { }
 * @event 'encrypt' => function(data, {encrypted.data}, session) { }
 * @event 'close' => function() { }
 */
declare class EventedHTTPServerConnection extends EventEmitter<Events> {
    readonly server: EventedHTTPServer;
    readonly sessionID: SessionIdentifier;
    readonly _remoteAddress: string;
    readonly networkInterface: string;
    _pendingClientSocketData: Nullable<Buffer>;
    _fullySetup: boolean;
    _writingResponse: boolean;
    _killSocketAfterWrite: boolean;
    _pendingEventData: Buffer[];
    _clientSocket: Socket;
    _httpServer: http.Server;
    _serverSocket: Nullable<Socket>;
    _session: Session;
    _events: Record<string, boolean>;
    _httpPort?: number;
    constructor(server: EventedHTTPServer, clientSocket: Socket);
    sendEvent: (event: string, data: Buffer | string, contentType: string, excludeEvents?: Record<string, boolean> | undefined) => void;
    close: () => void;
    _sendPendingEvents: () => void;
    _onHttpServerListening: () => void;
    _onServerSocketConnect: () => void;
    _onClientSocketData: (data: Buffer) => void;
    _onServerSocketData: (data: Buffer | string) => void;
    _onServerSocketClose: () => void;
    _onServerSocketError: (err: Error) => void;
    _onHttpServerRequest: (request: IncomingMessage, response: OutgoingMessage) => void;
    _onHttpServerClose: () => void;
    _onHttpServerError: (err: Error & {
        code?: string;
    }) => void;
    _onClientSocketClose: () => void;
    _onClientSocketError: (err: Error) => void;
    private static getLocalNetworkInterface;
}
export {};
//# sourceMappingURL=eventedhttp.d.ts.map