import React, { useEffect, useState, useRef } from "react";

import ServiciosOrden from "../../servicios/orden.servicios";
import utils from "../../utils";

import { Toast } from 'primereact/toast';

import Orden from "../Orden";
import Productos from "../Productos";

import "./index.css";

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';

import { ScrollPanel } from 'primereact/scrollpanel';

const ordenVacia = { mesa: null, items: [], estado: "" };

function IngresarOrden(props) {

  const toast = useRef(null);

  const [nuevaOrden, setNuevaOrden] = useState({ mesa: null, items: [], estado: "" });

  useEffect(() => {

    console.log("Orden a modificar", props.orden);

    return () => {

    }

  }, []);

  const agregarItemOrden = (item) => {
    console.log(item);
    let aux = nuevaOrden.items;

    aux.push(item);

    setNuevaOrden({ ...nuevaOrden, items: aux });
  }

  const quitarUnItemOrden = (nombreEnFactura) => {
    let aux = nuevaOrden.items;

    const memberToRemove = aux.find(element => {
      return element.nombreEnFactura === nombreEnFactura;
    });

    aux.splice(aux.indexOf(memberToRemove), 1);

    setNuevaOrden({ ...nuevaOrden, items: aux });
  }

  const limpiar = () => {
    setNuevaOrden({ mesa: null, items: [], estado: "" });
  }

  const resAgregarAOrden = async () => {

    const resAgregarAOrden = await ServiciosOrden.agregarAOrden(props.orden.id, nuevaOrden.items);

    console.log("Orden Ingresada Respuesta", resAgregarAOrden);

    return resAgregarAOrden;

  }

  useEffect(() => {
    console.log("XDDDD", nuevaOrden);
  }, [nuevaOrden]);

  const rowTemplate = (rowData) => {
    return (
      <div style={{ marginRight: "30px" }}>
        {rowData.product.nombreEnFactura}
      </div>
    )
  }

  return (
    <div className="contenedor">

      <div className="card flex justify-content-center">
        <Toast ref={toast} />
      </div>

      <Productos dataCategorias={props.dataCategorias} agregarItemOrden={agregarItemOrden} />

      <div className="contenedor-orden">
        <ScrollPanel>

          <div>

            <h3>Items orden</h3>

            <DataTable value={props.orden.orderItems}>
              <Column body={rowTemplate} header={"Producto"} style={{ width: '5rem' }} />
              <Column field="cantidad" header="Cantidad"></Column>
            </DataTable>
          </div>

          <div>
            <h3>Items nuevos</h3>

            <Orden quitarUnItemOrden={quitarUnItemOrden} items={utils.ordenarItemsParaMostrar(nuevaOrden.items)} />
          </div>

        </ScrollPanel>

        <div className="contenedor-botones">
          <Button className="botones" label="Guardar" onClick={async () => {

            if (!nuevaOrden.items.length > 0) {

              toast.current.show({ severity: 'warn', summary: 'Info', detail: 'No hay items en la orden.' });
              return;

            }

            const resIngresarOrden = await resAgregarAOrden();

            if (!resIngresarOrden.ok) {
              toast.current.show({ severity: 'error', summary: 'Error', detail: 'No se pudo ingresar la orden.' });
            }

            toast.current.show({ severity: 'success', summary: 'Exito', detail: 'Orden ingresada con exito.' });
            limpiar();
            props.regresar();

          }} />

          <Button className="botones" label="Limpiar" onClick={() => {
            limpiar();
          }} />

        </div>

      </div>

    </div>
  )
}

IngresarOrden.defaultProps = {
  dataCategorias: [],
}

export default IngresarOrden;
