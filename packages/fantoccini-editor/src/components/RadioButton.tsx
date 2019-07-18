import '../../less/RadioButton';
import * as React from 'react';
import { Button } from './Button';
import { Checkbox } from './Checkbox';
import { Label } from './Label';

export class RadioButton extends Checkbox {
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
            <Button 
                id={id}
                className={`checkbox radio ${className || ''}`.trim()}
                onClick={this.onClick}
                toggled={isChecked}
            >
                {isChecked ? <span className="radio"></span> : <span>&nbsp;</span>}
            </Button>
        );
        if (label) {
            return (
                <Label position={position} text={label}>{content}</Label>
            )
        }
        return content;
    }
}