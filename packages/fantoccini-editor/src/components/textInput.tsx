import '../less/TextInput';
import * as React from 'react';
import { Component, SyntheticEvent, KeyboardEvent } from 'react';
import { CssSelectableProps, blur } from 'fantoccini-kit';
import { Label } from './Label';
import { Block } from './grid';

export interface KeyEventProps {
    onKeyDown?: (text: string, keyCode: number) => void;
    onKeyUp?: (text: string, keyCode: number) => void;
    onChange?: (text: string) => void;
    onAccept?: (text: string) => void;
}

export interface TextInputProps extends CssSelectableProps, KeyEventProps {
    text?: string;
    delayMs?: number;
}

export interface TextInputState {
    text: string;
}

export class TextInput extends Component<TextInputProps, TextInputState> {
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

    componentDidUpdate(prevProps: TextInputProps) {
        if (prevProps.text !== this.props.text) {
            this.setState({ text: this.props.text });
        }
    }
}

/* TextField */

export interface FieldProps {
    label: string;
    position?: 'before' | 'after',
}

export interface TextFieldProps extends KeyEventProps, TextInputProps, FieldProps {

}

export class TextField extends Component<TextFieldProps, {}> {
    render() {
        const { id, className, label, position, onChange, onAccept, onKeyDown, onKeyUp, text, delayMs } = this.props;
        return (
            <Block id={id} className={`text-field ${className || ''}`}>
                <Label text={label} position={position}>
                    <TextInput onChange={onChange} onAccept={onAccept} onKeyDown={onKeyDown} onKeyUp={onKeyUp} text={text} delayMs={delayMs} />
                </Label>
            </Block>
        )
    }
}

/* NumericSpinner */

export interface NumericSpinnerProps extends CssSelectableProps {
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
        return 'a';
    }
}

export interface NumericSpinnerFieldProps extends FieldProps, CssSelectableProps {

}

export class NumericSpinnerField extends Component<NumericSpinnerFieldProps, {}> {
    render() {
        const { id, className, label, position } = this.props;
        return (
            <Block id={id} className={`text-field ${className || ''}`}>
                <Label text={label} position={position}>
                    <span>blag</span>
                </Label>
            </Block>
        )
    }
}