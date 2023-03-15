const servicios = {};

servicios.ingresarOrden = async (nombre, mesas, items) => {
  const response = await fetch(`${process.env.REACT_APP_URL}/orden/ingresar`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      nombre,
      cuentaId: null,
      mesas,
      items,
    }),
  });

  return response.json();
};

servicios.obtenerOrdenesPorEstado = async (estado) => {
  const response = await fetch(
    `${process.env.REACT_APP_URL}/orden/porEstado?estadoId=${estado}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return response.json();
};

servicios.agregarAOrden = async (idSubCuenta, items) => {
  const response = await fetch(
    `${process.env.REACT_APP_URL}/orden/agregarAOrden`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        idSubCuenta,
        mesas: [],
        items,
      }),
    }
  );

  return response.json();
};

servicios.cambiarEstado = async (ordenId, estado) => {
  const response = await fetch(
    `${process.env.REACT_APP_URL}/orden/cambiarEstado`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ordenId,
        estado,
      }),
    }
  );

  return response.json();
};

servicios.preCerrarOrden = async (ordenId, metodoPagoId) => {
  console.log({ ordenId, metodoPagoId });
  const response = await fetch(`${process.env.REACT_APP_URL}/orden/PreCerrar`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ordenId,
    }),
  });

  return response.json();
};

servicios.cerrarOrden = async (ordenId, metodoPagoId) => {
  console.log({ ordenId, metodoPagoId });
  const response = await fetch(`${process.env.REACT_APP_URL}/orden/cerrar`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ordenId,
      metodoPagoId,
    }),
  });

  return response.json();
};

servicios.obtenerMetodosDePago = async () => {
  const response = await fetch(
    `${process.env.REACT_APP_URL}/orden/metodosDePago`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return response.json();
};

export default servicios;
