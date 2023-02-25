import React, { useState } from "react";

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

function Orden(props) {
    return (
        <div>
            <DataTable value={props.items} tableStyle={{ minWidth: '50rem' }}>
                <Column field="code" header="Code"></Column>
                <Column field="name" header="Name"></Column>
            </DataTable>
        </div>
    );
}

Orden.defaultProps = {
    items: []
}

export default Orden;
