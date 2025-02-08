import { useState, useEffect } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import "./App.css";
import axios from "axios"; 
import JSConfetti from "js-confetti";

const jsConfetti = new JSConfetti();

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dateTime, setDateTime] = useState(new Date().toLocaleString());

  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get("http://localhost:5000/api/tasks");
        setTasks(data);
      } catch (error) {
        console.error("Error al obtener tareas:", error);
        setError("Error al obtener tareas");
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
    const interval = setInterval(() => setDateTime(new Date().toLocaleString()), 1000);

    return () => clearInterval(interval);
  }, []);

 
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.completed).length;

  
  useEffect(() => {
    if (totalTasks > 0 && completedTasks === totalTasks) {
      jsConfetti.addConfetti();
    }
  }, [totalTasks, completedTasks]);

  return (
    <div className="container">
      <h1>¡Hola, Keila!</h1>
      <p>{dateTime}</p>
      {loading && <p>Cargando tareas...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {}
      <p>
        <strong>{completedTasks}</strong> de <strong>{totalTasks}</strong> tareas completadas
      </p>

      {}
      {totalTasks > 0 && completedTasks === totalTasks && (
        <p className="success-message">🎉 ¡Felicidades! Has completado todas tus tareas. 🎉</p>
      )}

      <TaskForm onAdd={(task) => setTasks([...tasks, task])} />
      <TaskList tasks={tasks} setTasks={setTasks} />
    </div>
  );
};

export default App;
