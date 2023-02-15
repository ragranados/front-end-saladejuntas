import React, { useEffect, useState } from "react";

function IngresarOrden(props) {

  useEffect(() => {
    console.log(props.dataCategorias);
  }, []);

  return (
    <div>
      <div style={{ marginLeft: "30px" }}>
        {props.dataCategorias.map((e) => {

          console.log(e)
          return (
            <div >
              <h1>{e.nombre}</h1>

              {e.subCategories.map((e) => {
                return (
                  <div style={{ marginLeft: "20px" }}>
                    <h2>{e.nombre}</h2>
                  </div>
                );
              })}

            </div>
          )
        })}
      </div>
    </div>
  )
}

IngresarOrden.defaultProps = {
  dataCategorias: [],
}

export default IngresarOrden;
