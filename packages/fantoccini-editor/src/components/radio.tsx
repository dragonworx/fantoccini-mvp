import * as React from 'react';
import { UIButton } from './button';
import { UICheckbox } from './checkbox';
import { UILabel } from './label';
import '../../less/ui-radio.less';

export class UIRadioButton extends UICheckbox {
    onClick = () => {
        if (this.state.checked) {
            return;
        }
        const { onChange, name } = this.props;
        this.setState({ checked: true });
        onChange && onChange(true, name);
    };

    render() {
        const { checked } = this.state;
        const { label, id, className, isGroupSelected, position } = this.props;
        const isChecked = isGroupSelected === true ? true : checked;
        const content = (
            <UIButton 
                id={id}
                className={`ui-checkbox ui-radio ${className || ''}`.trim()}
                radius={20}
                onClick={this.onClick}
                toggled={isChecked}
            >
                {isChecked ? <span className="radio"></span> : <span>&nbsp;</span>}
            </UIButton>
        );
        if (label) {
            return (
                <span className="ui-checkbox-container">
                    <UILabel position={position} text={label}>{content}</UILabel>
                </span>
            )
        }
        return content;
    }
}