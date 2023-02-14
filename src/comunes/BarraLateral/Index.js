import React, { useState } from "react";

import { Sidebar } from "primereact/sidebar";
import { Menu } from "primereact/menu";

function BarraLateral(props) {
  let items = [
    {
      label: "Nueva Orden",
      icon: "pi pi-fw pi-plus",
      command: () => {
        console.log("prueba");
      },
    },
    { label: "Delete", icon: "pi pi-fw pi-trash" },
  ];

  return (
    <div>
      <Sidebar visible={props.visible} onHide={() => props.setVisible(false)}>
        <Menu model={items} />
      </Sidebar>
    </div>
  );
}

BarraLateral.defaultProps = {
  visible: false,
  setVisible: () => {},
};

export default BarraLateral;
