export interface IPuppetString {
    get (): any;
    set (value: any): void;
}

export interface ISeekable {
    seek(timeMs: number): void;
}

export interface IPuppet {
    attachStrings(): void;
}

export * from './timeline';
export * from './puppet';
export * from './string';
export * from './sequence';
export * from './motion';
export * from './keyframe';
export * from './util/easing';