const servicios = {};

servicios.ingresarOrden = async (mesa, items) => {
  const response = await fetch(`${process.env.REACT_APP_URL}/orden/ingresar`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      mesa,
      items
    })
  });

  return response.json();
};

export default servicios;
