// server.js
import express from 'express';
import cors from 'cors';
import foroRoutes from './src/routes/foro.js';
import comentarioRoutes from './src/routes/comentario.js';
import userRoutes from './src/routes/user.routes.js'; // viene de main
import { initDB } from './src/db/connect/connectDB.js';
import listaRoutes from "./src/routes/lista.routes.js";
import listaLecturaRoutes from "./src/routes/listaLectura.routes.js";

const app = express();
const PORT = 3000;

// Middleware
app.use(cors({
  origin: ['http://localhost:3000', 'http://127.0.0.1:3000', 'null'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Rutas
app.use('/foro', foroRoutes);
app.use('/comentario', comentarioRoutes);
app.use('/api/v1/user', userRoutes);
app.use("/api/v1/listas", listaRoutes);
app.use("/api/v1/listas-lectura", listaLecturaRoutes);

app.get("/", (req, res) => {
  res.status(200).send("Hello World!\n");
});

// Iniciar servidor
initDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  });
}).catch((error) => {
  console.error('Error al conectar a la base de datos:', error);
  process.exit(1);
});
