import { ReactElement } from 'react';

export const EventQueueDefaultOptions = {
    autoFlush: true,
};

export type QueueRefCallback = (queue: EventQueue) => void;
export type PubRenderFunc = (queue: EventQueue) => ReactElement;
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

export class EventQueue {
    private events: Event[] = [];

    constructor(readonly hub: HubController, readonly options: EventQueueOptions = EventQueueDefaultOptions) {
    }

    emit(name: string, ...args: any[]) {
        const event = new Event(name, args);
        this.events.push(event);
        if (this.options.autoFlush) {
            this.flush();
        }
    }

    flush() {
        this.events.forEach(event => {
            this.hub.emit(event);
        });
        this.events.length = 0;
    }

    clear(name: string) {
        this.hub.clear(name);
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
