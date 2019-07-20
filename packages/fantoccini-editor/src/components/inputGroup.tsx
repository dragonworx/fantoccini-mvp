import '../less/InputGroup';
import * as React from 'react';
import { Component, ReactElement } from 'react';
import { HLayout, VLayout, GridAlignProps } from './Grid';
import { CssSelectableProps, InputGroupItemProps, cloneChildren } from 'fantoccini-kit';

export interface Props extends CssSelectableProps, GridAlignProps {
    selected?: string;
    direction: 'vertical' | 'horizontal';
    onChange?: (name: string) => void;
}

export interface State {
    selected?: string;
}

export class InputGroup extends Component<Props, State> {
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
        const children = cloneChildren(this.props.children, (child: ReactElement<InputGroupItemProps>) => ({
            onChange: this.onChange,
            isGroupSelected: selected === child.props.name,
        }));
        const Layout = direction === 'vertical' ? VLayout : HLayout;
        return <Layout id={id} className={`input-group ${className || ''}`} hAlign={hAlign} vAlign={vAlign}>{children}</Layout>;
    }
}
