import * as React from 'react';
import { Component, ReactElement } from 'react';
import { Props as UIRadioButtonProps } from './checkbox';
import { cloneChildren } from './util';

export interface Props {
    onChange?: (selected: string) => void;
    selected: string;
}

export interface State {
    currentName?: string;
}

export class UIRadioButtonGroup extends Component<Props, State> {
    state: State = {
        currentName: this.props.selected,
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
        const children = cloneChildren(this.props.children, (child: ReactElement<UIRadioButtonProps>) => ({
            onChange: this.onChange,
            isChecked: currentName === child.props.name,
        }));
        return <div className="ui-radio-group">{children}</div>;
    }
}