import { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import "./TaskForm.css";

const TaskForm = ({ onAdd }) => {
  const [title, setTitle] = useState("");

const handleSubmit = async (e) => {
  e.preventDefault();
  if (!title.trim()) {
    alert("El título de la tarea es obligatorio");
    return;
  }


    try {
      const { data } = await axios.post("http://localhost:5000/api/tasks", { title });
      onAdd(data);
      setTitle("");
    } catch (error) {
      console.error("Error al agregar tarea:", error);
    }
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Nueva tarea..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button type="submit">Agregar</button>
    </form>
  );
};

TaskForm.propTypes = {
  onAdd: PropTypes.func.isRequired,
};

export default TaskForm;
