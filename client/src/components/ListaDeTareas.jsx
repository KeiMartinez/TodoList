
import PropTypes from 'prop-types';

const ListaDeTareas = ({ tareas, onActualizarTarea, onEliminarTarea }) => {
  return (
    <div>
      <h2>Lista de Tareas</h2>
      <ul>
        {tareas.map(tarea => (
          <li key={tarea._id}>
            {tarea.titulo} - {tarea.completada ? 'Completada' : 'Pendiente'}
            <button onClick={() => onActualizarTarea(tarea._id)}>Cambiar Estado</button>
            <button onClick={() => onEliminarTarea(tarea._id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

ListaDeTareas.propTypes = {
  tareas: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      titulo: PropTypes.string.isRequired,
      completada: PropTypes.bool.isRequired,
    })
  ).isRequired,
  onActualizarTarea: PropTypes.func.isRequired,
  onEliminarTarea: PropTypes.func.isRequired,
};

export default ListaDeTareas;
