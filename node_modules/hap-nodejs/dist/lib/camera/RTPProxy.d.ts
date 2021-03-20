/// <reference types="node" />
import { Socket, SocketType } from "dgram";
declare const EventEmitter: any;
export interface RTPProxyOptions {
    disabled: boolean;
    isIPV6?: boolean;
    outgoingAddress: string;
    outgoingPort: number;
    outgoingSSRC: number;
}
/**
 * RTPProxy to proxy unencrypted RTP and RTCP
 *
 * At early days of HomeKit camera support, HomeKit allowed for unencrypted RTP stream.
 * The proxy was created to deal with RTCP and SSRC related stuff from external streams back in that days.
 * Later HomeKit removed support for unencrypted stream so it’s mostly no longer useful anymore, only really for testing
 * with a custom HAP controller.
 */
export default class RTPProxy extends EventEmitter {
    options: RTPProxyOptions;
    startingPort: number;
    type: SocketType;
    outgoingAddress: string;
    outgoingPort: number;
    incomingPayloadType: number;
    outgoingSSRC: number;
    incomingSSRC: number | null;
    outgoingPayloadType: number | null;
    disabled: boolean;
    incomingRTPSocket: Socket;
    incomingRTCPSocket: Socket;
    outgoingSocket: Socket;
    serverAddress?: string;
    serverRTPPort?: number;
    serverRTCPPort?: number;
    constructor(options: RTPProxyOptions);
    setup: () => Promise<void>;
    destroy: () => void;
    incomingRTPPort: () => number | undefined;
    incomingRTCPPort: () => number | undefined;
    outgoingLocalPort: () => number;
    setServerAddress: (address: string) => void;
    setServerRTPPort: (port: number) => void;
    setServerRTCPPort: (port: number) => void;
    setIncomingPayloadType: (pt: number) => void;
    setOutgoingPayloadType: (pt: number) => void;
    sendOut: (msg: Buffer) => void;
    sendBack: (msg: Buffer) => void;
    onBound: () => void;
    rtpMessage: (msg: Buffer) => void;
    processRTCPMessage: (msg: Buffer, transform: (pt: number, packet: Buffer) => Buffer) => Buffer | null;
    rtcpMessage: (msg: Buffer) => void;
    rtcpReply: (msg: Buffer) => void;
    createSocket: (type: SocketType) => Promise<Socket>;
    createSocketPair: (type: SocketType) => Promise<Socket[]>;
}
export {};
//# sourceMappingURL=RTPProxy.d.ts.map