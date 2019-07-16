import * as React from 'react';
import { Component, ReactElement } from 'react';
import { Props as UIRadioButtonProps } from './checkbox';
import { cloneChildren, HTMLElementProps } from './util';

export interface Props extends HTMLElementProps {
    selected: string;
    direction: 'vertical' | 'horizontal';
    onChange?: (selected: string) => void;
    children: ReactElement<UIRadioButtonProps>[];
}

export interface State {
    currentName?: string;
}

export class UIRadioButtonGroup extends Component<Props, State> {
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
        const { direction, id, className } = this.props;
        const children = cloneChildren(this.props.children, (child: ReactElement<UIRadioButtonProps>) => ({
            onChange: this.onChange,
            isChecked: currentName === child.props.name,
        }));
        return <div id={id} className={`ui-radio-group ui-radio-group-${direction} ${className || ''}`.trim()}>{children}</div>;
    }
}