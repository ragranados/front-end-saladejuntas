import React, { useState } from "react";

import { Sidebar } from "primereact/sidebar";
import { Button } from "primereact/button";

import BarraLateral from "../../comunes/BarraLateral/Index";

function Home() {
  const [visible, setVisible] = useState(false);

  return (
    <div>
      <BarraLateral visible={visible} setVisible={setVisible} />

      <Button icon="pi pi-arrow-right" onClick={() => setVisible(true)} />
    </div>
  );
}

export default Home;
