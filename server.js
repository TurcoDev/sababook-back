import express from "express";
import cors from "cors";
import userRoutes from "./src/routes/user.routes.js";
import listaRoutes from "./src/routes/lista.routes.js";
import listaLecturaRoutes from "./src/routes/listaLectura.routes.js";

const app = express();

app.use(cors({
  origin: ['http://localhost:3000', 'http://127.0.0.1:3000', 'null'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Rutas
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/listas", listaRoutes);
app.use("/api/v1/listas-lectura", listaLecturaRoutes);

app.get("/", (req, res) => {
  res.status(200).send("Hello World!\n");
});

app.listen(3000, "localhost", () => {
  console.log("Server is running on http://localhost:3000");
});

