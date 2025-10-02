// server.js
import express from 'express';
import foroRoutes from './routes/foro.js';
import comentarioRoutes from './routes/comentario.js';

const app = express();
const PORT = 3000;

// Middleware para JSON
app.use(express.json());

// Rutas
app.use('/foro', foroRoutes);
app.use('/comentario', comentarioRoutes);

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});




