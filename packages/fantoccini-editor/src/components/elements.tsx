import * as React from 'react';
import { FunctionComponent as FC } from 'react';
import { CssSelectableProps } from 'fantoccini-kit';

export const div: FC = (props: any) => <div {...props}>{ props.children }</div>;
export const span: FC = (props: any) => <span {...props}>{ props.children }</span>;
export const form: FC = (props: any) => <form {...props}>{ props.children }</form>;
export const input: FC = (props: any) => <input type="text" {...props}>{ props.children }</input>;
export const textarea: FC = (props: any) => <textarea type="text" {...props}>{ props.children }</textarea>;
export const button: FC = (props: any) => <button {...props}>{ props.children }</button>;
export const label: FC = (props: any) => <button {...props}>{ props.children }</button>;
export const img: FC = (props: any) => <img {...props}>{ props.children }</img>;
export const table: FC = (props: any) => <table {...props}>{ props.children }</table>;
export const thead: FC = (props: any) => <thead {...props}>{ props.children }</thead>;
export const tbody: FC = (props: any) => <tbody {...props}>{ props.children }</tbody>;
export const th: FC = (props: any) => <th {...props}>{ props.children }</th>;
export const td: FC = (props: any) => <td {...props}>{ props.children }</td>;

export interface WrapperProps extends CssSelectableProps {
    type: any;
    css?: string;
    style?: {}
}

const Str = (str: any) => str ? str : '';

export const Wrapper: FC<WrapperProps> = ({ id, className, css, children, style, type: E }) => <E id={id} className={`${Str(css)} ${Str(className)}`.trim() || undefined} style={style}>{ children }</E>