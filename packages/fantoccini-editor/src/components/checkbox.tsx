import * as React from 'react';
import { Component } from 'react';
import { UIButton } from './button';
import { UILabel } from './label';
import { HTMLElementProps } from './util';
import '../../less/ui-checkbox.less';

export interface Props extends HTMLElementProps {
    isChecked?: boolean;
    name?: string;
    label?: string;
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
        const { label, id, className } = this.props;
        const content = (
            <UIButton 
                id={id}
                className={`ui-checkbox ${className || ''}`.trim()}
                onClick={this.onClick}
                toggled={this.state.isChecked}
            >
                {isChecked ? <span>x</span> : <span>&nbsp;</span>}
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

    componentDidUpdate(prevProps: Props) {
        const { isChecked } = this.props;
        if (prevProps.isChecked !== isChecked) {
            this.setState({ isChecked: isChecked })
        }
      }
}