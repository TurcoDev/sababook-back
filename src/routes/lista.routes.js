import { Router } from "express";
import ListaController from "../controllers/lista.controller.js";

const router = Router();

// GET todas las listas
router.get("/", ListaController.obtenerTodas);

// GET lista por ID
router.get("/:id", ListaController.obtenerPorId);

// POST nueva lista
router.post("/", ListaController.crear);

// PUT actualizar lista
router.put("/:id", ListaController.actualizar);

// DELETE eliminar lista
router.delete("/:id", ListaController.eliminar);

export default router;
