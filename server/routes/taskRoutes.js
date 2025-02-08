const express = require("express");
const Task = require("../models/Task");
const mongoose = require("mongoose");
const router = express.Router();

// Obtener todas las tareas
router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find(); 
    res.json(tasks);
  } catch (error) {
    console.error("❌ Error obteniendo tareas:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
});

// Crear una nueva tarea
router.post("/", async (req, res) => {
  const { title } = req.body;
  const newTask = new Task({ title });
  await newTask.save();
  res.json(newTask);
});

// Actualizar una tarea
router.put("/:id", async (req, res) => {
  const { completed } = req.body;
  const updatedTask = await Task.findByIdAndUpdate(req.params.id, { completed }, { new: true });
  res.json(updatedTask);
});

// Eliminar una tarea
router.delete("/:id", async (req, res) => {
  try {
    let { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "❌ ID no válido" });
    }

    const deletedTask = await Task.findByIdAndDelete(id);

    if (!deletedTask) {
      return res.status(404).json({ message: "❌ Tarea no encontrada" });
    }

    res.json({ message: "✅ Tarea eliminada con éxito" });
  } catch (error) {
    console.error("❌ Error eliminando tarea:", error.message, error.stack);
    res.status(500).json({ message: "❌ Error interno del servidor" });
  }
});

module.exports = router;
