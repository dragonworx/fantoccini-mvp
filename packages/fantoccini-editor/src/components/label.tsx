import * as React from 'react';
import { Component } from 'react';
import { HTMLElementProps } from './util';
import "../../less/ui-label.less";

export interface Props extends HTMLElementProps {
    text: string;
    position?: 'before' | 'after';
}

export class UILabel extends Component<Props, {}> {
    static defaultProps = {
        position: 'after'
    };

    render() {
        const { id, className, children, position, text } = this.props;
        const content = position === 'after' ? [children, text] : [text, children];
        return <label id={id} className={`ui-label ui-label-${position} ${className || ''}`.trim()}>{content}</label>
    }
}