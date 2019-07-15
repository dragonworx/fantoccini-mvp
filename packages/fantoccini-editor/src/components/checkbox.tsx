import * as React from 'react';
import { Component } from 'react';
import { UIButton } from './button';

import '../../less/ui-checkbox.less';

export interface Props {
    isChecked?: boolean;
    name?: string;
    onChange?: (isChecked: boolean, name?: string) => void;
}

export const defaultProps: Partial<Props> = {
    isChecked: true,
};

export interface State {
    isChecked?: boolean,
}

export class UICheckbox extends Component<Props, State> {
    state = {
        isChecked: this.props.isChecked,
    };

    onClick = () => {
        const isChecked = !this.state.isChecked;
        const { name, onChange } = this.props;
        this.setState({ isChecked: isChecked });
        onChange && onChange(isChecked, name);
    };

    render() {
        const { isChecked } = this.state;
        return (
            <UIButton 
                onClick={this.onClick}
                className="ui-checkbox" 
                toggled={this.state.isChecked}
            >
                {isChecked ? <span>x</span> : <span>&nbsp;</span>}
            </UIButton>
        )
    }

    componentDidUpdate(prevProps: Props, prevState: Props) {
        const { isChecked } = this.props;
        if (prevProps.isChecked !== isChecked) {
            this.setState({ isChecked: isChecked })
        }
      }
}