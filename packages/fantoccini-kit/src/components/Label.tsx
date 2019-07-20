import { React, Component, Props, css, label } from './common'

import '../less/Label'

export interface LabelProps extends Props {
    text: string;
    position?: 'before' | 'after';
}

export const Label = (props: LabelProps) => {
    const { children, text, position = 'before' } = props;
    return <Component el={label} css={['label', css('label-$', position)]} {...props}>{
        position === 'before'
            ? (
                <>
                    <span>{text}</span>
                    {children}
                </>
            ) : (
                <>
                    {children}
                    <span>{text}</span>
                </>
            )
    }</Component>;
}