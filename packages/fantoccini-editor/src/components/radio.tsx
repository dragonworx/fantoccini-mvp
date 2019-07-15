import * as React from 'react';
import { UIButton } from './button';
import { UICheckbox } from './checkbox';

import '../../less/ui-radio.less';

export class UIRadioButton extends UICheckbox {
    onClick = () => {
        if (this.state.isChecked) {
            return;
        }
        const isChecked = !this.state.isChecked;
        const { name, onChange } = this.props;
        this.setState({ isChecked: isChecked });
        onChange && onChange(isChecked, name);
    };

    render() {
        const { isChecked } = this.state;
        return (
            <UIButton 
                radius={20}
                onClick={this.onClick}
                className="ui-checkbox ui-radio" 
                toggled={this.state.isChecked}
            >
                {isChecked ? <span className="radio"></span> : <span>&nbsp;</span>}
            </UIButton>
        )
    }
}