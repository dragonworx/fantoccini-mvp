import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { UIButton } from './fantoccini-editor/src/components/button';
import { UIIcon } from './fantoccini-editor/src/components/icon';
import { UICheckbox } from './fantoccini-editor/src/components/checkbox';
import { UIRadioButton } from './fantoccini-editor/src/components/radio';

import './fantoccini-editor/less/main.less';

ReactDOM.render((
    <>
        <UIButton>
            foo
            <UIIcon src="./favicon.ico" />
        </UIButton>
        <UICheckbox isChecked={true} />
        <UIRadioButton isChecked={true} />
    </>
), document.getElementById('main'));