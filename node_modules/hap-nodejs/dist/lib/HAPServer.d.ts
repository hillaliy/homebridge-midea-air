/// <reference types="node" />
import { EventedHTTPServer, Session } from './util/eventedhttp';
import { IncomingMessage, ServerResponse } from "http";
import { Accessory, CharacteristicEvents, Resource } from './Accessory';
import { CharacteristicData, NodeCallback, PairingsCallback, SessionIdentifier, VoidCallback } from '../types';
import { EventEmitter } from './EventEmitter';
import { PairingInformation } from "./model/AccessoryInfo";
export declare const enum Codes {
    UNKNOWN = 1,
    INVALID_REQUEST = 2,
    AUTHENTICATION = 2,
    BACKOFF = 3,
    MAX_PEERS = 4,
    MAX_TRIES = 5,
    UNAVAILABLE = 6,
    BUSY = 7
}
export declare const enum Status {
    SUCCESS = 0,
    INSUFFICIENT_PRIVILEGES = -70401,
    SERVICE_COMMUNICATION_FAILURE = -70402,
    RESOURCE_BUSY = -70403,
    READ_ONLY_CHARACTERISTIC = -70404,
    WRITE_ONLY_CHARACTERISTIC = -70405,
    NOTIFICATION_NOT_SUPPORTED = -70406,
    OUT_OF_RESOURCE = -70407,
    OPERATION_TIMED_OUT = -70408,
    RESOURCE_DOES_NOT_EXIST = -70409,
    INVALID_VALUE_IN_REQUEST = -70410,
    INSUFFICIENT_AUTHORIZATION = -70411
}
export declare type CharacteristicsWriteRequest = {
    characteristics: CharacteristicData[];
    pid?: number;
};
export declare type PrepareWriteRequest = {
    ttl: number;
    pid: number;
};
export declare const enum HAPServerEventTypes {
    IDENTIFY = "identify",
    LISTENING = "listening",
    PAIR = "pair",
    ADD_PAIRING = "add-pairing",
    REMOVE_PAIRING = "remove_pairing",
    LIST_PAIRINGS = "list-pairings",
    ACCESSORIES = "accessories",
    GET_CHARACTERISTICS = "get-characteristics",
    SET_CHARACTERISTICS = "set-characteristics",
    SESSION_CLOSE = "session-close",
    REQUEST_RESOURCE = "request-resource"
}
export declare type Events = {
    [HAPServerEventTypes.IDENTIFY]: (cb: VoidCallback) => void;
    [HAPServerEventTypes.LISTENING]: (port: number) => void;
    [HAPServerEventTypes.PAIR]: (clientUsername: string, clientLTPK: Buffer, cb: VoidCallback) => void;
    [HAPServerEventTypes.ADD_PAIRING]: (controller: Session, username: string, publicKey: Buffer, permission: number, callback: PairingsCallback<void>) => void;
    [HAPServerEventTypes.REMOVE_PAIRING]: (controller: Session, username: string, callback: PairingsCallback<void>) => void;
    [HAPServerEventTypes.LIST_PAIRINGS]: (controller: Session, callback: PairingsCallback<PairingInformation[]>) => void;
    [HAPServerEventTypes.ACCESSORIES]: (cb: NodeCallback<Accessory[]>) => void;
    [HAPServerEventTypes.GET_CHARACTERISTICS]: (data: CharacteristicData[], events: CharacteristicEvents, cb: NodeCallback<CharacteristicData[]>, remote: boolean, session: Session) => void;
    [HAPServerEventTypes.SET_CHARACTERISTICS]: (writeRequest: CharacteristicsWriteRequest, events: CharacteristicEvents, cb: NodeCallback<CharacteristicData[]>, remote: boolean, session: Session) => void;
    [HAPServerEventTypes.SESSION_CLOSE]: (sessionID: SessionIdentifier, events: CharacteristicEvents) => void;
    [HAPServerEventTypes.REQUEST_RESOURCE]: (data: Resource, cb: NodeCallback<Buffer>) => void;
};
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
export declare class HAPServer extends EventEmitter<Events> {
    accessoryInfo: any;
    static handlers: Record<string, string>;
    _httpServer: EventedHTTPServer;
    private unsuccessfulPairAttempts;
    allowInsecureRequest: boolean;
    _keepAliveTimerID: NodeJS.Timeout;
    constructor(accessoryInfo: any);
    listen: (port: number) => void;
    stop: () => void;
    _onKeepAliveTimerTick: () => void;
    /**
     * Notifies connected clients who have subscribed to a particular event.
     *
     * @param event {string} - the name of the event (only clients who have subscribed to this name will be notified)
     * @param data {object} - the object containing the event data; will be JSON.stringify'd automatically
     */
    notifyClients: (event: string, data: any, excludeEvents?: Record<string, boolean> | undefined) => void;
    _onListening: (port: number) => void;
    _onRequest: (request: IncomingMessage, response: ServerResponse, session: Session, events: any) => void;
    _onEncrypt: (data: Buffer, encrypted: {
        data: Buffer;
    }, session: Session) => void;
    _onDecrypt: (data: Buffer, decrypted: {
        data: number | Buffer;
        error: Error | null;
    }, session: Session) => void;
    _onSessionClose: (sessionID: SessionIdentifier, events: any) => void;
    /**
     * Unpaired Accessory identification.
     */
    _handleIdentify: (request: IncomingMessage, response: ServerResponse, session: Session, events: any, requestData: any) => void;
    /**
     * iOS <-> Accessory pairing process.
     */
    _handlePair: (request: IncomingMessage, response: ServerResponse, session: Session, events: any, requestData: Buffer) => void;
    _handlePairStepOne: (request: IncomingMessage, response: ServerResponse, session: Session) => void;
    _handlePairStepTwo: (request: IncomingMessage, response: ServerResponse, session: Session, objects: Record<number, Buffer>) => void;
    _handlePairStepThree: (request: IncomingMessage, response: ServerResponse, session: Session, objects: Record<number, Buffer>) => void;
    _handlePairStepFour: (request: IncomingMessage, response: ServerResponse, session: Session, clientUsername: Buffer, clientLTPK: Buffer, clientProof: Buffer, hkdfEncKey: Buffer) => void;
    _handlePairStepFive: (request: IncomingMessage, response: ServerResponse, session: Session, clientUsername: Buffer, clientLTPK: Buffer, hkdfEncKey: Buffer) => void;
    /**
     * iOS <-> Accessory pairing verification.
     */
    _handlePairVerify: (request: IncomingMessage, response: ServerResponse, session: Session, events: any, requestData: Buffer) => void;
    _handlePairVerifyStepOne: (request: IncomingMessage, response: ServerResponse, session: Session, objects: Record<number, Buffer>) => void;
    _handlePairVerifyStepTwo: (request: IncomingMessage, response: ServerResponse, session: Session, events: any, objects: Record<number, Buffer>) => void;
    /**
     * Pair add/remove/list
     */
    _handlePairings: (request: IncomingMessage, response: ServerResponse, session: Session, events: any, requestData: Buffer) => void;
    _handleAccessories: (request: IncomingMessage, response: ServerResponse, session: Session, events: any, requestData: any) => void;
    _handleCharacteristics: (request: IncomingMessage, response: ServerResponse, session: Session, events: any, requestData: {
        length: number;
        toString: () => string;
    }) => void;
    _prepareWrite: (request: IncomingMessage, response: ServerResponse, session: Session, events: any, requestData: {
        length: number;
        toString: () => string;
    }) => void;
    _handleResource: (request: IncomingMessage, response: ServerResponse, session: Session, events: any, requestData: {
        length: number;
        toString: () => string;
    }) => void;
}
/**
 * Simple struct to hold vars needed to support HAP encryption.
 */
export declare class HAPEncryption {
    clientPublicKey: Buffer;
    secretKey: Buffer;
    publicKey: Buffer;
    sharedSec: Buffer;
    hkdfPairEncKey: Buffer;
    accessoryToControllerCount: {
        value: number;
    };
    controllerToAccessoryCount: {
        value: number;
    };
    accessoryToControllerKey: Buffer;
    controllerToAccessoryKey: Buffer;
    extraInfo: Record<string, any>;
    constructor();
}
//# sourceMappingURL=HAPServer.d.ts.map