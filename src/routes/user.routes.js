import { Router } from 'express';
import UserController from '../controllers/user.controller.js';
import { requireRole, verifyToken } from '../middleware/auth.middleware.js';

const router = Router();
const roldAdmin = 3;

// Obtener todos los usuarios
router.get("/",verifyToken,requireRole(roldAdmin), UserController.getAllUsers);

router.get("/:id",verifyToken, UserController.getUserById);

router.post("/", UserController.createUser);

router.put("/:id",verifyToken, UserController.updateUser);

router.delete("/:id",verifyToken,requireRole(roldAdmin), UserController.deleteUser);  

export default router;

