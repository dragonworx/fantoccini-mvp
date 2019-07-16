import * as React from 'react';
import { UIButton } from './button';
import { UICheckbox } from './checkbox';
import { UILabel } from './label';
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
        const { label, id, className } = this.props;
        const content = (
            <UIButton 
                id={id}
                className={`ui-checkbox ui-radio ${className || ''}`.trim()}
                radius={20}
                onClick={this.onClick}
                toggled={this.state.isChecked}
            >
                {isChecked ? <span className="radio"></span> : <span>&nbsp;</span>}
            </UIButton>
        );
        if (label) {
            return (
                <span className="ui-checkbox-container">
                    {content}
                    <UILabel>{label}</UILabel>
                </span>
            )
        }
        return content;
    }
}