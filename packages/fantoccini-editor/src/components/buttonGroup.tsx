import * as React from 'react';
import { Component, ReactElement } from 'react';
import { Props as UIButtonProps } from './button';
import { cloneChildren } from './util';

export interface Props {
    selected: string;
    direction: 'vertical' | 'horizontal';
    onChange?: (selected: string) => void;
    children: ReactElement<UIButtonProps>[];
}

export interface State {
    currentName?: string;
}

export class UIButtonGroup extends Component<Props, State> {
    state: State = {
        currentName: this.props.selected,
    };

    static defaultProps = {
        direction: 'horizontal',
    };

    onChange = (isChecked: boolean, name?: string) => {
        const { onChange } = this.props;
        const { currentName } = this.state;
        if (currentName !== name) {
            this.setState({ currentName: name });
            onChange && onChange(name);
        }
    };

    render() {
        const { currentName } = this.state;
        const { direction } = this.props;
        const children = cloneChildren(this.props.children, (child: ReactElement<UIButtonProps>) => ({
            onChange: this.onChange,
            isChecked: currentName === child.props.id,
        }));
        return <div className={`ui-radio-group ui-radio-group-${direction}`}>{children}</div>;
    }
}