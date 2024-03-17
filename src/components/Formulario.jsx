import { useState } from "react";
import { MensajeAlerta } from "./Alert";
import { v4 as uuidv4 } from "uuid";
import PropTypes from "prop-types";

export const Formulario = (props) => {
  const initialState = {
    id: "",
    nombre: "",
    correo: "",
    edad: "",
    cargo: "",
    telefono: "",
  };

  const [mensaje, setMensaje] = useState("");
  const [variant, setVariant] = useState("");
  const [inputValues, setInputValues] = useState({
    ...initialState,
    id: uuidv4(),
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const camposVacios = Object.values(inputValues).some(
      (value) => value === ""
    );
    if (camposVacios) {
      setMensaje("No pueden haber campos vacíos.");
      setVariant("danger");
    } else if (!nombreValid(inputValues.nombre)) {
      setMensaje("El nombre debe contener solo letras.");
      setVariant("warning");
    } else if (!emailValid(inputValues.correo)) {
      setMensaje("El email no es válido.");
      setVariant("warning");
    } else {
      setMensaje("Usuario registrado correctamente.");
      setVariant("success");
      props.agregarRegistro(inputValues);
      setInputValues({ ...initialState, id: uuidv4() });
      setTimeout(() => {
        setMensaje("");
        setVariant("");
      }, 1500);
    }
  };

  const emailValid = (email) => {
    const rgExp = /^[a-zA-Z0-9._]+@[a-z]+\.[a-z]{2,6}$/;
    return rgExp.test(email);
  };
  const nombreValid = (nombre) => {
    const rgExp2 = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ]+$/;
    return rgExp2.test(nombre);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputValues({
      ...inputValues,
      [name]: value,
    });
  };

  return (
    <>
      <h2 className="text-2xl text-black py-2">Agregar Colaborador</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="nombre"
          placeholder="Nombre del colaborador"
          value={inputValues.nombre}
          onChange={handleInputChange}
        />
        <input
          type="email"
          name="correo"
          placeholder="Email del colaborador"
          value={inputValues.correo}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="edad"
          placeholder="Edad del colaborador"
          value={inputValues.edad}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="cargo"
          placeholder="Cargo del colaborador"
          value={inputValues.cargo}
          onChange={handleInputChange}
        />
        <input
          type="tel"
          name="telefono"
          placeholder="Telefono del colaborador"
          value={inputValues.telefono}
          onChange={handleInputChange}
        />
        <button type="submit" className="bg-black">
          Agregar colaborador
        </button>
        {mensaje && <MensajeAlerta variant={variant}>{mensaje}</MensajeAlerta>}
      </form>
    </>
  );
};

Formulario.propTypes = {
  agregarRegistro: PropTypes.func.isRequired,
};
