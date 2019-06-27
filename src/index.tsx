import './fantoccini-editor/less/main.less';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BlitExample1, BlitExample2 } from './fantoccini-editor/react-blit/examples';

ReactDOM.render((
    <>
    <BlitExample1 />
    <BlitExample2 />
    </>
), document.getElementById('main'));