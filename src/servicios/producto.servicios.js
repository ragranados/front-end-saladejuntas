const servicios = {};

servicios.obtenerCategoriasConSubcategorias = async () => {
  const response = await fetch(`${process.env.REACT_APP_URL}/categoria/todas`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
  });

  return response.json();
};

export default servicios;
