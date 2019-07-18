import '../../less/Grid';
import * as React from 'react';
import { Component, ReactElement } from 'react';
import { cloneChildren, HTMLElementProps } from './util';

export interface GridAlignProps extends HTMLElementProps {
    hAlign?: 'left' | 'center' | 'right';
    vAlign?: 'top' | 'center' | 'bottom';
}

export class GridElement extends Component<GridAlignProps, {}> {
    cloneChildrenWithProps() {
        const { hAlign, vAlign } = this.props;
        return cloneChildren(this.props.children, (child: ReactElement<GridAlignProps>) => ({
            hAlign: hAlign || child.props.hAlign,
            vAlign: vAlign || child.props.vAlign,
        }));
    }
}

export class Grid extends GridElement {
    render() {
        const { id, className } = this.props;
        return <div id={id} className={`grid ${className || ''}`.trim()}>{this.cloneChildrenWithProps()}</div>
    }
}

export class GridRow extends GridElement {
    render() {
        const { id, className } = this.props;
        return <div id={id} className={`grid-row ${className || ''}`.trim()}>{this.cloneChildrenWithProps()}</div>
    }
}

export class GridCell extends GridElement {
    render() {
        const { hAlign, vAlign, id, className } = this.props;
        const hClassName = hAlign ? 'grid-cell-h-' + hAlign : '';
        const vClassName = vAlign ? 'grid-cell-v-' + vAlign : '';
        const cssName = `grid-cell ${hClassName} ${vClassName} ${className || ''}`.trim();
        return <div id={id} className={cssName}>{this.props.children}</div>
    }
}

export class HLayout extends GridElement {
    render() {
        const { children, id, className, hAlign, vAlign} = this.props;
        const childs = React.Children.map(children, (child: ReactElement) => <GridCell>{child}</GridCell>) || [];
        return (
            <Grid id={id} className={`h-layout ${className || ''}`}>
                {childs.length ? (
                    <GridRow hAlign={hAlign} vAlign={vAlign}>
                        {childs}
                    </GridRow>
                ) : null}
            </Grid>
        )
    }
}

export class VLayout extends GridElement {
    render() {
        const { children, id, className, hAlign, vAlign} = this.props;
        const childs = React.Children.map(children, (child: ReactElement) => <GridRow hAlign={hAlign} vAlign={vAlign}><GridCell>{child}</GridCell></GridRow>) || [];
        return (
            <Grid id={id} className={`v-layout ${className || ''}`}>
                {childs.length ? childs : null}
            </Grid>
        )
    }
}