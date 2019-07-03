import * as React from 'react';
import { Component } from 'react';

import '../../less/ui-button.less';

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

export interface Props extends EventProps {
    className?: string;
    toggled: boolean;
    radius: number;
};

export const defaultProps: Partial<Props> = {
    className: '',
    toggled: false,
    radius: 5,
};

export interface State {
    state: UIButtonState;
}

export class UIButton extends Component<Props, State> {
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
    onClick = () => this.setStateWithEvent(UIButtonState.default, 'onClick');

    renderButtonWithClass(cssClass: string) {
        const { state } = this.state;
        const { className, toggled, radius } = this.props;
        return (
            <button
                className={`ui-button ui-button-${cssClass} ${className} ${state !== UIButtonState.rollover && toggled ? 'ui-button-toggled' : ''}`}
                onMouseOver={this.onMouseOver}
                onMouseOut={this.onMouseOut}
                onMouseDown={this.onMouseDown}
                onMouseUp={this.onMouseUp}
                onClick={this.onClick}
                style={{ borderRadius: radius }}
            >{this.props.children}</button>
        );
    }

    render() {
        const { state } = this.state;
        if (state === UIButtonState.default) {
            return this.renderButtonWithClass('default');
        } else if (state === UIButtonState.rollover) {
            return this.renderButtonWithClass('rollover');
        } else if (state === UIButtonState.down) {
            return this.renderButtonWithClass('down');
        } else {
            throw new Error('No button state');
        }
    }
}