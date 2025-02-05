const mongoose = require('mongoose');

const tareaSchema = new mongoose.Schema({
  titulo: String,
  completada: Boolean,
});

const Tarea = mongoose.model('Tarea', tareaSchema);

module.exports = Tarea;
