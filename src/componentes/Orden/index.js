import React, { useEffect, useState } from "react";

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { SplitButton } from 'primereact/splitbutton';

import utils from "../../utils";
import { Button } from "primereact/button";



function Orden(props) {

    const buttonTemplate = (data) => (
        <>
            <Button label="X" onClick={() => {
                props.quitarUnItemOrden(data.nombreItem);
            }} />
        </>
    );

    useEffect(() => {

    }, []);

    return (
        <div>
            <DataTable value={props.items}  >
                <Column field="cantidad" header="Cantidad"></Column>
                <Column field="nombreItem" header="Item"></Column>
                <Column field="nombreIte" header="Acciones" body={buttonTemplate}></Column>
            </DataTable>
        </div>
    );
}

Orden.defaultProps = {
    items: []
}

export default Orden;
