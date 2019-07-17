import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { UIButton } from './fantoccini-editor/src/components/button';
import { UIIcon } from './fantoccini-editor/src/components/icon';
import { UICheckbox } from './fantoccini-editor/src/components/checkbox';
import { UIRadioButton } from './fantoccini-editor/src/components/radio';
import { UIGrid, UIGridRow, UIGridCell, HLayout, VLayout } from './fantoccini-editor/src/components/grid';
import { UIPanel } from './fantoccini-editor/src/components/panel';
import { UILabel } from './fantoccini-editor/src/components/label';
import { UIInputGroup } from './fantoccini-editor/src/components/inputGroup';
import './fantoccini-editor/less/main.less';

const onChange = (isChecked: boolean) => console.log({ isChecked });

ReactDOM.render((
    <div id="example">
        <HLayout>
            <UIPanel>
                Button
                <HLayout>
                    <UIButton id="button1" className="button" onClick={() => console.log("clicked")}>
                        Label
                    </UIButton>
                    <UIButton id="button2" className="button" onClick={() => console.log("clicked")}>
                        With Icon
                        <UIIcon id="icon1" className="icon" src="./favicon.ico" />
                    </UIButton>
                </HLayout>
            </UIPanel>
            <UIPanel>
                Label
                <UILabel id="label1" className="label" text="A Label" />
                <UILabel className="label" text="Label after icon"><UIIcon src="./favicon.ico" /></UILabel>
                <UILabel text="Label before icon" position="before"><UIIcon src="./favicon.ico" /></UILabel>
            </UIPanel>
        </HLayout>
        <HLayout>
            <UIPanel>
                Checkbox
                <VLayout hAlign="left">
                    <UICheckbox id="checkbox1" className="checkbox" isChecked={true} onChange={onChange} />
                    <UICheckbox className="checkbox" position="before" label="Label before" onChange={onChange} />
                    <UICheckbox position="after" label="Label after" onChange={onChange} />
                </VLayout>
            </UIPanel>
            <UIPanel>
                Radio
                <VLayout hAlign="left">
                    <UIRadioButton id="radio1" className="radio" isChecked={true} onChange={onChange} />
                    <UIRadioButton className="radio" position="before" label="Label before" onChange={onChange} />
                    <UIRadioButton position="after" label="Label after" onChange={onChange} />
                </VLayout>
            </UIPanel>
        </HLayout>
        <HLayout>
            <UIPanel>
                InputGroup
                <UILabel text="RadioButton" />
                <UIInputGroup id="inputGroup1" className="inputGroup" onChange={(name: string) => console.log({ name })}>
                    <UIRadioButton name="a" label="a" />
                    <UIRadioButton name="b" label="b" />
                    <UIRadioButton name="c" label="c" />
                </UIInputGroup>
            </UIPanel>
            <UIPanel>
                InputGroup
                <UILabel text="Button" />
                <UIInputGroup id="inputGroup2" className="inputGroup" direction="horizontal" onChange={(name: string) => console.log({ name })}>
                    <UIButton name="a">a</UIButton>
                    <UIButton name="b">b</UIButton>
                    <UIButton name="c">c</UIButton>
                </UIInputGroup>
            </UIPanel>
        </HLayout>
    </div>
), document.getElementById('main'));