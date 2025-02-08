import PropTypes from "prop-types";
import { FaTrash, FaCheckCircle } from "react-icons/fa";
import "./TaskItem.css";

const TaskItem = ({ task, onToggle, onDelete }) => {
  return (
    <div className="task-item">
      {}
      <FaCheckCircle 
        className={`check-icon ${task.completed ? "checked" : ""}`} 
        onClick={() => {
          console.log("✅ Marcando tarea con ID:", task._id);
          onToggle(task._id);
        }} 
      />

      {}
      <span className={`task-text ${task.completed ? "completed-text" : ""}`}>
        {task.title}
      </span>

      {}
      <FaTrash
  className="delete-icon"
  onClick={(e) => {
    e.stopPropagation(); 
    if (window.confirm("¿Seguro que quieres eliminar esta tarea?")) {
      console.log("🗑 Eliminando tarea con ID:", task._id);
      onDelete(task._id);
    }
  }}
/>


    </div>
  );
};


TaskItem.propTypes = {
  task: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  }).isRequired,
  onToggle: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default TaskItem;
