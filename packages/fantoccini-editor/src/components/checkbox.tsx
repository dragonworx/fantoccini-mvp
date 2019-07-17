import * as React from 'react';
import { Component } from 'react';
import { UIButton } from './button';
import { UILabel } from './label';
import { HTMLElementProps, UIInputGroupItemProps } from './util';
import '../../less/ui-checkbox.less';

export interface Props extends HTMLElementProps, UIInputGroupItemProps {
    label?: string;
    position?: 'before' | 'after';
}

export const defaultProps: Partial<Props> = {
    isChecked: false,
};

export interface State {
    checked: boolean,
}

export class UICheckbox extends Component<Props, State> {
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
            <UIButton 
                id={id}
                className={`ui-checkbox ${className || ''}`.trim()}
                onClick={this.onClick}
                toggled={checked}
            >
                {checked ? <span>x</span> : <span>&nbsp;</span>}
            </UIButton>
        );
        if (label) {
            return (
                <span className="ui-checkbox-container">
                    <UILabel text={label} position={position}>{content}</UILabel>
                </span>
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