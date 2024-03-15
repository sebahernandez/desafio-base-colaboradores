//import { Listado } from "./components/Listado";
import { useState } from "react";
import { Formulario } from "./components/Formulario";
import { Listado } from "./components/Listado";
import { BaseColaboradores } from "./data/BaseColaboradores";
import { Buscador } from "./components/Buscador";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [registros, setRegistros] = useState(BaseColaboradores);
  const [selectedRows, setSelectedRows] = useState([]);
  const [registrosFiltrados, setRegistrosFiltrados] =
    useState(BaseColaboradores);

  console.log(registros);
  const agregarRegistro = (registro) => {
    const nuevoRegistro = { ...registro, id: uuidv4() };
    const nuevosRegistros = [...registros, nuevoRegistro];
    setRegistros(nuevosRegistros);
    setRegistrosFiltrados(nuevosRegistros);
  };

  const handleRowSelected = (state) => {
    setSelectedRows(state.selectedRows);
  };

  const eliminarProductos = (id) => {
    if (id) {
      const nuevosRegistros = registros.filter(
        (registro) => registro.id !== id
      );
      setRegistros(nuevosRegistros);
      setRegistrosFiltrados(nuevosRegistros);
    } else {
      const idsSeleccionados = new Set(selectedRows.map((row) => row.id));
      console.log(idsSeleccionados);
      const nuevosRegistros = registros.filter(
        (registro) => !idsSeleccionados.has(registro.id)
      );
      setRegistros(nuevosRegistros);
      setRegistrosFiltrados(nuevosRegistros);
      setSelectedRows([]);
    }
  };

  const filtrarRegistros = (terminoBusqueda) => {
    if (!terminoBusqueda) {
      setRegistrosFiltrados(registros);
    } else {
      const termino = terminoBusqueda.toLowerCase();
      const filtrados = registros.filter(
        (registro) =>
          registro.nombre.toLowerCase().includes(termino) ||
          registro.correo.toLowerCase().includes(termino) ||
          registro.cargo.toLowerCase().includes(termino) ||
          registro.telefono.toLowerCase().includes(termino) ||
          registro.edad.toString().includes(termino)
      );
      setRegistrosFiltrados(filtrados);
    }
  };

  return (
    <>
      <div className="flex flex-col md:flex-row justify-center items-center h-screen md:container md:mx-auto">
        <div className="w-full md:w-1/2 p-4">
          <Buscador filtrarRegistros={filtrarRegistros} />
          <Listado
            registros={registrosFiltrados}
            onRowSelected={handleRowSelected}
            eliminarProductos={eliminarProductos}
          />
          <button
            className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-opacity-50"
            onClick={() => eliminarProductos()}
          >
            Eliminar Seleccionados
          </button>
        </div>
        <div className="mx-5 w-full p-4 bg-white rounded-lg md:m-0 md:w-1/2  ">
          <Formulario agregarRegistro={agregarRegistro} />
        </div>
      </div>
    </>
  );
}

export default App;
