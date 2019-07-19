import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Button } from './fantoccini-editor/src/components/Button';
import { Icon } from './fantoccini-editor/src/components/Icon';
import { Checkbox } from './fantoccini-editor/src/components/Checkbox';
import { RadioButton } from './fantoccini-editor/src/components/RadioButton';
import { HLayout, VLayout } from './fantoccini-editor/src/components/Grid';
import { Panel } from './fantoccini-editor/src/components/Panel';
import { Label } from './fantoccini-editor/src/components/Label';
import { InputGroup } from './fantoccini-editor/src/components/InputGroup';
import { TextField, NumericSpinnerField } from './fantoccini-editor/src/components/TextInput';
import './fantoccini-editor/less/_main';

const onClick = () => console.log('clicked');
const onCheckChanged = (isChecked: boolean) => console.log({ isChecked });
const onTextChanged = (text: string) => console.log('change', { text });
const onTextAccept = (text: string) => console.log('accept', { text });
const onKeyDown = (text: string, keyCode: number) => console.log('keydown', { text, keyCode });
const onKeyUp = (text: string, keyCode: number) => console.log('keyup', { text, keyCode });

const icon = <Icon id="icon1" className="custom-icon" src="./favicon.ico" />;

ReactDOM.render((
    <div id="example">
        <HLayout>
            <Panel title="Button">
                <HLayout>
                    <Button id="button1" className="custom-button" onClick={onClick} text="Label" />
                    <Button id="button2" className="custom-button" onClick={onClick} text="With Icon" icon={icon} />
                </HLayout>
            </Panel>
            <Panel title="Label">
                <Label id="label1" className="custom-label" text="A Label" />
                <Label className="custom-label" text="Label after icon" position="after"><Icon src="./favicon.ico" /></Label>
                <Label text="Label before icon"><Icon src="./favicon.ico" /></Label>
            </Panel>
            <Panel title="Checkbox">
                <VLayout hAlign="left">
                    <Checkbox id="checkbox1" className="custom-checkbox" isChecked={true} onChange={onCheckChanged} />
                    <Checkbox className="custom-checkbox" label="Label before" onChange={onCheckChanged} />
                    <Checkbox position="after" label="Label after" onChange={onCheckChanged} />
                </VLayout>
            </Panel>
            <Panel title="Radio">
                <VLayout hAlign="left">
                    <RadioButton id="radio1" className="custom-radio" isChecked={true} onChange={onCheckChanged} />
                    <RadioButton className="custom-radio" label="Label before" onChange={onCheckChanged} />
                    <RadioButton position="after" label="Label after" onChange={onCheckChanged} />
                </VLayout>
            </Panel>
        </HLayout>
        <HLayout>
            <Panel title="InputGroup">
                <Label text="RadioButton" />
                <InputGroup id="inputGroup1" className="custom-input-group" onChange={(name: string) => console.log({ name })}>
                    <RadioButton name="a" label="a" position="after" />
                    <RadioButton name="b" label="b" position="after" />
                    <RadioButton name="c" label="c" position="after" />
                </InputGroup>
            </Panel>
            <Panel title="InputGroup">
                <Label text="Button" />
                <InputGroup id="inputGroup2" className="custom-input-Group" direction="horizontal" onChange={(name: string) => console.log({ name })}>
                    <Button text="a" name="a" />
                    <Button text="b" name="b" />
                    <Button text="c" name="c" icon={<Icon src="img/logo.png" />} />
                </InputGroup>
            </Panel>
            <Panel id="textpanel" title="TextInput">
                <TextField label="Basic" onChange={onTextChanged} onAccept={onTextAccept} onKeyDown={onKeyDown} onKeyUp={onKeyUp} />
                <TextField label="With Text" text="text" onChange={onTextChanged} onAccept={onTextAccept} />
                <TextField label="Delay onChange 1sec" delayMs={1000} onChange={onTextChanged} onAccept={onTextAccept} />
                <NumericSpinnerField label="Basic" />
            </Panel>
        </HLayout>
    </div>
), document.getElementById('main'));