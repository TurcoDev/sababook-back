// src/controllers/favoritesController.js
import { FavoritesModel } from "../models/favoritos.model.js";

export const FavoritesController = {
  async getFavorites(req, res) {
    try {
      const { userId } = req.params;
      const favorites = await FavoritesModel.getByUserId(userId);

      return res.status(200).json(favorites);
    } catch (error) {
      console.error("Error al obtener favoritos:", error);
      return res.status(500).json({ message: "Error al obtener favoritos" });
    }
  },
};
