import './index.less';

/** Trace */

const log = console.log;

const isUndefined = (...args: any[]) => args.filter(arg => arg !== undefined).length === 0;
const isNull = (...args: any[]) => args.filter(arg => arg !== null).length === 0;
const isSame = (args1: any[], args2: any[]) => args1.find((item, i) => args2[i] !== item) !== null;

const EVENT_ROW_HEIGHT = 20;

const actors: Actor[] = [];
const actorsById: Map<string, Actor> = new Map;
const events: TraceEvent[] = []; // TODO: can we remove? just keep lastEvent
const mainContainer = el({ css: 'trace' });
const timeColumn = el({ css: 'timestamp', container: mainContainer, html: '<div class="header">&nbsp;</div>' });

let startTime = Date.now();

interface CreateOptions {
    tag?: string;
    css?: string;
    container?: HTMLElement;
    html?: string;
}

class Actor {
    container: HTMLElement;
    margin: number = 0;

    constructor(readonly id: string) {
        const container = el({ css: 'actor' });
        const header = el({ css: 'header', container, html: id });
        this.container = container;
        mainContainer.appendChild(container);
    }
}

class TraceEvent {
    args: any[];
    timestamp: number;
    element: HTMLElement;
    repeatCount: number = 1;
    badge: HTMLElement;

    constructor(readonly actor: Actor, readonly name: string, args: any[]) {
        this.args = args;
        this.timestamp = Date.now();
    }
}

function el({ tag = 'div', css, container, html }: CreateOptions) {
    const element = document.createElement(tag);
    css && element.setAttribute('class', css);
    html && (element.innerHTML = html);
    container && container.appendChild(element);
    return element;
}

function actor(id: string) {
    if (actorsById.has(id)) {
        // TODO: change to warn, auto-rename?
        throw new Error(`Actor "${id}" already exists, id must be unique`);
    }
    const actor = new Actor(id);
    actors.push(actor);
    actorsById.set(id, actor);
}

function trace(actorId: string, eventName: string, ...args: any[]) {
    const lastEvent = events[events.length - 1];
    if (lastEvent) {
        if (eventName === lastEvent.name && isSame(args, lastEvent.args)) {
            lastEvent.repeatCount++;
            const html = `${lastEvent.repeatCount}`;
            if (lastEvent.badge) {
                lastEvent.badge.innerHTML = html;
            } else {
                const badge = el({ tag: 'span', css: 'badge', container: lastEvent.element, html });
                lastEvent.badge = badge;
            }
            return;
        }
    }

    const actor = actorsById.get(actorId);
    if (!actorsById.has(actorId)) {
        // TODO: change to warn?
        throw new Error(`Actor "${actorId}" not found, id must be unique`);
    }
    const event = new TraceEvent(actor, eventName, args);
    events.push(event);

    const margin = actor.margin;
    const element = el({ css: 'event', container: actor.container, html: `${eventName}` });
    event.element = element;
    element.addEventListener('click', () => {
        if (isUndefined(...args)) {
            console.log(undefined);
        } else if (isNull(...args)) {
            console.log(null);
        } else {
            if (typeof console.group === 'function' && typeof console.groupEnd === 'function') {
                console.group(...args);
                console.groupEnd();
            }
        }
    });
    // const date = new Date(timestamp);
    // const timeFormatted = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}:${date.getTime()}`;
    const timeFormatted = `${event.timestamp - startTime}`;
    const time = el({ css: 'time', container: timeColumn, html: timeFormatted });
    // el({ css: 'line', container: time });
    element.style.marginTop = `${margin}px`;
    actor.margin = 0;
    actors.filter(act => act.id !== actor.id).forEach(act => act.margin += EVENT_ROW_HEIGHT);
}

function reset() {
    startTime = Date.now();
}

function mount(selectorIdElement: string | HTMLElement) {
    let mountContainer = selectorIdElement;
    if (typeof selectorIdElement === 'string') {
        mountContainer = document.querySelector(selectorIdElement) as HTMLElement;
        if (mountContainer === null) {
            throw new Error(`Cannot mount on invalid selector "${selectorIdElement}"`);
        }
    }
    (mountContainer as HTMLElement).appendChild(mainContainer);
}

trace.actor = actor;
trace.reset = reset;
trace.mount = mount;

export default trace;