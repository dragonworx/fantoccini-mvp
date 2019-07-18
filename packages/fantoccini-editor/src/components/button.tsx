import '../../less/Button';
import * as React from 'react';
import { Component, ReactElement } from 'react';
import { HTMLElementProps, InputGroupItemProps } from './util';
import { Props as IconProps, Icon } from './Icon';
import { Label } from './Label';

export enum UIButtonState {
    default,
    rollover,
    down,
}

export interface EventProps {
    onMouseOver?: () => void;
    onMouseOut?: () => void;
    onMouseDown?: () => void;
    onMouseUp?: () => void;
    onClick?: () => void;
}

export interface Props extends EventProps, HTMLElementProps, InputGroupItemProps {
    toggled: boolean;
    text?: string;
    icon?: ReactElement<IconProps>;
};

export const defaultProps: Partial<Props> = {
    toggled: false,
};

export interface State {
    state: UIButtonState;
}

export class Button extends Component<Props, State> {
    state = {
        state: UIButtonState.default,
    }

    static defaultProps = defaultProps;

    private setStateWithEvent(state: UIButtonState, name: keyof EventProps) {
        this.setState({ state }, () =>  this.props[name] && this.props[name]());
    }

    onMouseOver = () => this.setStateWithEvent(UIButtonState.rollover, 'onMouseOver');
    onMouseOut = () => this.setStateWithEvent(UIButtonState.default , 'onMouseOut');
    onMouseDown = () => this.setStateWithEvent(UIButtonState.down, 'onMouseDown');
    onMouseUp = () => this.setStateWithEvent(UIButtonState.rollover, 'onMouseUp');
    onClick = () => {
        const { onChange, name } = this.props;
        onChange && onChange(true, name);
        this.setStateWithEvent(UIButtonState.default, 'onClick');
    }

    renderButtonWithClass(cssClass: string) {
        const { state } = this.state;
        const { className, toggled, id, text, icon, children } = this.props;
        return (
            <button
                id={id}
                className={`button button-${cssClass} ${className || ''} ${state !== UIButtonState.rollover && toggled ? 'button-toggled' : ''}`.trim()}
                onMouseOver={this.onMouseOver}
                onMouseOut={this.onMouseOut}
                onMouseDown={this.onMouseDown}
                onMouseUp={this.onMouseUp}
                onClick={this.onClick}
            >
                <Label text={text}>{icon ? icon : null}</Label>
                { children }
            </button>
        );
    }

    render() {
        const { state } = this.state;
        const { isGroupSelected } = this.props;
        if (state === UIButtonState.down || isGroupSelected) {
            return this.renderButtonWithClass('down');
        } else if (state === UIButtonState.default) {
            return this.renderButtonWithClass('default');
        } else if (state === UIButtonState.rollover) {
            return this.renderButtonWithClass('rollover');
        } else {
            throw new Error('No button state');
        }
    }
}