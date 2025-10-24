// server.js
import express from 'express';
import cors from 'cors';
import foroRoutes from './src/routes/foro.routes.js';
import comentarioRoutes from './src/routes/comentario.routes.js';
import userRoutes from './src/routes/user.routes.js'; // viene de main
import { testConnection } from './src/db/connect/db.js';
import listaRoutes from "./src/routes/lista.routes.js";
import listaLecturaRoutes from "./src/routes/listaLectura.routes.js";
import authRoutes from "./src/routes/auth.routes.js";
import bookRoutes from "./src/routes/book.routes.js";
import opinionRoutes from "./src/routes/opinion.routes.js";

const app = express();
const PORT = 3000;

// Middleware
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:5173', 'http://127.0.0.1:3000', 'https://statuesque-truffle-a9d0a3.netlify.app/',  'null'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Rutas
app.use('/api/v1/foro', foroRoutes);
app.use('/api/v1/comentario', comentarioRoutes);
app.use('/api/v1/user', userRoutes);
app.use("/api/v1/listas", listaRoutes); 
app.use("/api/v1/listas-lectura", listaLecturaRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/libros", bookRoutes);
app.use("/api/v1/opinion", opinionRoutes);




app.get("/", (req, res) => {
  res.status(200).send("Hello World!\n");
});

// Iniciar servidor
testConnection().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  });
}).catch((error) => {
  console.error('Error al conectar a la base de datos:', error);
  process.exit(1);
});
