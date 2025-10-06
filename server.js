import express from "express";
import cors from "cors";
import userRoutes from "./src/routes/user.routes.js";

const app = express();

// Permitir todos los orígenes (solo para desarrollo)
// O configurar CORS específicamente
app.use(cors({
  origin: ['http://localhost:3000', 'http://127.0.0.1:3000', 'null'], // null para archivos locales
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middleware para parsear JSON
app.use(express.json());

// Rutas
app.use("/api/v1", userRoutes);

// Ruta de prueba
app.get("/", (req, res) => {
  res.status(200).send("Hello World!\n");
});

// Iniciar el servidor
app.listen(3000, "localhost", () => {
  console.log("Server is running on http://localhost:3000");
});