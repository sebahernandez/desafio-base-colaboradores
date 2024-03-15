import PropTypes from "prop-types";
export const Buscador = ({ filtrarRegistros }) => {
  const handleInputChange = (event) => {
    filtrarRegistros(event.target.value);
  };
  return (
    <input
      type="search"
      placeholder="Buscar..."
      onChange={handleInputChange}
      className="buscador-input"
    />
  );
};

Buscador.propTypes = {
  filtrarRegistros: PropTypes.func.isRequired,
};
