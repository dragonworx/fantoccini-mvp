import '../../less/TextInput';
import * as React from 'react';
import { Component, SyntheticEvent, KeyboardEvent } from 'react';
import { HTMLElementProps, blur } from './util';

export interface Props extends HTMLElementProps {
    text?: string;
    delayMs?: number;
    onKeyDown?: (text: string, keyCode: number) => void;
    onKeyUp?: (text: string, keyCode: number) => void;
    onChange?: (text: string) => void;
    onAccept?: (text: string) => void;
}

export interface State {
    text: string;
}

export class TextInput extends Component<Props, State> {
    timeoutId?: number;

    state = {
        text: this.props.text,
    }

    static defaultProps = {
        text: '',
        delayMs: 0,
    }

    clearTimeoutId() {
        if (this.timeoutId) {
            clearTimeout(this.timeoutId);
        }
    }

    onChange = (e: SyntheticEvent<HTMLInputElement>) => {
        const { currentTarget } = e;
        const { onChange, delayMs } = this.props;
        const text = currentTarget.value;
        this.setState({ text })
        if (delayMs > 0) {
            this.clearTimeoutId();
            this.timeoutId = setTimeout(() => {
                onChange && onChange(text);
                delete this.timeoutId;
            }, delayMs);
        } else {
            onChange && onChange(text);
        }
    };

    onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        const { keyCode } = e;
        const { onKeyDown } = this.props;
        onKeyDown && onKeyDown(this.state.text, keyCode);
    };

    onKeyUp = (e: KeyboardEvent<HTMLInputElement>) => {
        const { keyCode } = e;
        const { onAccept, onKeyUp } = this.props;
        onKeyUp && onKeyUp(this.state.text, keyCode);
        if (keyCode === 13) {
            onAccept && onAccept(this.state.text);
        } else if (keyCode === 27) {
            blur();
        }
    };

    render() {
        const { id, className } = this.props;
        const { text } = this.state;
        return <input 
            id={id} 
            className={`text-input ${className || ''}`.trim()} 
            type="text" 
            onChange={this.onChange} 
            value={text} 
            onKeyDown={this.onKeyDown}
            onKeyUp={this.onKeyUp}
        />;
    }

    componentDidUpdate(prevProps: Props) {
        console.log("!", prevProps);
    }
}

export interface NumericSpinnerProps extends HTMLElementProps {
    value: number;
}

export interface NumericSpinnerState {
    value: number;
}

export class NumericSpinner extends Component<NumericSpinnerProps, NumericSpinnerState> {
    static defaultProps = {
        value: 0,
    }

    state = {
        value: this.props.value,
    }

    render() {
        const { value } = this.state;
        const { id, className } = this.props;
        return <p></p>;
    }
}