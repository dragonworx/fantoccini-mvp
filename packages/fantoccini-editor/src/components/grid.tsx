import * as React from 'react';
import { Component, ReactElement } from 'react';
import { cloneChildren, HTMLElementProps } from './util';
import "../../less/ui-grid";

export interface UIGridAlignProps extends HTMLElementProps {
    hAlign?: 'left' | 'center' | 'right';
    vAlign?: 'top' | 'center' | 'bottom';
}

export class UIGridElement extends Component<UIGridAlignProps, {}> {
    static defaultProps = {
        hAlign: 'left',
        vAlign: 'top',
    };

    cloneChildrenWithProps() {
        const { hAlign, vAlign } = this.props;
        return cloneChildren(this.props.children, (child: ReactElement<UIGridAlignProps>) => ({
            hAlign: hAlign || child.props.hAlign,
            vAlign: vAlign || child.props.vAlign,
        }));
    }
}

export class UIGrid extends UIGridElement {
    render() {
        const { id, className } = this.props;
        return <div id={id} className={`ui-grid ${className || ''}`.trim()}>{this.cloneChildrenWithProps()}</div>
    }
}

export class UIGridRow extends UIGridElement {
    render() {
        const { id, className } = this.props;
        return <div id={id} className={`ui-grid-row ${className || ''}`.trim()}>{this.cloneChildrenWithProps()}</div>
    }
}

export class UIGridCell extends UIGridElement {
    render() {
        const { hAlign, vAlign, id, className } = this.props;
        const cssName = `ui-grid-cell ui-grid-cell-h-${hAlign} ui-grid-cell-v-${vAlign} ${className || ''}`.trim();
        return <div id={id} className={cssName}>{this.props.children}</div>
    }
}