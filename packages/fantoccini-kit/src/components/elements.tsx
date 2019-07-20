import { React, FC } from './common'
import { CssSelectableProps } from '../util';

export interface ComponentProps extends CssSelectableProps {
    el: any;
    css?: string | (string | undefined)[];
    style?: {};
    attributes?: {[k:string]: string};
}

export const Component: FC<ComponentProps> = props => {
    const { el: E, css, attributes, ...otherProps } = props;
    const { className, children, id, style, ...customProps } = otherProps;
    const cssClasses = (typeof css === 'string' ? [css, className] : [...css, className]).filter(name => typeof name === 'string').join(' ');
    return <E className={cssClasses || undefined} {...attributes} {...otherProps}>{ children }</E>;
}