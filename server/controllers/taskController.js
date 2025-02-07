const Task = require("../models/Task");

// Obtener todas las tareas
router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener tareas" });
  }
});

// Crear una nueva tarea
router.post("/", async (req, res) => {
  const { title } = req.body;
  if (!title) {
    return res.status(400).json({ message: "El título es obligatorio" });
  }
  try {
    const newTask = new Task({ title });
    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ message: "Error al crear la tarea" });
  }
});

// Actualizar una tarea
router.put("/:id", async (req, res) => {
  const { completed } = req.body;
  try {
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, { completed }, { new: true });
    if (!updatedTask) {
      return res.status(404).json({ message: "Tarea no encontrada" });
    }
    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar la tarea" });
  }
});

// Eliminar una tarea
router.delete("/:id", async (req, res) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);
    if (!deletedTask) {
      return res.status(404).json({ message: "Tarea no encontrada" });
    }
    res.json({ message: "Tarea eliminada" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar la tarea" });
  }
});

module.exports = router;
