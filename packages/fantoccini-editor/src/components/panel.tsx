import '../../less/Panel';
import * as React from 'react';
import { Component } from 'react';
import { HTMLElementProps } from './util';

export interface Props extends HTMLElementProps {
    title?: string;
}

export class Panel extends Component<Props, {}> {
    render() {
        const { id, className, title: label } = this.props;
        return (
            <div id={id} className={`panel ${className || ''}`.trim()}>
                <div className="panel-content">
                    {label ? <div className="panel-label">{label}</div> : null}
                    {this.props.children}
                </div>
            </div>
        )
    }
}