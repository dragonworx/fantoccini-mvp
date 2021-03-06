import { React, Component, Props, px, img } from './common'

import '../less/Icon'

export interface IconProps extends Props {
    src: string;
    size?: number;
}

export const Icon = (props: IconProps) => {
    const { size = 32 } = props;
    return <Component el={img} css="icon" attributes={{ width: px(size) }} {...props} />;
}