import { ErrorHandler, FrameHandler, SiriAudioStreamProducer, AudioCodecConfiguration } from "..";
export declare type GStreamerOptions = {
    alsaSrc: string;
};
/**
 * SiriAudioStreamProducer utilizing gstreamer and alsa audio devices to create opus audio frames.
 *
 * This producer is mainly tested on a RaspberryPi, but should also work on other linux based devices using alsa.
 *
 * This producer requires some packages to be installed. It is adviced to install the following (for example via apt-get):
 * gstreamer1.0-plugins-base, gstreamer1.0-x, gstreamer1.0-tools, libgstreamer1.0-dev, gstreamer1.0-doc,
 * gstreamer1.0-plugins-good, gstreamer1.0-plugins- ugly, gstreamer1.0-plugins-bad, gstreamer1.0-alsa
 *
 */
export declare class GStreamerAudioProducer implements SiriAudioStreamProducer {
    private readonly options;
    private readonly frameHandler;
    private readonly errorHandler;
    private process?;
    private running;
    constructor(frameHandler: FrameHandler, errorHandler: ErrorHandler, options?: Partial<GStreamerOptions>);
    startAudioProduction(selectedAudioConfiguration: AudioCodecConfiguration): void;
    stopAudioProduction(): void;
}
//# sourceMappingURL=gstreamer-audioProducer.d.ts.map