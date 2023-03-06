import React, { useEffect, useState } from "react";

import "./index.css"

import ServiciosOrden from "../../servicios/orden.servicios";

import AgregarAOrden from "../AgregarAOrden";

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';

function MesasActivas(props) {

  const [ordenesActivas, setOrdenesActivas] = useState([]);
  const [ordenesPreCerradas, setOrdenesPreCerradas] = useState([]);
  const [ordenesCerradas, setOrdenesCerradas] = useState([]);

  const [expandedRows, setExpandedRows] = useState(null);

  const [agregarAOrden, setAgregarAOrden] = useState(false);
  const [ordenAModificar, setOrdenAModificar] = useState({});

  const [actualizar, setActualizar] = useState(true);

  useEffect(() => {

    async function fetchData() {

      const resObtenerOrdenesActivas = await ServiciosOrden.obtenerOrdenesPorEstado(1);
      setOrdenesActivas(resObtenerOrdenesActivas.data);

      const resObtenerOrdenesPreCerradas = await ServiciosOrden.obtenerOrdenesPorEstado(2);
      console.log(resObtenerOrdenesPreCerradas);
      setOrdenesPreCerradas(resObtenerOrdenesPreCerradas.data);

      const resObtenerOrdenesCerradas = await ServiciosOrden.obtenerOrdenesPorEstado(3);
      setOrdenesCerradas(resObtenerOrdenesCerradas.data);

    }

    fetchData();

  }, [agregarAOrden, actualizar]);

  const rowTemplate = (rowData) => {
    return (
      <div style={{ marginRight: "30px" }}>
        {rowData.product.nombreEnFactura}
      </div>
    )
  }

  const rowExpansionTemplateActiva = (data) => {
    console.log("Adentro", data);

    return (
      <div style={{ display: "flex", justifyContent: "center", }}>
        <div style={{ width: "70%" }} >

          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Button label="Agregar Items" onClick={() => [setOrdenAModificar(data), setAgregarAOrden(true)]} />

            <Button label="Pre-cerrar orden" onClick={async () => [await ServiciosOrden.cambiarEstado(data.id, 2), setActualizar(!actualizar)]} />
          </div>

          <DataTable value={data.orderItems}>
            <Column body={rowTemplate} header={"Producto"} style={{ width: '5rem' }} />
            <Column field="cantidad" header="Cantidad"></Column>
          </DataTable>
        </div>
      </div>
    );
  };

  const rowExpansionTemplatePreCerrada = (data) => {
    console.log("Adentro", data.orderItems);

    return (
      <div style={{ display: "flex", justifyContent: "center", }}>
        <div style={{ width: "70%" }} >

          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Button label="Cerrar Orden" onClick={async () => [await ServiciosOrden.cerrarOrden(data.id), setActualizar(!actualizar)]} />
          </div>

          <DataTable value={data.orderItems}>
            <Column body={rowTemplate} header={"Producto"} style={{ width: '5rem' }} />
            <Column field="cantidad" header="Cantidad"></Column>
          </DataTable>
        </div>
      </div>
    );
  };

  return (
    <div className="contenedor">
      {
        !agregarAOrden &&
        <div>

          <h3>Ordenes activas</h3>

          <DataTable value={ordenesActivas} tableStyle={{ minWidth: '50rem' }} expandedRows={expandedRows} dataKey="mesaId"
            onRowToggle={(e) => setExpandedRows(e.data)} rowExpansionTemplate={rowExpansionTemplateActiva}>
            <Column expander={true} style={{ width: '5rem' }} />
            <Column style={{ width: '5rem' }} />
            <Column field="mesaId" header="Nro de mesa"></Column>
            <Column field="total" header="Total"></Column>
          </DataTable>

          <h3>Ordenes Pre-cerradas</h3>

          <DataTable value={ordenesPreCerradas} tableStyle={{ minWidth: '50rem' }} expandedRows={expandedRows} dataKey="mesaId"
            onRowToggle={(e) => setExpandedRows(e.data)} rowExpansionTemplate={rowExpansionTemplatePreCerrada}>
            <Column expander={true} style={{ width: '5rem' }} />
            <Column style={{ width: '5rem' }} />
            <Column field="mesaId" header="Nro de mesa"></Column>
            <Column field="total" header="Total"></Column>
          </DataTable>

          {/* <h3>Ordenes Cerradas</h3>

          <DataTable value={ordenesCerradas} tableStyle={{ minWidth: '50rem' }} expandedRows={expandedRows} dataKey="mesaId"
            onRowToggle={(e) => setExpandedRows(e.data)} rowExpansionTemplate={rowExpansionTemplate}>
            <Column expander={true} style={{ width: '5rem' }} />
            <Column style={{ width: '5rem' }} />
            <Column field="mesaId" header="Nro de mesa"></Column>
            <Column field="total" header="Total"></Column>
          </DataTable> */}

        </div>
      }

      {
        agregarAOrden &&

        <div style={{ width: "100%" }}>

          <AgregarAOrden regresar={() => setAgregarAOrden(false)} orden={ordenAModificar} dataCategorias={props.dataCategorias} />

        </div>
      }

    </div>
  );
}

export default MesasActivas;
