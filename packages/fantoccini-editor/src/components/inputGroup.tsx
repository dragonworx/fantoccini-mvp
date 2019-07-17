import * as React from 'react';
import { Component, ReactElement } from 'react';
import { HLayout, VLayout, UIGridAlignProps } from './grid';
import { HTMLElementProps, UIInputGroupItemProps, cloneChildren } from './util';

export interface Props extends HTMLElementProps, UIGridAlignProps {
    selected?: string;
    direction: 'vertical' | 'horizontal';
    onChange?: (name: string) => void;
}

export interface State {
    selected?: string;
}

export class UIInputGroup extends Component<Props, State> {
    state: State = {
        selected: this.props.selected,
    };

    static defaultProps = {
        direction: 'vertical',
    };

    onChange = (isChecked: boolean, name: string) => {
        const { onChange } = this.props;
        const { selected } = this.state;
        if (selected !== name) {
            this.setState({ selected: name });
            onChange && onChange(name);
        }
    };

    render() {
        const { selected } = this.state;
        const { direction, id, className, hAlign, vAlign } = this.props;
        const children = cloneChildren(this.props.children, (child: ReactElement<UIInputGroupItemProps>) => ({
            onChange: this.onChange,
            isGroupSelected: selected === child.props.name,
        }));
        const Layout = direction === 'vertical' ? VLayout : HLayout;
        return <Layout id={id} className={`ui-input-group ${className || ''}`} hAlign={hAlign} vAlign={vAlign}>{children}</Layout>;
    }
}
