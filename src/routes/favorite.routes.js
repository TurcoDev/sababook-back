import { Router } from "express";
import favoriteController from "../controllers/favorite.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";


const router = Router();

router.post("/", verifyToken, favoriteController.create);
router.get("/", verifyToken, favoriteController.getByUser);
router.delete("/:libro_id", verifyToken, favoriteController.delete);

router.get("/all", verifyToken, favoriteController.getAll);

export default router;
