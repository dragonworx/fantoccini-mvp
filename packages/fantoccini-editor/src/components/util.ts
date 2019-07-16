import * as React from 'react';

export function cloneChildren(propsChildren: React.ReactNode, resolver: (child: React.ReactElement<any>) => {}) {
    const children: any[] = [];
    (propsChildren as []).forEach((child: React.ReactElement<any>, i: number) => {
        const props = {
            key: i,
            ...resolver(child)
        };
        const clone = React.cloneElement(child, props) as any;
        children.push(clone);
    });
    return children;
}

export interface HTMLElementProps {
    id?: string;
    className?: string;
}