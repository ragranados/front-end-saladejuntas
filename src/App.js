import logo from "./logo.svg";
import "./App.css";

import "primereact/resources/themes/bootstrap4-dark-blue/theme.css";

//core
import "primereact/resources/primereact.min.css";

//icons
import "primeicons/primeicons.css";

import Home from "./componentes/Home";

function App() {
  return (
    <>
      <header className="App-header">La Sala de Juntas</header>
      <body className="body">
        <Home />
      </body>
    </>
  );
}

export default App;
