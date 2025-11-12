// src/routes/favoritesRoutes.js
import { Router } from "express";
import { FavoritesController } from "../controllers/favoritesController.js";

const router = Router();

// Obtener todos los favoritos de un usuario
router.get("/:userId", FavoritesController.getFavorites);

// Agregar un nuevo favorito
router.post("/", FavoritesController.addFavorite);

// Eliminar un favorito
router.delete("/", FavoritesController.removeFavorite);

export default router;
