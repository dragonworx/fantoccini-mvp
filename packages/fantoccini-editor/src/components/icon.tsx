import * as React from 'react';
import { Component } from 'react';

import '../../less/ui-icon.less';

export interface Props {
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
        const { src, size } = this.props;
        return <img className="ui-icon" src={src} style={{ width: size }} />;
        
    }
}