import { ReactElement } from 'react';

export const EventQueueDefaultOptions = {
    autoFlush: true,
};

export type PubRenderFunc = (hub: HubController) => ReactElement;
export type SubRenderFunc = (event: Event) => ReactElement;
export type HubRefCallback = (hub: HubController) => void;
export type HubListenerPattern = string | RegExp;
export type HubListenerEventHandler = (event?: Event | null) => void;

export interface EventQueueOptions {
    autoFlush: boolean;
}

export interface HubListener {
    pattern: HubListenerPattern;
    handler: HubListenerEventHandler;
}

export class Event {
    timestamp: number;
    hub: HubController;

    constructor(readonly name: string | null, readonly args: any[] = []) {
        this.timestamp = Date.now();
    }

    toString() {
        const { timestamp, name, args } = this;
        return `[${timestamp}]:${name ? '"' + name + '"' : 'null'} ${JSON.stringify(args)}`;
    }
}

export class HubController {
    listeners: HubListener[] = [];

    on(pattern: HubListenerPattern, handler: HubListenerEventHandler) {
        this.listeners.push({
            pattern,
            handler,
        });
    }

    emit(eventOrName: Event | string, ...args: any[]) {
        let event;
        if (typeof eventOrName === 'string') {
            event = new Event(eventOrName, ...args);
        } else {
            event = eventOrName;
        }
        console.log('Hub.emit()', event);
        const { listeners } = this;
        const l = listeners.length;
        for (let i = 0; i < l; i++) {
            const listener = listeners[i];
            if (event.name.match(listener.pattern)) {
                event.hub = this;
                listener.handler(event);
            }
        }
    }

    clear(name: string) {
        console.log('Hub.clear()', name);
        const { listeners } = this;
        const l = listeners.length;
        for (let i = 0; i < l; i++) {
            const listener = listeners[i];
            if (name.match(listener.pattern)) {
                listener.handler(null);
            }
        }
    }
}
