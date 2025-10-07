// src/controllers/user.controller.js
import { getAllUsers } from "../models/user.model.js";

export const getAllUsersController = async (req, res) => {
  try {
    const users = await getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    console.error("Error obteniendo usuarios:", error);
    res.status(500).json({ error: "No se pudo conectar a la base de datos" });
  }
};
