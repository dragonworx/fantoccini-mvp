import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Icon, Label, Table, Row, Cell, HLayout, VLayout } from 'fantoccini-kit';

import 'fantoccini-kit/src/less/_main';
import { HTable, VTable } from 'fantoccini-kit/src/components/Table';

ReactDOM.render((
    <>
        <Label text="abc" position="after"><Icon id="icon1" className="custom-icon" src="./favicon.ico" /></Label>
        <Table id="table1" spacing={10} padding={15} columns={[0.3, 0.3, 0.3]}>
        <Row>
                <Cell>
                    <HTable columns={[1]}>
                        <span>a</span>
                        <span>b</span>
                        <span>c</span>
                    </HTable>
                </Cell>
                <Cell>
                    <VTable>
                        <span>a</span>
                        <span>b</span>
                        <span>c</span>
                    </VTable>
                </Cell>
                <Cell>
                    <HLayout id="test">
                        <span>a</span>
                        <span>b</span>
                        <span>c</span>
                    </HLayout>
                </Cell>
            </Row>
            <Row>
                <Cell>
                    <VLayout>
                        <span>a</span>
                        <span>b</span>
                        <span>c</span>
                    </VLayout>
                </Cell>
                <Cell>
                    <HLayout>
                        <span>a</span>
                        <span>b</span>
                        <span>c</span>
                    </HLayout>
                </Cell>
                <Cell>
                    <HLayout>
                        <span>a</span>
                        <span>b</span>
                        <span>c</span>
                    </HLayout>
                </Cell>
            </Row>
        </Table>
    </>
), document.getElementById('main'));