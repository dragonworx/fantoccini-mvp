import '../less/Icon';
import * as React from 'react';
import { Component, FunctionComponent as FC } from 'react';
import { HTMLElementProps } from './util';
import { Wrapper, img } from './elements'

export interface Props extends HTMLElementProps {
    src: string;
    size?: number;
}

export const defaultProps: Partial<Props> = {
    size: 32,
};

export interface State {
}

export class Icon extends Component<Props, State> {
    state = {};
    static defaultProps = defaultProps;

    render() {
        const { src, size, id, className } = this.props;
        return <img id={id} className={`icon ${className}`.trim()} src={src} style={{ width: size }} />;
        
    }
}

export const Icon2: FC<Props> = (props: Props) => <Wrapper {...props} type={img} style={{ width: props.size }} />;