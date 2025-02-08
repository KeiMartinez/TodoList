import TaskItem from "./TaskItem";
import "./TaskList.css";
import PropTypes from "prop-types";
import axios from "axios";
import { useState } from "react";

const TaskList = ({ tasks, setTasks }) => {
  const [error, setError] = useState(null); 

  const toggleTask = async (id) => {
    try {
      const updatedTask = tasks.find(task => task._id === id);
      if (!updatedTask) return;

      const newStatus = !updatedTask.completed;

      await axios.put(`http://localhost:5000/api/tasks/${id}`, { completed: newStatus });

      setTasks(prevTasks =>
        prevTasks.map(task =>
          task._id === id ? { ...task, completed: newStatus } : task
        )
      );
    } catch (err) {
      console.error("❌ Error al actualizar tarea:", err);
      setError("Hubo un problema actualizando la tarea. Intenta de nuevo.");
    }
  };

  const deleteTask = async (id) => {
    if (!id) {
      console.error("❌ Error: ID de la tarea es undefined");
      return;
    }
  
    try {
      console.log("🗑 Eliminando tarea con ID:", id);
  
      await axios.delete(`http://localhost:5000/api/tasks/${id}`);
  
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== id));
    } catch (error) {
      console.error("❌ Error al eliminar la tarea:", error);
    }
  };
  

  return (
    <div className="task-list">
      {error && <p className="error-message">{error}</p>}  {}
      
      {tasks.length === 0 ? (
        <p>📭 No hay tareas aún. ¡Agrega una nueva! 🚀</p>
      ) : (
        tasks.map(task => (
          <TaskItem 
            key={task._id} 
            task={task} 
            onToggle={toggleTask} 
            onDelete={deleteTask} 
          />
        ))
      )}
    </div>
  );
};

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  })).isRequired,
  setTasks: PropTypes.func.isRequired,
};

export default TaskList;
