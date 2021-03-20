import { DataStreamTransportManagement } from "../gen/HomeKit-DataStream";
import { DataStreamServerEventMap, GlobalEventHandler, GlobalRequestHandler } from "./DataStreamServer";
import { Event } from "../EventEmitter";
export declare const enum DataStreamStatus {
    SUCCESS = 0,
    GENERIC_ERROR = 1,
    BUSY = 2
}
export declare class DataStreamManagement {
    private readonly dataStreamServer;
    private dataStreamTransportManagementService;
    readonly supportedDataStreamTransportConfiguration: string;
    lastSetupDataStreamTransportResponse: string;
    constructor(service?: DataStreamTransportManagement);
    /**
     * @returns the DataStreamTransportManagement service
     */
    getService(): DataStreamTransportManagement;
    /**
     * Registers a new event handler to handle incoming event messages.
     * The handler is only called for a connection if for the give protocol no ProtocolHandler
     * was registered on the connection level.
     *
     * @param protocol {string | Protocols} - name of the protocol to register the handler for
     * @param event {string | Topics} - name of the event (also referred to as topic. See {Topics} for some known ones)
     * @param handler {GlobalEventHandler} - function to be called for every occurring event
     */
    onEventMessage(protocol: string, event: string, handler: GlobalEventHandler): this;
    /**
     * Removes an registered event handler.
     *
     * @param protocol {string | Protocols} - name of the protocol to unregister the handler for
     * @param event {string | Topics} - name of the event (also referred to as topic. See {Topics} for some known ones)
     * @param handler {GlobalEventHandler} - registered event handler
     */
    removeEventHandler(protocol: string, event: string, handler: GlobalEventHandler): this;
    /**
     * Registers a new request handler to handle incoming request messages.
     * The handler is only called for a connection if for the give protocol no ProtocolHandler
     * was registered on the connection level.
     *
     * @param protocol {string | Protocols} - name of the protocol to register the handler for
     * @param request {string | Topics} - name of the request (also referred to as topic. See {Topics} for some known ones)
     * @param handler {GlobalRequestHandler} - function to be called for every occurring request
     */
    onRequestMessage(protocol: string, request: string, handler: GlobalRequestHandler): this;
    /**
     * Removes an registered request handler.
     *
     * @param protocol {string | Protocols} - name of the protocol to unregister the handler for
     * @param request {string | Topics} - name of the request (also referred to as topic. See {Topics} for some known ones)
     * @param handler {GlobalRequestHandler} - registered request handler
     */
    removeRequestHandler(protocol: string, request: string, handler: GlobalRequestHandler): this;
    /**
     * Forwards any event listener for an DataStreamServer event to the DataStreamServer instance
     *
     * @param event - the event to register for
     * @param listener - the event handler
     */
    onServerEvent(event: Event<keyof DataStreamServerEventMap>, listener: DataStreamServerEventMap[Event<keyof DataStreamServerEventMap>]): this;
    private handleSetupDataStreamTransportWrite;
    private static buildSetupStatusResponse;
    private buildSupportedDataStreamTransportConfigurationTLV;
    private constructService;
    private setupServiceHandlers;
}
//# sourceMappingURL=DataStreamManagement.d.ts.map