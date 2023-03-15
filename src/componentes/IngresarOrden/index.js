import React, { useEffect, useState, useRef } from "react";

import ServiciosMesa from "../../servicios/mesa.servicios";
import ServiciosOrden from "../../servicios/orden.servicios";
import utils from "../../utils";

import { Toast } from "primereact/toast";

import Orden from "../Orden";
import Productos from "../Productos";

import { MultiSelect } from "primereact/multiselect";

import "./index.css";

import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";

const ordenVacia = { mesa: null, items: [], estado: "" };

function IngresarOrden(props) {
  const toast = useRef(null);

  const [nuevaOrden, setNuevaOrden] = useState({
    mesas: [],
    items: [],
    estado: "",
    nombre: "",
  });
  const [mesas, setMesas] = useState([]);

  const [mesasSeleccionadas, setMesasSeleccionadas] = useState(null);

  const [ordenesActivas, setOrdenesActivas] = useState([]);

  const [cuenta, setCuenta] = useState(null);

  useEffect(() => {
    async function fetchMesas() {
      const infoMesas = await ServiciosMesa.obtenerMesasPorEstado("libre");

      setMesas(infoMesas.data);
    }

    async function fetchCuentas() {
      const ordenesActivas = await ServiciosOrden.obtenerOrdenesPorEstado(1);

      setOrdenesActivas(ordenesActivas.data);
    }

    fetchMesas();
    fetchCuentas();

    let intervalo = setInterval(() => {
      fetchMesas(); //TODO: Descomentar
    }, 1000);

    return () => {
      clearInterval(intervalo);
    };
  }, []);

  const agregarItemOrden = (item) => {
    console.log(item);
    let aux = nuevaOrden.items;

    aux.push(item);

    setNuevaOrden({ ...nuevaOrden, items: aux });
  };

  const quitarUnItemOrden = (nombreEnFactura) => {
    let aux = nuevaOrden.items;

    const memberToRemove = aux.find((element) => {
      return element.nombreEnFactura === nombreEnFactura;
    });

    aux.splice(aux.indexOf(memberToRemove), 1);

    setNuevaOrden({ ...nuevaOrden, items: aux });
  };

  const limpiar = () => {
    setMesasSeleccionadas([]);
    setNuevaOrden({ nombre: "", mesas: [], items: [], estado: "" });
  };

  const ingresarOrden = async () => {
    const resIngresarOrden = await ServiciosOrden.ingresarOrden(
      nuevaOrden.nombre,
      nuevaOrden.mesas,
      nuevaOrden.items
    );

    console.log("Orden Ingresada Respuesta", resIngresarOrden);

    return resIngresarOrden;
  };

  useEffect(() => {
    console.log("XDDDD", nuevaOrden);
  }, [nuevaOrden]);

  return (
    <div className="contenedor">
      <div className="card flex justify-content-center">
        <Toast ref={toast} />
      </div>

      <Productos
        dataCategorias={props.dataCategorias}
        agregarItemOrden={agregarItemOrden}
      />

      <div className="contenedor-orden">
        {/* <Dropdown
          value={mesa}
          onChange={(e) => [
            setNuevaOrden({ ...nuevaOrden, mesa: e.value.id }),
            setMesa(e.value),
          ]}
          options={mesas}
          optionLabel="id"
          placeholder="Mesa de orden"
          className="w-
          
          full md:w-14rem"
        /> */}

        <MultiSelect
          placeholder="Mesas"
          display="chip"
          value={mesasSeleccionadas}
          onChange={(e) => [
            setMesasSeleccionadas(e.value),
            setNuevaOrden({ ...nuevaOrden, mesas: e.value }),
            console.log(e.value),
          ]}
          options={mesas}
          optionLabel="id"
          optionValue="id"
        />

        <InputText
          placeholder="Cuenta a nombre de..."
          value={nuevaOrden.nombre}
          onChange={(e) =>
            setNuevaOrden({ ...nuevaOrden, nombre: e.target.value })
          }
        />

        <Dropdown
          value={cuenta}
          options={ordenesActivas}
          onChange={(e) => setCuenta(e.value)}
          optionLabel="id"
          optionValue="id"
        />

        <Orden
          quitarUnItemOrden={quitarUnItemOrden}
          items={utils.ordenarItemsParaMostrar(nuevaOrden.items)}
        />

        <div className="contenedor-botones">
          <Button
            className="botones"
            label="Guardar"
            onClick={async () => {
              if (
                !nuevaOrden.items.length > 0 ||
                !nuevaOrden.mesas.length > 0
              ) {
                toast.current.show({
                  severity: "warn",
                  summary: "Info",
                  detail: "No hay mesa especificada o items en la orden.",
                });
                return;
              }

              const resIngresarOrden = await ingresarOrden();

              if (!resIngresarOrden.ok) {
                toast.current.show({
                  severity: "error",
                  summary: "Error",
                  detail: "No se pudo ingresar la orden.",
                });
              }

              toast.current.show({
                severity: "success",
                summary: "Exito",
                detail: "Orden ingresada con exito.",
              });
              console.log("Orden Ingresada con exito");
              limpiar();
            }}
          />

          <Button
            className="botones"
            label="Limpiar"
            onClick={() => {
              limpiar();
            }}
          />
        </div>
      </div>
    </div>
  );
}

IngresarOrden.defaultProps = {
  dataCategorias: [],
};

export default IngresarOrden;
