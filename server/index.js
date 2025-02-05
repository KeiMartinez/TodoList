const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/tareas', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});


app.use(express.json());
app.use(cors());

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

const Tarea = require('./models/Tarea');

app.get('/tareas', async (req, res) => {
  const tareas = await Tarea.find();
  res.json(tareas);
});

app.post('/tareas', async (req, res) => {
  const nuevaTarea = new Tarea(req.body);
  await nuevaTarea.save();
  res.json(nuevaTarea);
});

app.put('/tareas/:id', async (req, res) => {
  const tarea = await Tarea.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(tarea);
});

app.delete('/tareas/:id', async (req, res) => {
  await Tarea.findByIdAndDelete(req.params.id);
  res.json({ message: 'Tarea eliminada' });
});
