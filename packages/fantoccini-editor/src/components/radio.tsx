import * as React from 'react';
import { UIButton } from './button';
import { UICheckbox } from './checkbox';

import '../../less/ui-radio.less';

export class UIRadioButton extends UICheckbox {
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