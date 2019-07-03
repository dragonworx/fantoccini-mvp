import * as React from 'react';
import { Component } from 'react';
import { UIButton } from './button';

import '../../less/ui-checkbox.less';

export interface Props {
    isChecked: boolean;
}

export const defaultProps: Partial<Props> = {
    isChecked: true,
};

export interface State {
    isChecked: boolean,
}

export class UICheckbox extends Component<Props, State> {
    state = {
        isChecked: this.props.isChecked,
    };

    onClick = () => this.setState({ isChecked: !this.state.isChecked });

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
}