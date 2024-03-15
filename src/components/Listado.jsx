import DataTable from "react-data-table-component";
import PropTypes from "prop-types";
import { Trash } from "./Trash";
export const Listado = ({ registros, onRowSelected, eliminarProductos }) => {
  console.log(registros);
  const columns = [
    {
      name: "ID",
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: "Nombre",
      selector: (row) => row.nombre,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.correo,
      sortable: true,
    },
    {
      name: "Edad",
      selector: (row) => row.edad,
      sortable: true,
    },
    {
      name: "Cargo",
      selector: (row) => row.cargo,
      sortable: true,
    },
    {
      name: "Teléfono",
      selector: (row) => row.telefono,
      sortable: true,
    },
    {
      name: "Acciones",
      cell: (row) => (
        <Trash
          onClick={() => {
            eliminarProductos(row.id);
          }}
        />
      ),
    },
  ];

  return (
    <div>
      <DataTable
        title="Listado de registros"
        columns={columns}
        data={registros}
        selectableRows
        onSelectedRowsChange={onRowSelected}
        pagination
      />
    </div>
  );
};

Listado.propTypes = {
  registros: PropTypes.array.isRequired,
  onRowSelected: PropTypes.func.isRequired,
  eliminarProductos: PropTypes.func.isRequired,
};
