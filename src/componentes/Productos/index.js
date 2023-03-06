import React from "react";

import { Card } from 'primereact/card';
import { ScrollPanel } from 'primereact/scrollpanel';

function Categoria(props) {

  return (
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

                                <Card className="tarjeta-producto" onClick={() => props.agregarItemOrden(e)} title={`${e.nombre}`}>
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

  );
}

Categoria.defaultProps = {
  agregarItemOrden: () => console.log("Agregar item orden"),
  dataCategorias: [],
}

export default Categoria;
