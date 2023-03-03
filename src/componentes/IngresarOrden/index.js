import React, { useEffect, useState, useRef } from "react";

import ServiciosMesa from "../../servicios/mesa.servicios";
import ServiciosOrden from "../../servicios/orden.servicios";
import utils from "../../utils";

import { Toast } from 'primereact/toast';

import Orden from "../Orden";

import "./index.css"

import { Card } from 'primereact/card';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { ScrollPanel } from 'primereact/scrollpanel';

const ordenVacia = { mesa: null, items: [], estado: "" };

function IngresarOrden(props) {

  const toast = useRef(null);

  const [nuevaOrden, setNuevaOrden] = useState({ mesa: null, items: [], estado: "" });
  const [mesas, setMesas] = useState([]);

  const [mesa, setMesa] = useState(null);

  useEffect(() => {

    async function fetchMesas() {

      const infoMesas = await ServiciosMesa.obtenerMesasPorEstado("libre");

      setMesas(infoMesas.data);
    }

    fetchMesas();


    let intervalo = setInterval(() => {
      fetchMesas(); //TODO: Descomentar
    }, 1000);

    return () => {

      clearInterval(intervalo);

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
    setMesa(null);
    setNuevaOrden({ mesa: null, items: [], estado: "" });
  }

  const ingresarOrden = async () => {

    const resIngresarOrden = await ServiciosOrden.ingresarOrden(nuevaOrden.mesa, nuevaOrden.items);

    console.log("Orden Ingresada Respuesta", resIngresarOrden);

    return resIngresarOrden;

  }

  useEffect(() => {
    console.log("XDDDD", nuevaOrden);
  }, [nuevaOrden])

  return (
    <div className="contenedor">

      <div className="card flex justify-content-center">
        <Toast ref={toast} />
      </div>

      <div className="contenedor-productos" style={{ marginLeft: "30px" }}>
        <ScrollPanel style={{ width: '100%', maxHeight: '90vh' }}>
          {props.dataCategorias.map((e) => {

            return (
              <div >
                <div >
                  <h1>{e.nombre}</h1>

                  {e.subCategories.map((e) => {
                    return (
                      <div style={{ marginLeft: "20px" }}>
                        <h2>{e.nombre}</h2>

                        <div className="contenedor-subcategorias">

                          {
                            e.products.map((e) => {
                              return (
                                <div className="producto">

                                  <Card className="tarjeta-producto" onClick={() => agregarItemOrden(e)} title={`${e.nombre}`}>
                                    <p className="m-0">
                                      {`Precio: $ ${e.precio}`}
                                    </p>
                                  </Card>

                                </div>
                              )
                            })
                          }
                        </div>

                      </div>
                    );
                  })}

                </div>

              </div>
            )
          })}
        </ScrollPanel>
      </div>

      <div className="contenedor-orden">

        <Dropdown value={mesa} onChange={(e) => [setNuevaOrden({ ...nuevaOrden, mesa: e.value.id }), setMesa(e.value)]} options={mesas} optionLabel="id"
          placeholder="Mesa de orden" className="w-full md:w-14rem" />

        <Orden quitarUnItemOrden={quitarUnItemOrden} items={utils.ordenarItemsParaMostrar(nuevaOrden.items)} />

        <div className="contenedor-botones">
          <Button className="botones" label="Guardar" onClick={async () => {

            if (!nuevaOrden.items.length > 0 || !nuevaOrden.mesa) {

              toast.current.show({ severity: 'warn', summary: 'Info', detail: 'No hay mesa especificada o items en la orden.' });
              return;

            }

            const resIngresarOrden = await ingresarOrden();

            if (!resIngresarOrden.ok) {
              toast.current.show({ severity: 'error', summary: 'Error', detail: 'No se pudo ingresar la orden.' });
            }

            toast.current.show({ severity: 'success', summary: 'Exito', detail: 'Orden ingresada con exito.' });
            console.log("Orden Ingresada con exito");
            limpiar();

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
