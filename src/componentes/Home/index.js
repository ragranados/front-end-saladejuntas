import React, { useEffect, useState } from "react";

import ServiciosProducto from "../../servicios/producto.servicios";

import { Sidebar } from "primereact/sidebar";
import { Button } from "primereact/button";

import BarraLateral from "../../comunes/BarraLateral/Index";

import MesasActivas from "../MesasActivas";
import IngresarOrden from "../IngresarOrden";
import { TabMenu } from "primereact/tabmenu";

function Home() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [dataCategorias, setDataCategorias] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const resDataCategorias = await ServiciosProducto.obtenerCategoriasConSubcategorias();
      console.log(resDataCategorias.data);
      setDataCategorias(resDataCategorias.data);
    }

    fetchData();
  }, []);

  const items = [
    { label: "Ordenes Activas", icon: "pi pi-fw pi-calendar" },
    { label: "Nueva Orden", icon: "pi pi-fw pi-plus" },
    // { label: "Edit", icon: "pi pi-fw pi-pencil" },
    // { label: "Documentation", icon: "pi pi-fw pi-file" },
    // { label: "Settings", icon: "pi pi-fw pi-cog" },
  ];

  return (
    <div>
      <TabMenu
        activeIndex={activeIndex}
        onTabChange={(e) => setActiveIndex(e.index)}
        model={items}
      />

      {activeIndex == 0 && <MesasActivas />}
      {activeIndex == 1 && <IngresarOrden dataCategorias={dataCategorias} />}
    </div>
  );
}

export default Home;
