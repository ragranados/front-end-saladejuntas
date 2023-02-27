import React, { useEffect, useState } from "react";

import ServiciosMesa from "../../servicios/mesa.servicios";
import utils from "../../utils";

import Orden from "../Orden";

import "./index.css"

import { Card } from 'primereact/card';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { ScrollPanel } from 'primereact/scrollpanel';

const ordenVacia = { mesa: null, items: [], estado: "" };

function IngresarOrden(props) {

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
      //fetchMesas();
    }, 4500);

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

  useEffect(() => {
    console.log("XDDDD", nuevaOrden);
  }, [nuevaOrden])

  return (
    <div className="contenedor">
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

                                  <Card onClick={() => agregarItemOrden(e)} title={`${e.nombre}`}>
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
          <Button className="botones" label="Guardar" />

          <Button className="botones" label="Limpiar" onClick={() => {
            setNuevaOrden({ mesa: null, items: [], estado: "" });
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
