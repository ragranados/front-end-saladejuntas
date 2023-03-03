import React, { useEffect, useState } from "react";

import ServiciosOrden from "../../servicios/orden.servicios";

function MesasActivas() {

  const [ordenes, setOrdenes] = useState([]);

  useEffect(() => {


    async function fetchData() {
      console.log(await ServiciosOrden.obtenerOrdenesActivas(1));
    }

    fetchData();

  });

  return (
    <div>
      <div>

        

      </div>
    </div>
  );
}

export default MesasActivas;
