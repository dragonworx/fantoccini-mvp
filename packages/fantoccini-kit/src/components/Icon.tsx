import { React, Component, Props, img } from './common'

import '../less/Icon'

export interface IconProps extends Props {
    src: string;
    size?: number;
}

export const Icon = (props: IconProps) => {
    const { size = 32 } = props;
    return <Component el={img} css="icon" style={{ width: size }} {...props} />;
}