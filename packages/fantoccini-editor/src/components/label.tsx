import * as React from 'react';
import { Component } from 'react';
import { HTMLElementProps } from './util';
import "../../less/ui-label.less";

export class UILabel extends Component<HTMLElementProps, {}> {
    render() {
        const { id, className } = this.props;
        return <span id={id} className={`ui-label ${className || ''}`.trim()}>{this.props.children}</span>
    }
}