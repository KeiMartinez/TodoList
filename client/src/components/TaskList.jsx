import TaskItem from "./TaskItem"; 
import "./TaskList.css";  
import PropTypes from "prop-types";
import axios from "axios";

const TaskList = ({ tasks, setTasks }) => {
  // ✅ Usa la versión más reciente del estado
  const toggleTask = async (id) => {
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task._id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = async (id) => {
    if (!id) {
      console.error("❌ Error: ID de la tarea es undefined");
      return;
    }
    
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${id}`);
      setTasks(prevTasks => prevTasks.filter(task => task._id !== id));
    } catch (error) {
      console.error("❌ Error al eliminar la tarea:", error);
    }
  };

  return (
    <div className="task-list">
      {tasks.length === 0 ? (
        <p>No hay tareas</p>
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
    completed: PropTypes.bool.isRequired,
  })).isRequired,
  setTasks: PropTypes.func.isRequired,
};

export default TaskList;
