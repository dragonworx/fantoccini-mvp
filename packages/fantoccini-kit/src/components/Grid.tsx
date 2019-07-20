import { React, Component, Props, px, css, table, tr, td, div } from './common'

import '../less/Grid'

export interface GridProps extends Props {
    padding?: number;
    spacing?: number;
}

export interface AlignProps extends Props {
    hAlign?: 'left' | 'center' | 'right';
    vAlign?: 'top' | 'center' | 'bottom';
}

export const Grid = (props: GridProps) => {
    const { spacing, padding } = props;
    return (
        <Component el={table} css="grid" {...props} attributes={{
            cellPadding: px(padding),
            cellSpacing: px(spacing),
        }}>
            <tbody>{props.children}</tbody>
        </Component>
    );
}

export const Row = (props: Props) => {
    return (
        <Component el={tr} css="row" {...props}>
            {props.children}
        </Component>
    );
}

export interface CellProps extends AlignProps {
    width?: string;
}

export const Cell = (props: CellProps) => {
    const { children, hAlign, vAlign, width } = props;
    return (
        <Component el={td} css={[
            'cell', 
            css('cell-halign-$', hAlign),
            css('cell-valign-$', vAlign),
        ]} {...props} attributes={{
            width,
        }}>
            {children}
        </Component>
    );
}

export const HLayout = (props: Props) => <Component el={div} css="hlayout" {...props}>{props.children}</Component>
export const VLayout = (props: Props) => <Component el={div} css="vlayout" {...props}>{props.children}</Component>
