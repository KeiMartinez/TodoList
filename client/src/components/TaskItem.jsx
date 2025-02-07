import PropTypes from "prop-types";
import { FaTrash, FaCheckCircle } from "react-icons/fa";
import "./TaskItem.css"; 

const TaskItem = ({ task, onToggle, onDelete }) => {
  return (
    <div className={`task-item ${task.completed ? "completed" : ""}`}>
      {/* ✔ Ícono de check para marcar como completada */}
      <FaCheckCircle 
        className={`check-icon ${task.completed ? "checked" : ""}`} 
        onClick={() => onToggle(task._id)} 
      />

      {/* ✔ Texto de la tarea */}
      <span className={`task-text ${task.completed ? "completed-text" : ""}`}>
        {task.title}
      </span>

      {/* 🗑 Ícono de papelera para eliminar */}
      <FaTrash 
        className="delete-icon" 
        onClick={() => onDelete(task._id)} 
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
