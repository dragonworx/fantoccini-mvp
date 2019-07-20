import '../less/Label';
import * as React from 'react';
import { Component } from 'react';
import { CssSelectableProps } from 'fantoccini-kit';

export interface Props extends CssSelectableProps {
    text: string;
    position?: 'before' | 'after';
}

export class Label extends Component<Props, {}> {
    static defaultProps = {
        position: 'before'
    };

    render() {
        const { id, className, children, position, text } = this.props;
        const t = <span key="t">{text}</span>;
        const content = position === 'after' ? [children, t] : [t, children];
        return <label id={id} className={`label label-${position} ${className || ''}`.trim()}>{content}</label>
    }
}