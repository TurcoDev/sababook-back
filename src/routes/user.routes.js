import { Router } from "express";
import UserController from "../controllers/user.controller.js";

const router = Router();

// Obtener todos los usuarios
router.get("/user", UserController.getAllUsers);

router.get("/user/:id", UserController.getUserById);

router.post("/user", UserController.createUser);

router.put("/user/:id", UserController.updateUser);

router.delete("/user/:id", UserController.deleteUser);  

export default router;