/// <reference types="node" />
import { EventEmitter as BaseEventEmitter } from "events";
import { Callback } from '../types';
export declare type EventKey = string | symbol;
export declare type Event<T> = T & EventKey;
export declare type EventMap = {
    [name: string]: Callback;
};
export declare class EventEmitter<T extends EventMap, K extends Event<keyof T> = Event<keyof T>> extends BaseEventEmitter {
    addListener(event: K, listener: T[K]): this;
    on(event: K, listener: T[K]): this;
    once(event: K, listener: T[K]): this;
    removeListener(event: K, listener: T[K]): this;
    removeAllListeners(event?: K): this;
    setMaxListeners(n: number): this;
    getMaxListeners(): number;
    listeners(event: K): T[K][];
    emit(event: K, ...args: any[]): boolean;
    listenerCount(type: string): number;
}
//# sourceMappingURL=EventEmitter.d.ts.map