import { createContext } from 'react';
import { React, Component, Props, cloneChildren, px, css, table, tr, td } from './common'

import '../less/Table'

export type TableColumns = Array<number | null> | undefined;

export interface TableProps extends Props {
    padding?: number;
    spacing?: number;
    columns?: TableColumns;
}

export interface AlignProps extends Props {
    hAlign?: 'left' | 'center' | 'right';
    vAlign?: 'top' | 'center' | 'bottom';
}

export const TableContext = createContext<TableColumns>(undefined);

export const Table = (props: TableProps) => {
    const { spacing, padding, columns, ...otherProps } = props;
    return (
        <Component el={table} css="table" {...otherProps} attributes={{
            cellPadding: px(padding),
            cellSpacing: px(spacing),
        }}>
            <tbody>
                <TableContext.Provider value={columns}>
                    {props.children}
                </TableContext.Provider>
            </tbody>
        </Component>
    );
}

export const Row = (props: Props) => {
    const children = cloneChildren('cell', props.children);
    return (
        <Component el={tr} css="row" {...props}>
            {children}
        </Component>
    );
}

export interface CellProps extends AlignProps {
    width?: string;
    index?: number;
}

export const getCellWidth = (props: CellProps, columns: TableColumns) => {
    const { index, width } = props;
    if (!columns || (columns && !columns.length)) {
        return width;
    }
    const columnValue = columns[index];
    if (columnValue === null || columnValue === undefined) {
        return width;
    }
    const isFloat = parseInt(columnValue.toString()) !== columnValue;
    return isFloat || (columnValue === 1.0) ? `${columnValue * 100}%` : `${columnValue}px`
}

export const Cell = (props: CellProps) => {
    const { children, hAlign, vAlign, width, index, ...otherProps } = props;
    return (
        <TableContext.Consumer>
            {
                (columns: TableColumns) => (
                    <Component el={td} css={[
                        'cell', 
                        css('cell-halign-$', hAlign),
                        css('cell-valign-$', vAlign),
                    ]} {...otherProps} attributes={{
                        width: getCellWidth(props, columns),
                    }}>
                        {children}
                    </Component>
                )
            }
        </TableContext.Consumer>
    );
}

export const VTable = (props: TableProps) => {
    const { children, ...otherProps } = props;
    return (
        <Table {...otherProps}>
            {React.Children.map(children, child => <Row><Cell>{child}</Cell></Row>)}
        </Table>
    )
}

export const HTable = (props: TableProps) => {
    const { children, ...otherProps } = props;
    return (
        <Table {...otherProps}>
            <Row>
                {React.Children.map(children, child => <Cell>{child}</Cell>)}
            </Row>
        </Table>
    )
}