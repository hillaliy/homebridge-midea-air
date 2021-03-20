/// <reference types="node" />
import { Accessory } from "../Accessory";
import { DataSendCloseReason, DataStreamConnection, DataStreamManagement, DataStreamProtocolHandler, EventHandler, RequestHandler } from "../datastream";
import { EventEmitter } from "../EventEmitter";
import { ControllerServiceMap, DefaultControllerType, SerializableController, StateChangeDelegate } from "./Controller";
import { AudioStreamManagement, Siri, TargetControl, TargetControlManagement } from "../gen/HomeKit-Remote";
import { DataStreamTransportManagement } from "../gen/HomeKit-DataStream";
export declare const enum ButtonType {
    UNDEFINED = 0,
    MENU = 1,
    PLAY_PAUSE = 2,
    TV_HOME = 3,
    SELECT = 4,
    ARROW_UP = 5,
    ARROW_RIGHT = 6,
    ARROW_DOWN = 7,
    ARROW_LEFT = 8,
    VOLUME_UP = 9,
    VOLUME_DOWN = 10,
    SIRI = 11,
    POWER = 12,
    GENERIC = 13
}
export declare const enum TargetCategory {
    UNDEFINED = 0,
    APPLE_TV = 24
}
export declare const enum ButtonState {
    UP = 0,
    DOWN = 1
}
export declare type SupportedConfiguration = {
    maximumTargets: number;
    ticksPerSecond: number;
    supportedButtonConfiguration: SupportedButtonConfiguration[];
    hardwareImplemented: boolean;
};
export declare type SupportedButtonConfiguration = {
    buttonID: number;
    buttonType: ButtonType;
};
export declare type TargetConfiguration = {
    targetIdentifier: number;
    targetName?: string;
    targetCategory?: TargetCategory;
    buttonConfiguration: Record<number, ButtonConfiguration>;
};
export declare type ButtonConfiguration = {
    buttonID: number;
    buttonType: ButtonType;
    buttonName?: string;
};
export declare const enum SiriInputType {
    PUSH_BUTTON_TRIGGERED_APPLE_TV = 0
}
export declare const enum AudioCodecTypes {
    PCMU = 0,
    PCMA = 1,
    AAC_ELD = 2,
    OPUS = 3,
    MSBC = 4,
    AMR = 5,
    AMR_WB = 6
}
export declare const enum AudioBitrate {
    VARIABLE = 0,
    CONSTANT = 1
}
export declare const enum AudioSamplerate {
    KHZ_8 = 0,
    KHZ_16 = 1,
    KHZ_24 = 2
}
declare type SupportedAudioStreamConfiguration = {
    audioCodecConfiguration: AudioCodecConfiguration;
};
export declare type AudioCodecConfiguration = {
    codecType: AudioCodecTypes;
    parameters: AudioCodecParameters;
};
export declare type AudioCodecParameters = {
    channels: number;
    bitrate: AudioBitrate;
    samplerate: AudioSamplerate;
    rtpTime?: RTPTime;
};
export declare type RTPTime = 20 | 30 | 40 | 60;
declare const enum SiriAudioSessionState {
    STARTING = 0,
    SENDING = 1,
    CLOSING = 2,
    CLOSED = 3
}
export declare type AudioFrame = {
    data: Buffer;
    rms: number;
};
export declare type FrameHandler = (frame: AudioFrame) => void;
export declare type ErrorHandler = (error: DataSendCloseReason) => void;
export interface SiriAudioStreamProducer {
    startAudioProduction(selectedAudioConfiguration: AudioCodecConfiguration): void;
    stopAudioProduction(): void;
}
export interface SiriAudioStreamProducerConstructor {
    /**
     * Creates a new instance of a SiriAudioStreamProducer
     *
     * @param frameHandler {FrameHandler} - called for every opus frame recorded
     * @param errorHandler {ErrorHandler} - should be called with a appropriate reason when the producing process errored
     * @param options - optional parameter for passing any configuration related options
     */
    new (frameHandler: FrameHandler, errorHandler: ErrorHandler, options?: any): SiriAudioStreamProducer;
}
export declare const enum RemoteControllerEvents {
    ACTIVE_CHANGE = "active-change",
    ACTIVE_IDENTIFIER_CHANGE = "active-identifier-change",
    TARGET_ADDED = "target-add",
    TARGET_UPDATED = "target-update",
    TARGET_REMOVED = "target-remove",
    TARGETS_RESET = "targets-reset"
}
export declare const enum TargetUpdates {
    NAME = 0,
    CATEGORY = 1,
    UPDATED_BUTTONS = 2,
    REMOVED_BUTTONS = 3
}
export declare type RemoteControllerEventMap = {
    [RemoteControllerEvents.ACTIVE_CHANGE]: (active: boolean) => void;
    [RemoteControllerEvents.ACTIVE_IDENTIFIER_CHANGE]: (activeIdentifier: number) => void;
    [RemoteControllerEvents.TARGET_ADDED]: (targetConfiguration: TargetConfiguration) => void;
    [RemoteControllerEvents.TARGET_UPDATED]: (targetConfiguration: TargetConfiguration, updates: TargetUpdates[]) => void;
    [RemoteControllerEvents.TARGET_REMOVED]: (targetIdentifier: number) => void;
    [RemoteControllerEvents.TARGETS_RESET]: () => void;
};
export interface RemoteControllerServiceMap extends ControllerServiceMap {
    targetControlManagement: TargetControlManagement;
    targetControl: TargetControl;
    siri?: Siri;
    audioStreamManagement?: AudioStreamManagement;
    dataStreamTransportManagement?: DataStreamTransportManagement;
}
export interface SerializedControllerState {
    activeIdentifier: number;
    targetConfigurations: Record<number, TargetConfiguration>;
}
/**
 * Handles everything needed to implement a fully working HomeKit remote controller.
 *
 * @event 'active-change': (active: boolean) => void
 *        This event is emitted when the active state of the remote has changed.
 *        active = true indicates that there is currently an apple tv listening of button presses and audio streams.
 *
 * @event 'active-identifier-change': (activeIdentifier: number) => void
 *        This event is emitted when the currently selected target has changed.
 *        Possible reasons for a changed active identifier: manual change via api call, first target configuration
 *        gets added, active target gets removed, accessory gets unpaired, reset request was sent.
 *        An activeIdentifier of 0 indicates that no target is selected.
 *
 *
 * @event 'target-add': (targetConfiguration: TargetConfiguration) => void
 *        This event is emitted when a new target configuration is received. As we currently do not persistently store
 *        configured targets, this will be called at every startup for every Apple TV configured in the home.
 *
 * @event 'target-update': (targetConfiguration: TargetConfiguration, updates: TargetUpdates[]) => void
 *        This event is emitted when a existing target was updated.
 *        The 'updates' array indicates what exactly was changed for the target.
 *
 * @event 'target-remove': (targetIdentifier: number) => void
 *        This event is emitted when a existing configuration for a target was removed.
 *
 * @event 'targets-reset': () => void
 *        This event is emitted when a reset of the target configuration is requested.
 *        With this event every configuration made should be reset. This event is also called
 *        when the accessory gets unpaired.
 */
export declare class RemoteController extends EventEmitter<RemoteControllerEventMap> implements SerializableController<RemoteControllerServiceMap, SerializedControllerState>, DataStreamProtocolHandler {
    readonly controllerType = DefaultControllerType.REMOTE;
    stateChangeDelegate?: StateChangeDelegate;
    audioSupported: boolean;
    audioProducerConstructor?: SiriAudioStreamProducerConstructor;
    audioProducerOptions?: any;
    targetControlManagementService?: TargetControlManagement;
    targetControlService?: TargetControl;
    siriService?: Siri;
    audioStreamManagementService?: AudioStreamManagement;
    dataStreamManagement?: DataStreamManagement;
    private buttons;
    private readonly supportedConfiguration;
    targetConfigurations: Record<number, TargetConfiguration>;
    private targetConfigurationsString;
    private lastButtonEvent;
    activeIdentifier: number;
    private activeSession?;
    private activeSessionDisconnectionListener?;
    supportedAudioConfiguration: string;
    selectedAudioConfiguration: AudioCodecConfiguration;
    selectedAudioConfigurationString: string;
    dataStreamConnections: Record<number, DataStreamConnection>;
    activeAudioSession?: SiriAudioSession;
    nextAudioSession?: SiriAudioSession;
    eventHandler?: Record<string, EventHandler>;
    requestHandler?: Record<string, RequestHandler>;
    /**
     * Creates a new RemoteController.
     * If siri voice input is supported the constructor to an SiriAudioStreamProducer needs to be supplied.
     * Otherwise a remote without voice support will be created.
     *
     * For every audio session a new SiriAudioStreamProducer will be constructed.
     *
     * @param audioProducerConstructor {SiriAudioStreamProducerConstructor} - constructor for a SiriAudioStreamProducer
     * @param producerOptions - if supplied this argument will be supplied as third argument of the SiriAudioStreamProducer
     *                          constructor. This should be used to supply configurations to the stream producer.
     */
    constructor(audioProducerConstructor?: SiriAudioStreamProducerConstructor, producerOptions?: any);
    /**
     * Set a new target as active target. A value of 0 indicates that no target is selected currently.
     *
     * @param activeIdentifier {number} - target identifier
     */
    setActiveIdentifier: (activeIdentifier: number) => void;
    /**
     * @returns if the current target is active, meaning the active device is listening for button events or audio sessions
     */
    isActive: () => boolean;
    /**
     * Checks if the supplied targetIdentifier is configured.
     *
     * @param targetIdentifier {number}
     */
    isConfigured: (targetIdentifier: number) => boolean;
    /**
     * Returns the targetIdentifier for a give device name
     *
     * @param name {string} - the name of the device
     * @returns the targetIdentifier of the device or undefined if not existent
     */
    getTargetIdentifierByName: (name: string) => number | undefined;
    /**
     * Sends a button event to press the supplied button.
     *
     * @param button {ButtonType} - button to be pressed
     */
    pushButton: (button: ButtonType) => void;
    /**
     * Sends a button event that the supplied button was released.
     *
     * @param button {ButtonType} - button which was released
     */
    releaseButton: (button: ButtonType) => void;
    /**
     * Presses a supplied button for a given time.
     *
     * @param button {ButtonType} - button to be pressed and released
     * @param time {number} - time in milliseconds (defaults to 200ms)
     */
    pushAndReleaseButton: (button: ButtonType, time?: number) => void;
    /**
     * This method adds and configures the remote services for a give accessory.
     *
     * @param accessory {Accessory} - the give accessory this remote should be added to
     * @deprecated - use {@link Accessory.configureController} instead
     */
    addServicesToAccessory: (accessory: Accessory) => void;
    constructSupportedConfiguration: () => SupportedConfiguration;
    constructSupportedAudioConfiguration: () => SupportedAudioStreamConfiguration;
    private handleTargetControlWrite;
    private handleAddTarget;
    private handleUpdateTarget;
    private handleRemoveTarget;
    private handleResetTargets;
    private handleListTargets;
    private handleActiveWrite;
    private setInactive;
    private handleActiveSessionDisconnected;
    private sendButtonEvent;
    private parseTargetConfigurationTLV;
    private updatedTargetConfiguration;
    private buildTargetControlSupportedConfigurationTLV;
    private handleTargetControlWhoAmI;
    private handleSiriAudioStart;
    private handleSiriAudioStop;
    private handleDataSendAckEvent;
    private handleDataSendCloseEvent;
    private handleSiriAudioSessionClosed;
    private handleDataStreamConnectionClosed;
    private handleSelectedAudioConfigurationWrite;
    private buildSupportedAudioConfigurationTLV;
    private buildSelectedAudioConfigurationTLV;
    private buildCodecConfigurationTLV;
    constructServices(): RemoteControllerServiceMap;
    initWithServices(serviceMap: RemoteControllerServiceMap): void | RemoteControllerServiceMap;
    configureServices(): void;
    handleFactoryReset(): void;
    serialize(): SerializedControllerState | undefined;
    deserialize(serialized: SerializedControllerState): void;
    setupStateChangeDelegate(delegate: StateChangeDelegate): void;
}
/**
 * @deprecated - only there for backwards compatibility, please use {@see RemoteController} directly
 */
export declare class HomeKitRemoteController extends RemoteController {
}
export declare const enum SiriAudioSessionEvents {
    CLOSE = "close"
}
export declare type SiriAudioSessionEventMap = {
    [SiriAudioSessionEvents.CLOSE]: () => void;
};
/**
 * Represents an ongoing audio transmission
 */
export declare class SiriAudioSession extends EventEmitter<SiriAudioSessionEventMap> {
    readonly connection: DataStreamConnection;
    private readonly selectedAudioConfiguration;
    private readonly producer;
    private producerRunning;
    private producerTimer?;
    state: SiriAudioSessionState;
    streamId?: number;
    endOfStream: boolean;
    private audioFrameQueue;
    private readonly maxQueueSize;
    private sequenceNumber;
    private readonly closeListener;
    constructor(connection: DataStreamConnection, selectedAudioConfiguration: AudioCodecConfiguration, producerConstructor: SiriAudioStreamProducerConstructor, producerOptions?: any);
    /**
     * Called when siri button is pressed
     */
    start(): void;
    /**
     * @returns if the audio session is closing
     */
    isClosing(): boolean;
    /**
     * Called when siri button is released (or active identifier is changed to another device)
     */
    stop(): void;
    private startAudioProducer;
    private stopAudioProducer;
    private handleSiriAudioFrame;
    private handleProducerError;
    handleDataSendAckEvent: (endOfStream: boolean) => void;
    handleDataSendCloseEvent: (reason: DataSendCloseReason) => void;
    private sendDataSendCloseEvent;
    private handleDataStreamConnectionClosed;
    private closed;
    private popSome;
}
export {};
//# sourceMappingURL=RemoteController.d.ts.map