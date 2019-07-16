import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { UIButton } from './fantoccini-editor/src/components/button';
import { UIIcon } from './fantoccini-editor/src/components/icon';
import { UICheckbox } from './fantoccini-editor/src/components/checkbox';
import { UIRadioButton } from './fantoccini-editor/src/components/radio';
import { UIRadioButtonGroup } from './fantoccini-editor/src/components/radioGroup';
import { UIGrid, UIGridRow, UIGridCell } from './fantoccini-editor/src/components/grid';
import { UIPanel } from './fantoccini-editor/src/components/panel';
import { UILabel } from './fantoccini-editor/src/components/label';
import { UIButtonGroup } from './fantoccini-editor/src/components/buttonGroup';

import './fantoccini-editor/less/main.less';

ReactDOM.render((
    <div id="example">
        <UIButton id="button1" className="button1" onClick={() => console.log("clicked")}>
            foo
            <UIIcon id="icon1" className="icon1" src="./favicon.ico" />
        </UIButton>
        <UICheckbox id="checkbox1" className="checkbox1" isChecked={true} onChange={(isChecked: boolean) => console.log({isChecked})} />
        <UIRadioButton id="radio1" className="radio1"  onChange={(isChecked: boolean) => console.log({isChecked})} />
        <UICheckbox label="Checkbox" isChecked={true} onChange={(isChecked: boolean) => console.log({isChecked})} />
        <UIRadioButton label="Radio" onChange={(isChecked: boolean) => console.log({isChecked})} />
        <UIRadioButtonGroup id="radiogroup1" className="radiogroup1" selected="b" onChange={(selected: string) => console.log({selected})}>
            <UIRadioButton name="a" label="a" />
            <UIRadioButton name="b" label="b" />
            <UIRadioButton name="c" label="c" />
        </UIRadioButtonGroup>
        <UIRadioButtonGroup direction="vertical" selected="b" onChange={(selected: string) => console.log({selected})}>
            <UIRadioButton name="a" label="a" />
            <UIRadioButton name="b" label="b" />
            <UIRadioButton name="c" label="c" />
        </UIRadioButtonGroup>
        <UIGrid id="grid1" className="grid1">
            <UIGridRow id="grid-row1" className="grid-row1">
                <UIGridCell id="grid-cell1" className="grid-cell1">1</UIGridCell>
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
        <UIPanel id="panel1" className="panel1">
            Panel
            <UILabel id="label1" className="label1">Label <UIIcon src="./favicon.ico" /></UILabel>
        </UIPanel>
        {/* <UIButtonGroup selected="b" onChange={(selected: string) => console.log({selected})}>
            <UIButton>a</UIButton>
            <UIButton>b</UIButton>
            <UIButton>c</UIButton>
        </UIButtonGroup>
        <UIButtonGroup direction="vertical" selected="b" onChange={(selected: string) => console.log({selected})}>
            <UIButton id="a">a</UIButton>
            <UIButton>b</UIButton>
            <UIButton>c</UIButton>
        </UIButtonGroup> */}
    </div>
), document.getElementById('main'));