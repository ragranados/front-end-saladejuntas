const servicios = {};

servicios.obtenerProductosPorSubcategoria = async (subCategoriaId) => {
  const response = await fetch(`${process.env.REACT_APP_URL}/producto/${subCategoriaId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response.json();
};

export default servicios;
