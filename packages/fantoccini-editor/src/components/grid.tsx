import * as React from 'react';
import { Component, ReactElement } from 'react';
import { cloneChildren } from './util';
import "../../less/ui-grid";

export interface UIGridAlignProps {
    hAlign?: 'left' | 'center' | 'right';
    vAlign?: 'top' | 'center' | 'bottom';
}

export class UIGridElement extends Component<UIGridAlignProps, {}> {
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
        return <div className="ui-grid">{this.cloneChildrenWithProps()}</div>
    }
}

export class UIGridRow extends UIGridElement {
    render() {
        return <div className="ui-grid-row">{this.cloneChildrenWithProps()}</div>
    }
}

export class UIGridCell extends UIGridElement {
    render() {
        const { hAlign, vAlign } = this.props;
        const cssName = `ui-grid-cell ui-grid-cell-h-${hAlign} ui-grid-cell-v-${vAlign}`;
        return <div className={cssName}>{this.props.children}</div>
    }
}