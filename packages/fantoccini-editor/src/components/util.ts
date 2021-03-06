import * as React from 'react';
import { ReactNode, ReactElement} from 'react';

export function cloneChildren(propsChildren: ReactNode, resolver: (child: ReactElement<any>) => {}) {
    const children: any[] = React.Children.map(propsChildren, (child: ReactElement<any>, i: number) => {
        const props = {
            key: i,
            index: i,
            ...resolver(child)
        };console.log(props);
        return React.cloneElement(child, props) as any;
    });
    return children;
}

export interface HTMLElementProps {
    id?: string;
    className?: string;
}

export interface InputGroupItemProps {
    name?: string;
    isChecked?: any;
    isGroupSelected?: boolean;
    onChange?: (isChecked: boolean, name?: string) => void;
}

export function blur() {
    const el = document.createElement('input');
    el.style.cssText = 'position:absolute';
    document.body.appendChild(el);
    el.focus();
    document.body.removeChild(el);
}