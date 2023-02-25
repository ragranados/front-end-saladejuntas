import React, { useEffect, useState } from "react";

import ServiciosMesa from "../../servicios/mesa.servicios";

import "./index.css"

import { Card } from 'primereact/card';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';

function IngresarOrden(props) {

  const [data, setData] = useState([]);
  const [nuevaOrden, setNuevaOrden] = useState({ mesa: null, items: [], estado: "" });
  const [mesas, setMesas] = useState([]);

  const [mesa, setMesa] = useState(null);

  useEffect(() => {

    async function fetchData() {

      const infoMesas = await ServiciosMesa.obtenerMesasPorEstado("libre");

      setMesas(infoMesas.data);
    }

    fetchData();

  }, []);

  const agregarItemOrden = (item) => {
    console.log(item);
  }

  useEffect(() => {
    console.log(nuevaOrden);
  }, [nuevaOrden])

  return (
    <div className="contenedor">
      <div className="contenedor-productos" style={{ marginLeft: "30px" }}>
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
      </div>

      <div className="contenedor-orden">
        <Dropdown value={mesa} onChange={(e) => [setNuevaOrden({ ...nuevaOrden, mesa: e.value.id }), setMesa(e.value)]} options={mesas} optionLabel="id"
          placeholder="Mesa de orden" className="w-full md:w-14rem" />
      </div>
    </div>
  )
}

IngresarOrden.defaultProps = {
  dataCategorias: [],
}

export default IngresarOrden;
