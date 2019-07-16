import * as React from 'react';
import { Component } from 'react';
import { HTMLElementProps } from './util';

import '../../less/ui-icon.less';

export interface Props extends HTMLElementProps {
    src: string;
    size?: number;
}

export const defaultProps: Partial<Props> = {
    size: 32,
};

export interface State {
}

export class UIIcon extends Component<Props, State> {
    state = {};
    static defaultProps = defaultProps;

    render() {
        const { src, size, id, className } = this.props;
        return <img id={id} className={`ui-icon ${className}`.trim()} src={src} style={{ width: size }} />;
        
    }
}