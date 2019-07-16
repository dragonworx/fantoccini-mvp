import * as React from 'react';
import { Component } from 'react';
import { HTMLElementProps } from './util';
import "../../less/ui-panel.less";

export class UIPanel extends Component<HTMLElementProps, {}> {
    render() {
        const { id, className } = this.props;
        return (
            <div id={id} className={`ui-panel ${className || ''}`.trim()}>
                <div className="ui-panel-content">
                    {this.props.children}
                </div>
            </div>
        )
    }
}