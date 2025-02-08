import { useState, useEffect } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import "./App.css";
import axios from "axios";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dateTime, setDateTime] = useState(new Date().toLocaleString());

  useEffect(() => {
    let isMounted = true; 

    const fetchTasks = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get("http://localhost:5000/api/tasks");
        if (isMounted) setTasks(data); 
      } catch (error) {
        console.error("❌ Error al obtener tareas:", error);
        if (isMounted) setError("Error al obtener tareas");
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchTasks();

    const interval = setInterval(() => {
      if (isMounted) setDateTime(new Date().toLocaleString());
    }, 1000);

    return () => {
      isMounted = false; 
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="container">
      <h1>¡Hola, Keila!</h1>
      <p>{dateTime}</p>
      
      {loading && <p>Cargando tareas...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      
      <TaskForm onAdd={(task) => setTasks((prevTasks) => [...prevTasks, task])} />
      <TaskList tasks={tasks} setTasks={setTasks} />
    </div>
  );
};

export default App;
