import { Status } from './lib/HAPServer';
import { Characteristic, CharacteristicProps } from './lib/Characteristic';
export declare type Nullable<T> = T | null;
export declare type WithUUID<T> = T & {
    UUID: string;
};
export interface ToHAPOptions {
    omitValues: boolean;
}
export declare type SessionIdentifier = string;
export declare type MacAddress = string;
export declare type Callback = (...args: any[]) => void;
export declare type NodeCallback<T> = (err: Nullable<Error> | undefined, data?: T) => void;
export declare type VoidCallback = (err?: Nullable<Error>) => void;
export declare type PairingsCallback<T> = (err: number, data?: T) => void;
export declare type PrimitiveTypes = string | number | boolean;
declare type HAPProps = Pick<CharacteristicProps, 'perms' | 'format' | 'description' | 'unit' | 'maxValue' | 'minValue' | 'minStep' | 'maxLen'> & Pick<Characteristic, 'valid-values' | 'valid-values-range'>;
export declare type HapCharacteristic = HAPProps & {
    iid: number;
    type: string;
    value: string | number | {} | null;
};
export declare type CharacteristicValue = PrimitiveTypes | PrimitiveTypes[] | {
    [key: string]: PrimitiveTypes;
};
export declare type CharacteristicChange = {
    newValue: CharacteristicValue;
    oldValue: CharacteristicValue;
    context?: any;
    characteristic: Characteristic;
};
export declare type HapService = {
    iid: number;
    type: string;
    characteristics: HapCharacteristic[];
    primary: boolean;
    hidden: boolean;
    linked: number[];
};
export declare type CharacteristicData = {
    aid: number;
    iid: number;
    v?: string;
    value?: string;
    s?: Status;
    status?: Status;
    e?: string;
    ev?: boolean;
    r?: boolean;
};
/**
 * @deprecated replaced by {@link AudioStreamingCodec}
 */
export declare type AudioCodec = {
    samplerate: number;
    type: string;
};
/**
 * @deprecated replaced by {@link H264CodecParameters}
 */
export declare type VideoCodec = {
    levels: number[];
    profiles: number[];
};
/**
 * @deprecated replaced by {@link AudioStreamingOptions}
 */
export declare type StreamAudioParams = {
    comfort_noise: boolean;
    codecs: AudioCodec[];
};
/**
 * @deprecated replaced by {@link VideoStreamingOptions}
 */
export declare type StreamVideoParams = {
    codec?: VideoCodec;
    resolutions: [number, number, number][];
};
export {};
//# sourceMappingURL=types.d.ts.map