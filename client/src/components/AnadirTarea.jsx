import { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import './AnadirTarea.css';
const AnadirTarea = ({ onNuevaTarea }) => {
  const [titulo, setTitulo] = useState('');

  const manejarSubmit = async (e) => {
    e.preventDefault();
    const respuesta = await axios.post('http://localhost:3000/tareas', { titulo, completada: false });
    onNuevaTarea(respuesta.data);
    setTitulo('');
  };

  return (
    <form onSubmit={manejarSubmit}>
      <input
        type="text"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
        placeholder="Añadir nueva tarea"
      />
      <button type="submit">Añadir</button>
    </form>
  );
};

AnadirTarea.propTypes = {
  onNuevaTarea: PropTypes.func.isRequired,
};

export default AnadirTarea;
