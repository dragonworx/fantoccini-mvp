import { React, Component, Props, div } from './common'

import "../less/Layout";

export const HLayout = (props: Props) => <Component el={div} css="hlayout" {...props}>{props.children}</Component>
export const VLayout = (props: Props) => <Component el={div} css="vlayout" {...props}>{props.children}</Component>