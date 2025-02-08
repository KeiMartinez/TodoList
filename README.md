# Proyecto Todo List

## Descripción
Este proyecto es una aplicación de lista de tareas (Todo List) que permite a los usuarios añadir, listar, actualizar y eliminar tareas, con datos persistentes en una base de datos. Utiliza React para el front-end, Express.js para el back-end y MongoDB como base de datos.

## Requisitos
Asegúrate de tener instaladas las siguientes herramientas en tu máquina:
- Node.js y npm
- MongoDB Community Server o una cuenta en MongoDB Atlas para usar una base de datos en la nube.
- Un editor de código como Visual Studio Code.
- Opcional: Postman para probar tu API.

## Estructura del Proyecto
El proyecto está organizado en dos carpetas principales:
- **client**: para el desarrollo del front-end.
- **server**: para el desarrollo del back-end.

## Configuración del Proyecto
1. Clona el repositorio en tu máquina.
2. Navega a la carpeta `server` y ejecuta:
   ```bash
   npm install
   ```
3. Crea un archivo `.env` en la carpeta `server` y agrega la URI de conexión a MongoDB:
   ```
   MONGO_URI=tu_uri_de_mongodb
   ```
4. Inicia el servidor:
   ```bash
   node index.js
   ```

5. Navega a la carpeta `client` y ejecuta:
   ```bash
   npm install
   ```
6. Inicia la aplicación React:
   ```bash
   npm run dev
   ```

## Uso de la API
- **GET /api/tasks**: Obtiene todas las tareas.
- **POST /api/tasks**: Crea una nueva tarea.
- **PUT /api/tasks/:id**: Actualiza una tarea existente.
- **DELETE /api/tasks/:id**: Elimina una tarea.

## Pruebas
Consulta el archivo `tests.md` en la carpeta `server` para obtener un conjunto de pruebas que puedes realizar para validar el funcionamiento de la aplicación.

