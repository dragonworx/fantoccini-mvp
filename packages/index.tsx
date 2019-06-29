import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BlitExample1, BlitExample2 } from 'react-blit/examples';
import {Blit} from 'react-blit/src/blit';

new Blit({width:50,height:60});

import './fantoccini-editor/less/main.less';

ReactDOM.render((
    <div>
        <BlitExample1 />
        <BlitExample2 />
    </div>
), document.getElementById('main'));