import * as React from 'react';

export function cloneChildren(propsChildren: React.ReactNode, resolver: (child: React.ReactElement<any>) => {}) {
    const children: any[] = React.Children.map(propsChildren, (child: React.ReactElement<any>, i: number) => {
        const props = {
            key: i,
            ...resolver(child)
        };
        return React.cloneElement(child, props) as any;
    });
    return children;
}

export interface HTMLElementProps {
    id?: string;
    className?: string;
}

export interface UIInputGroupItemProps {
    name?: string;
    isChecked?: any;
    isGroupSelected?: boolean;
    onChange?: (isChecked: boolean, name?: string) => void;
}