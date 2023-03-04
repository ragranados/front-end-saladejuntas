import React, { useEffect, useState } from "react";

import "./index.css"

import ServiciosOrden from "../../servicios/orden.servicios";

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

function MesasActivas() {

  const [ordenes, setOrdenes] = useState([]);
  const [expandedRows, setExpandedRows] = useState(null);

  useEffect(() => {

    async function fetchData() {

      const resObtenerOrdenesPorEstado = await ServiciosOrden.obtenerOrdenesPorEstado(1);
      console.log(resObtenerOrdenesPorEstado.data);
      setOrdenes(resObtenerOrdenesPorEstado.data);
    }

    fetchData();

  }, []);

  const rowTemplate = (rowData) => {
    return (
      <div style={{ marginRight: "30px" }}>
        {rowData.product.nombreEnFactura}
      </div>
    )
  }

  const rowExpansionTemplate = (data) => {
    console.log("Adentro", data.orderItems);
    return (
      <div className="p-3">
        <DataTable value={data.orderItems}>
          <Column body={rowTemplate} header={"Producto"} style={{ width: '5rem' }} />
          <Column field="cantidad" header="Cantidad"></Column>
        </DataTable>
      </div>
    );
  };

  return (
    <div className="contenedor">
      <div>

        <h3>Ordenes activas</h3>

        <DataTable value={ordenes} tableStyle={{ minWidth: '50rem' }} expandedRows={expandedRows} dataKey="mesaId"
          onRowToggle={(e) => setExpandedRows(e.data)} rowExpansionTemplate={rowExpansionTemplate}>
          <Column expander={true} style={{ width: '5rem' }} />
          <Column style={{ width: '5rem' }} />
          <Column field="mesaId" header="Nro de mesa"></Column>
          <Column field="total" header="Total"></Column>
        </DataTable>

      </div>
    </div>
  );
}

export default MesasActivas;
