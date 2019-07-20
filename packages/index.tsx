import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Icon, Label, Grid, Row, Cell } from 'fantoccini-kit';

import 'fantoccini-kit/src/less/_main';

ReactDOM.render((
    <>
        <Label text="abc" position="after"><Icon id="icon1" className="custom-icon" src="./favicon.ico" /></Label>
        <Grid id="grid1" spacing={10} padding={15}>
            <Row>
                <Cell width="100%">1</Cell>
                <Cell>2njd fdjfd hjfd </Cell>
            </Row>
        </Grid>
    </>
), document.getElementById('main'));