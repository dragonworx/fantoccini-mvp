import * as React from 'react';
import { ReactElement, useState, createContext } from 'react';

import {
    QueueRefCallback,
    PubRenderFunc,
    EventQueue,
    HubListenerPattern,
    SubRenderFunc,
    Event,
    HubController,
    HubRefCallback,
} from './types';

export const PubSubContext = createContext<HubProps>({});

export interface PubProps {
    queueRef?: QueueRefCallback;
    children?: PubRenderFunc;
}

export const Pub = (props: PubProps) => {
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

export interface SubProps {
    on: HubListenerPattern;
    defaults?: any[];
    children?: SubRenderFunc;
}

export const Sub = (props: SubProps) => {
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

export interface HubProps {
    hub?: HubController;
    hubRef?: HubRefCallback;
    children?: ReactElement<any>[];
}

export const Hub = (props: HubProps) => {
    const { hub = new HubController(), hubRef, children } = props;
    hubRef && hubRef(hub);
    return (
        <PubSubContext.Provider value={{ hub }}>
            {children}
        </PubSubContext.Provider>
    )
}

export interface SendProps {
    name: string;
    args?: any[];
    delayMs?: number;
}

export const Send = (props: SendProps) => {
    return (
        <PubSubContext.Consumer>
        {
            ({hub}) => {
                const { name, args = [], delayMs = -1 } = props;
                const event = new Event(name, args);
                if (typeof delayMs === 'number' && delayMs > -1) {
                    setTimeout(() => hub.emit(event), delayMs);
                } else {
                    hub.emit(event);
                }
                return null;
            }
        }
        </PubSubContext.Consumer>
    )
}

export const Clear = (props: SendProps) => {
    return (
        <PubSubContext.Consumer>
        {
            ({hub}) => {
                const { name, args = [], delayMs = -1 } = props;
                if (typeof delayMs === 'number' && delayMs > -1) {
                    setTimeout(() => hub.clear(name), delayMs);
                } else {
                    hub.clear(name);
                }
                return null;
            }
        }
        </PubSubContext.Consumer>
    )
}