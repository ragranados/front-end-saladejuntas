import React, { useEffect, useState } from "react";

import "./index.css"

import ServiciosOrden from "../../servicios/orden.servicios";

import AgregarAOrden from "../AgregarAOrden";

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';
import utils from "../../utils";


import { Checkbox } from 'primereact/checkbox';


function MesasActivas(props) {
  const [visiblePreCerrar, setVisiblePreCerrar] = useState(false);
  const [visibleCerrar, setVisibleCerrar] = useState(false);

  const [ordenesActivas, setOrdenesActivas] = useState([]);
  const [ordenesPreCerradas, setOrdenesPreCerradas] = useState([]);
  const [ordenesCerradas, setOrdenesCerradas] = useState([]);

  const [anular, setAnular] = useState(false);

  const [expandedRows, setExpandedRows] = useState(null);

  const [agregarAOrden, setAgregarAOrden] = useState(false);
  const [ordenAModificar, setOrdenAModificar] = useState({});

  const [actualizar, setActualizar] = useState(true);

  const [metodosPago, setMetodosPago] = useState([]);
  const [metodoPago, setMetodoPago] = useState(null);

  useEffect(() => {

    async function fetchData() {

      const resObtenerOrdenesActivas = await ServiciosOrden.obtenerSubcuentasPorEstado(1);
      console.log("ordenes activas", utils.ordenarSubCuentasPorIdCuenta(resObtenerOrdenesActivas.data));
      setOrdenesActivas(utils.ordenarSubCuentasPorIdCuenta(resObtenerOrdenesActivas.data));

      const resObtenerOrdenesPreCerradas = await ServiciosOrden.obtenerSubcuentasPorEstado(2);
      console.log(utils.ordenarSubCuentasPorIdCuenta(resObtenerOrdenesPreCerradas.data));
      setOrdenesPreCerradas(utils.ordenarSubCuentasPorIdCuenta(resObtenerOrdenesPreCerradas.data));

      const resObtenerOrdenesCerradas = await ServiciosOrden.obtenerOrdenesPorEstado(3);
      setOrdenesCerradas(resObtenerOrdenesCerradas.data);

    }

    fetchData();

  }, [agregarAOrden, actualizar]);

  useEffect(() => {

    async function fetchData() {

      const resObtenerMetodosDePago = await ServiciosOrden.obtenerMetodosDePago();
      setMetodosPago(resObtenerMetodosDePago.data);

    }

    fetchData();

  }, []);

  const generarCuentaTicket = (infoTicket, respuesta) => {
    let cuenta = `Cuenta de ${infoTicket.nombre},,\n`;
    cuenta += "\n";
    cuenta += "Item,Cantidad,Precio Unidad\n";
    cuenta += "\n";

    console.log(respuesta);

    for (let i = 0; i < infoTicket.subBillItems.length; i++) {
      cuenta += `${infoTicket.subBillItems[i].product.nombreEnFactura},${infoTicket.subBillItems[i].cantidad},${infoTicket.subBillItems[i].product.precio}\n`;
    }

    cuenta += "\n";
    cuenta += `Sub total,,${respuesta.data.totalSinPropina.toFixed(2)}\n`;
    cuenta += "\n";
    cuenta += `Propina (10%),,${respuesta.data.propina.toFixed(2)}\n`;
    cuenta += "\n";
    cuenta += `Total,,${respuesta.data.total.toFixed(2)}\n`;

    console.log("infoTicket", infoTicket, respuesta);
    const fileData = JSON.stringify(infoTicket);
    const blob = new Blob([cuenta], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = `${infoTicket.nombre}.csv`;
    link.href = url;
    link.click();
  }

  const preCerrarOrden = async () => {

    const respreCerrarOrden = await ServiciosOrden.preCerrarOrden(ordenAModificar.id);
    console.log("respuesta", respreCerrarOrden);
    generarCuentaTicket(ordenAModificar, respreCerrarOrden);
    setVisiblePreCerrar(false);
    setActualizar(!actualizar);
  }

  const cerrarOrden = async () => {

    console.log(metodoPago);

    if (!metodoPago) {
      return;
    }

    const resCerrarOrden = await ServiciosOrden.cerrarOrden(ordenAModificar.id, metodoPago, anular);
    setVisibleCerrar(false);
    setMetodoPago(null);
    setActualizar(!actualizar);

  }

  const rowTemplate = (rowData) => {
    return (
      <div style={{ marginRight: "30px" }}>
        {rowData.product.nombreEnFactura}
      </div>
    )
  }

  const tablaSubCuentaActiva = (data) => {
    console.log("Adentro", data);

    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
        <div style={{ display: "flex", justifyContent: "space-between", width: "60%" }}>
          <h4>{data.nombre}</h4>
          <h4>{`$ ${data.totalSinPropina}`}</h4>
          {/* <h4>{`$ ${data.propina}`}</h4>
          <h4>{`$ ${data.total}`}</h4> */}
        </div>
        <div style={{ width: "70%" }} >

          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Button label="Agregar Items" onClick={() => [setOrdenAModificar(data), setAgregarAOrden(true)]} />

            <Button label="Pre-cerrar orden" onClick={() => [setOrdenAModificar(data), setVisiblePreCerrar(true)]} />
          </div>

          <DataTable value={data.subBillItems}>
            <Column body={rowTemplate} header={"Producto"} style={{ width: '5rem' }} />
            <Column field="cantidad" header="Cantidad"></Column>
          </DataTable>
        </div>
      </div>
    );
  }

  const tablaSubCuentaPreCerrada = (data) => {
    console.log("Adentro pre", data);

    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
        <div style={{ display: "flex", justifyContent: "space-between", width: "60%" }}>
          <h4>{data.nombre}</h4>
          <h4>{`$ ${data.totalSinPropina}`}</h4>
          <h4>{`$ ${data.propina}`}</h4>
          <h4>{`$ ${data.total}`}</h4>
        </div>
        <div style={{ width: "70%" }} >

          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Button label="Cerrar Orden" onClick={async () => [setOrdenAModificar(data), setVisibleCerrar(true)]} />
          </div>

          <DataTable value={data.subBillItems}>
            <Column body={rowTemplate} header={"Producto"} style={{ width: '5rem' }} />
            <Column field="cantidad" header="Cantidad"></Column>
          </DataTable>
        </div>
      </div>
    );
  }

  const rowExpansionTemplateActiva = (data) => {
    console.log("adentro de row", data);
    return (
      <div>
        <h4>Cuentas</h4>

        {data.subCuentas.map((e) => {
          return tablaSubCuentaActiva(e);
        })}

      </div>
    );
  };

  const rowExpansionTemplatePreCerrada = (data) => {
    console.log("Adentro pre", data);

    return (
      <div>
        <h4>Cuentas</h4>

        {data.subCuentas.map((e) => {
          return tablaSubCuentaPreCerrada(e);
        })}

      </div>
    );
  };

  const footerContentPreCerrar = (
    <div>
      <Button label="Cancelar" icon="pi pi-times" onClick={() => [setOrdenAModificar({}), setVisiblePreCerrar(false)]} className="p-button-text" />
      <Button label="Confirmar" icon="pi pi-check" onClick={async () => [await preCerrarOrden(), setActualizar(!actualizar), setVisiblePreCerrar(false), setOrdenAModificar({})]} autoFocus />
    </div>
  );

  const footerContentCerrar = (
    <div>
      <Button label="Cancelar" icon="pi pi-times" onClick={() => [setVisibleCerrar(false), setOrdenAModificar({}), setMetodoPago(null)]} className="p-button-text" />
      <Button label="Confirmar" icon="pi pi-check" onClick={async () => [await cerrarOrden()]} autoFocus />
    </div>
  );

  return (
    <div className="contenedor">

      <Dialog footer={footerContentPreCerrar} header="Importante" visible={visiblePreCerrar} style={{ width: '50vw' }} onHide={() => setVisiblePreCerrar(false)}>
        <p className="m-0">
          Seguro que desea PRE-CERRAR la cuenta?
        </p>
      </Dialog>

      <Dialog footer={footerContentCerrar} header="Header" visible={visibleCerrar} style={{ width: '50vw' }} onHide={() => setVisibleCerrar(false)}>
        <p className="m-0">
          Seguro que desea CERRAR la cuenta?
        </p>

        <h2>Escoger metodo de pago</h2>

        <Dropdown options={metodosPago} value={metodoPago} onChange={(e) => setMetodoPago(e.target.value)} optionLabel="nombre" optionValue="id" />

        <h2>Anular Orden</h2>

        <Checkbox onChange={e => setAnular(e.checked)} checked={anular} />

      </Dialog>

      {
        !agregarAOrden &&
        <div>

          <h3>Ordenes activas</h3>

          <DataTable value={ordenesActivas} tableStyle={{ minWidth: '50rem' }} expandedRows={expandedRows} dataKey="billId"
            onRowToggle={(e) => setExpandedRows(e.data)} rowExpansionTemplate={rowExpansionTemplateActiva}>
            <Column expander={true} style={{ width: '5rem' }} />
            <Column style={{ width: '5rem' }} />
            <Column field="mesas" header="Nro de mesas"></Column>
            <Column field="totalSinPropina" header="Total"></Column>
          </DataTable>

          <h3>Ordenes Pre-cerradas</h3>

          <DataTable value={ordenesPreCerradas} tableStyle={{ minWidth: '50rem' }} expandedRows={expandedRows} dataKey="id"
            onRowToggle={(e) => setExpandedRows(e.data)} rowExpansionTemplate={rowExpansionTemplatePreCerrada}>
            <Column expander={true} style={{ width: '5rem' }} />
            <Column style={{ width: '5rem' }} />
            <Column field="mesas" header="Nro de mesa"></Column>
            <Column field="totalSinPropina" header="Total"></Column>
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
