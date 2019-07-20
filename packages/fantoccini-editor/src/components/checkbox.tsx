import '../less/Checkbox';
import * as React from 'react';
import { Component } from 'react';
import { Button } from './button';
import { Label } from './Label';
import { CssSelectableProps, InputGroupItemProps } from 'fantoccini-kit';

export interface Props extends CssSelectableProps, InputGroupItemProps {
    label?: string;
    position?: 'before' | 'after';
}

export const defaultProps: Partial<Props> = {
    isChecked: false,
};

export interface State {
    checked: boolean,
}

export class Checkbox extends Component<Props, State> {
    state = {
        checked: this.props.isChecked,
    };

    onClick = () => {
        const isChecked = !this.state.checked;
        const { onChange, name } = this.props;
        this.setState({ checked: isChecked });
        onChange && onChange(isChecked, name);
    };

    render() {
        const { checked } = this.state;
        const { label, id, className, position } = this.props;
        const content = (
            <Button 
                id={id}
                className={`checkbox ${className || ''}`.trim()}
                onClick={this.onClick}
                toggled={checked}
                text={checked ? 'x' : ' '}
            />
        );
        if (label) {
            return (
                <Label text={label} position={position}>{content}</Label>
            )
        }
        return content;
    }

    componentDidUpdate(prevProps: Props) {
        const { isChecked, isGroupSelected } = this.props;
        let checked: boolean | undefined;
        if (prevProps.isChecked !== isChecked) {
            checked = isChecked;
        }
        if (prevProps.isGroupSelected === true && isGroupSelected === false) {
            checked = false;
        }
        if (checked !== undefined) {
            this.setState({ checked });
        }
      }
}