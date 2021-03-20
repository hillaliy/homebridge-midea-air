/// <reference types="node" />
import { Controller, ControllerServiceMap, ControllerType } from "./Controller";
import { CameraStreamingOptions, PrepareStreamResponse, PrepareStreamRequest, RTPStreamManagement, SnapshotRequest, StreamingRequest } from "../..";
import { NodeCallback, SessionIdentifier } from "../../types";
import { Doorbell, Microphone, Speaker } from "../gen/HomeKit";
import { EventEmitter } from "../EventEmitter";
export interface CameraControllerOptions {
    /**
     * Amount of parallel camera streams the accessory is capable of running.
     * As of the official HAP specification non Secure Video cameras have a minimum required amount of 2 (but 1 is also fine).
     * Secure Video cameras just expose 1 stream.
     *
     * Default value: 1
     */
    cameraStreamCount?: number;
    /**
     * Delegate which handles the actual RTP/RTCP video/audio streaming and Snapshot requests.
     */
    delegate: CameraStreamingDelegate;
    /**
     * Options regarding video/audio streaming
     */
    streamingOptions: CameraStreamingOptions;
}
export declare type SnapshotRequestCallback = (error?: Error, buffer?: Buffer) => void;
export declare type PrepareStreamCallback = (error?: Error, response?: PrepareStreamResponse) => void;
export declare type StreamRequestCallback = (error?: Error) => void;
export interface CameraStreamingDelegate {
    handleSnapshotRequest(request: SnapshotRequest, callback: SnapshotRequestCallback): void;
    prepareStream(request: PrepareStreamRequest, callback: PrepareStreamCallback): void;
    handleStreamRequest(request: StreamingRequest, callback: StreamRequestCallback): void;
}
export interface CameraControllerServiceMap extends ControllerServiceMap {
    microphone?: Microphone;
    speaker?: Speaker;
    doorbell?: Doorbell;
}
export declare const enum CameraControllerEvents {
    MICROPHONE_PROPERTIES_CHANGED = "microphone-change",
    SPEAKER_PROPERTIES_CHANGED = "speaker-change"
}
export declare type CameraControllerEventMap = {
    [CameraControllerEvents.MICROPHONE_PROPERTIES_CHANGED]: (muted: boolean, volume: number) => void;
    [CameraControllerEvents.SPEAKER_PROPERTIES_CHANGED]: (muted: boolean, volume: number) => void;
};
/**
 * Everything needed to expose a HomeKit Camera.
 *
 * @event 'microphone-change' => (muted: boolean, volume: number) => void
 *      Emitted when the mute state or the volume changed. The Apple Home App typically does not set those values
 *      except the mute state. When you adjust the volume in the Camera view it will reset the muted state if it was set previously.
 *      The value of volume has nothing to do with the volume slider in the Camera view of the Home app.
 * @event 'speaker-change' => (muted: boolean, volume: number) => void
 *      Emitted when the mute state or the volume changed. The Apple Home App typically does not set those values
 *      except the mute state. When you unmute the device microphone it will reset the mute state if it was set previously.
 */
export declare class CameraController extends EventEmitter<CameraControllerEventMap> implements Controller<CameraControllerServiceMap> {
    private static readonly STREAM_MANAGEMENT;
    readonly controllerType: ControllerType;
    private readonly streamCount;
    private readonly delegate;
    private readonly streamingOptions;
    private readonly legacyMode;
    streamManagements: RTPStreamManagement[];
    private microphoneService?;
    private speakerService?;
    private microphoneMuted;
    private microphoneVolume;
    private speakerMuted;
    private speakerVolume;
    constructor(options: CameraControllerOptions, legacyMode?: boolean);
    /**
     * Call this method if you want to forcefully suspend an ongoing streaming session.
     * This would be adequate if the the rtp server or media encoding encountered an unexpected error.
     *
     * @param sessionId {SessionIdentifier} - id of the current ongoing streaming session
     */
    forceStopStreamingSession(sessionId: SessionIdentifier): void;
    static generateSynchronisationSource(): number;
    setMicrophoneMuted(muted?: boolean): void;
    setMicrophoneVolume(volume: number): void;
    setSpeakerMuted(muted?: boolean): void;
    setSpeakerVolume(volume: number): void;
    private emitMicrophoneChange;
    private emitSpeakerChange;
    constructServices(): CameraControllerServiceMap;
    initWithServices(serviceMap: CameraControllerServiceMap): void | CameraControllerServiceMap;
    protected migrateFromDoorbell(serviceMap: ControllerServiceMap): boolean;
    configureServices(): void;
    handleFactoryReset(): void;
    handleSnapshotRequest(height: number, width: number, callback: NodeCallback<Buffer>): void;
    handleCloseConnection(sessionID: SessionIdentifier): void;
}
//# sourceMappingURL=CameraController.d.ts.map