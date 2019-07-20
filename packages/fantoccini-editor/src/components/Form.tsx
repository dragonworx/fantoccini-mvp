import * as React from 'react';
import { FunctionComponent as FC } from 'react';
import { Wrapper, form } from './elements'
import { CssSelectableProps } from 'fantoccini-kit';

export interface FormProps extends CssSelectableProps {}

export const Form: FC<FormProps> = (props: FormProps) => <Wrapper {...props} type={form}>I'm formy</Wrapper>