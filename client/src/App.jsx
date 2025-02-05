import { useState, useEffect } from 'react';
import ListaDeTareas from './components/ListaDeTareas';
import AñadirTarea from './components/AnadirTarea';
import axios from 'axios';
import './App.css';

function App() {
  const [tareas, setTareas] = useState([]);

  useEffect(() => {
    const obtenerTareas = async () => {
      const respuesta = await axios.get('http://localhost:3000/tareas');
      setTareas(respuesta.data);
    };
    obtenerTareas();
  }, []);

  const onNuevaTarea = (tarea) => {
    setTareas([...tareas, tarea]);
  };

  const onActualizarTarea = async (id) => {
    const tarea = tareas.find(t => t._id === id);
    const respuesta = await axios.put(`http://localhost:3000/tareas/${id}`, { ...tarea, completada: !tarea.completada });
    setTareas(tareas.map(t => t._id === id ? respuesta.data : t));
  };

  const onEliminarTarea = async (id) => {
    await axios.delete(`http://localhost:3000/tareas/${id}`);
    setTareas(tareas.filter(t => t._id !== id));
  };

  return (
    <div className="App">
      <h1>Gestor de Tareas</h1>
      <AñadirTarea onNuevaTarea={onNuevaTarea} />
      <ListaDeTareas
        tareas={tareas}
        onActualizarTarea={onActualizarTarea}
        onEliminarTarea={onEliminarTarea}
      />
    </div>
  );
}

export default App;
