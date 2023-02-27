import React, { useEffect, useState } from "react";

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

import utils from "../../utils";

function Orden(props) {

    useEffect(() => {

    }, []);

    return (
        <div>
            <DataTable value={props.items}  >
                <Column field="cantidad" header="Cantidad"></Column>
                <Column field="nombreItem" header="Item"></Column>
                <Column field="nombreIte" header="Acciones"></Column>
            </DataTable>
        </div>
    );
}

Orden.defaultProps = {
    items: []
}

export default Orden;
