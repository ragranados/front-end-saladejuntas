import React, { useEffect, useState } from "react";

import ServiciosProducto from "../../servicios/producto.servicios";
import "./index.css"

import { Card } from 'primereact/card';

import { Button } from 'primereact/button';

function IngresarOrden(props) {

  const [data, setData] = useState([]);
  const [nuevaOrden, setNuevaOrden] = useState({ mesa: "", items: [], estado: "" });
  const [mesas, setMesas] = useState([]);

  useEffect(() => {

    const aux = [];

    for (let i = 0; i < 30; i++) {
      aux.push({ label: i, value: i });
    }

    setMesas();

  }, []);

  useEffect(() => {
    //console.log("data", data);
  }, [data])

  return (
    <div className="contenedor">
      <div className="contenedor-productos" style={{ marginLeft: "30px" }}>
        {props.dataCategorias.map((e) => {

          console.log(e)
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

                                <Card onClick={() => console.log("Click en tarjeta", e)} title={`${e.nombre}`}>
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

      </div>
    </div>
  )
}

IngresarOrden.defaultProps = {
  dataCategorias: [],
}

export default IngresarOrden;
