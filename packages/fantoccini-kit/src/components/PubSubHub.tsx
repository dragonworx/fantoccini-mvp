import * as React from 'react';
import { ReactElement, useState, createContext } from 'react';

class Event {
    timestamp: number;

    constructor(readonly name: string | null, readonly args: any[] = []) {
        this.timestamp = Date.now();
    }

    toString() {
        const { timestamp, name, args } = this;
        return `[${timestamp}]:${name ? '"' + name + '"' : 'null'} ${JSON.stringify(args)}`;
    }
}

interface EventQueueOptions {
    autoFlush: boolean;
}

const defaultOptions = {
    autoFlush: true,
};

class EventQueue {
    private events: Event[] = [];

    constructor(readonly hub: Hub, readonly options: EventQueueOptions = defaultOptions) {
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
}

type QueueRefCallback = (queue: EventQueue) => void;
type PubRenderFunc = (queue: EventQueue) => ReactElement;

interface PubProps {
    queueRef?: QueueRefCallback;
    children?: PubRenderFunc;
}

const Pub = (props: PubProps) => {
    return (
        <PubSubContext.Consumer>
        {
            ({hub}) => {
                const { queueRef, children } = props;
                const queue = new EventQueue(hub);
                queueRef && queueRef(queue);
                if (!children) {
                    return null;
                }
                return children(queue);
            }
        }
        </PubSubContext.Consumer>
    )
}

interface HubContextProps {
    hub?: Hub;
}

const PubSubContext = createContext<HubContextProps>({});

type HubRefCallback = (hub: Hub) => void;

interface HubContextProps {
    hub?: Hub;
    hubRef?: HubRefCallback;
    children?: ReactElement<any>[];
}

const HubContext = (props: HubContextProps) => {
    const { hub = new Hub(), hubRef, children } = props;
    hubRef && hubRef(hub);
    return (
        <PubSubContext.Provider value={{ hub }}>
            {children}
        </PubSubContext.Provider>
    )
}

type Pattern = string | RegExp;
type Handler = (event: Event) => boolean | void;

interface HubListener {
    pattern: Pattern;
    handler: Handler;
}

class Hub {
    listeners: HubListener[] = [];

    on(pattern: Pattern, handler: Handler) {
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
        console.log('Emit!', event)
        const { listeners } = this;
        const l = listeners.length;
        for (let i = 0; i < l; i++) {
            const listener = listeners[i];
            if (event.name.match(listener.pattern)) {
                const result = listener.handler(event);
                if (result === true) {
                    return;
                }
            }
        }
    }
}

type SubRenderFunc = (event: Event) => ReactElement;

interface SubProps {
    on: Pattern;
    defaults?: any[];
    children?: SubRenderFunc;
}

const Sub = (props: SubProps) => {
    const [ event, setEvent ] = useState(null);

    return (
        <PubSubContext.Consumer>
        {
            ({hub}) => {
                const { on, defaults, children } = props;
                hub.on(on, event => {
                    setEvent(event);
                });
                if (!children || !event) {
                    if (defaults) {
                        return children(new Event(null, ...defaults));
                    }
                    return null;
                }
                return children(event);
            }
        }
        </PubSubContext.Consumer>
    )
}

export {
    Pub,
    Sub,
    Event,
    HubContext,
    Hub,
    EventQueue,
}