// Importar dependencias necesarias
const request = require('supertest');
const app = require('./index'); // Asegúrate de que el archivo index.js exporte la aplicación Express
const mongoose = require('mongoose');

// Conectar a la base de datos antes de las pruebas
beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
});

// Desconectar de la base de datos después de las pruebas
afterAll(async () => {
  await mongoose.connection.close();
});

// Pruebas para las rutas de tareas
describe('API de Tareas', () => {
  it('debería obtener todas las tareas', async () => {
    const response = await request(app).get('/api/tasks');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('debería crear una nueva tarea', async () => {
    const response = await request(app).post('/api/tasks').send({ title: 'Nueva Tarea' });
    expect(response.status).toBe(201);
    expect(response.body.title).toBe('Nueva Tarea');
  });

  it('debería actualizar una tarea existente', async () => {
    const task = await request(app).post('/api/tasks').send({ title: 'Tarea a Actualizar' });
    const response = await request(app).put(`/api/tasks/${task.body._id}`).send({ completed: true });
    expect(response.status).toBe(200);
    expect(response.body.completed).toBe(true);
  });

  it('debería eliminar una tarea', async () => {
    const task = await request(app).post('/api/tasks').send({ title: 'Tarea a Eliminar' });
    const response = await request(app).delete(`/api/tasks/${task.body._id}`);
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('✅ Tarea eliminada con éxito');
  });
});
