const servicios = {};

servicios.obtenerMesasPorEstado = async (estado) => {
  const response = await fetch(`${process.env.REACT_APP_URL}/mesa/porEstado?estado=${estado}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response.json();
};

export default servicios;
