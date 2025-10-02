import { Router } from "express";
import UserController from "../controllers/user.controller.js";

const router = Router();

// Obtener todos los usuarios
router.get("/user", UserController.getAllUsers);

export default router;