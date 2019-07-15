import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { UIButton } from './fantoccini-editor/src/components/button';
import { UIIcon } from './fantoccini-editor/src/components/icon';
import { UICheckbox } from './fantoccini-editor/src/components/checkbox';
import { UIRadioButton } from './fantoccini-editor/src/components/radio';
import { UIRadioButtonGroup } from './fantoccini-editor/src/components/radioGroup';
import { UIGrid, UIGridRow, UIGridCell } from './fantoccini-editor/src/components/grid';

import './fantoccini-editor/less/main.less';

ReactDOM.render((
    <>
        <UIButton onClick={() => console.log("clicked")}>
            foo
            <UIIcon src="./favicon.ico" />
        </UIButton>
        <UICheckbox isChecked={true} onChange={(isChecked: boolean) => console.log({isChecked})} />
        <UIRadioButton onChange={(isChecked: boolean) => console.log({isChecked})} />
        <UIRadioButtonGroup selected="b" onChange={(selected: string) => console.log({selected})}>
            <UIRadioButton name="a" />
            <UIRadioButton name="b" />
            <UIRadioButton name="c" />
        </UIRadioButtonGroup>
        <UIGrid>
            <UIGridRow>
                <UIGridCell>1</UIGridCell>
                <UIGridCell>2</UIGridCell>
                <UIGridCell>3</UIGridCell>
            </UIGridRow>
            <UIGridRow>
                <UIGridCell hAlign="left">4</UIGridCell>
                <UIGridCell hAlign="center">5</UIGridCell>
                <UIGridCell hAlign="right">6</UIGridCell>
            </UIGridRow>
            <UIGridRow>
                <UIGridCell hAlign="left" vAlign="top">7</UIGridCell>
                <UIGridCell hAlign="center" vAlign="center">8</UIGridCell>
                <UIGridCell hAlign="right" vAlign="bottom">9</UIGridCell>
            </UIGridRow>
            <UIGridRow hAlign="center" vAlign="bottom">
                <UIGridCell>10</UIGridCell>
                <UIGridCell>11</UIGridCell>
                <UIGridCell>12</UIGridCell>
            </UIGridRow>
        </UIGrid>
    </>
), document.getElementById('main'));