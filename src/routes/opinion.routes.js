import { Router } from "express";
import OpinionController from "../controllers/opinion.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";

const router = Router();

// ✅ Ver todas las opiniones (público)
router.get("/", OpinionController.getAllOpinions);

// ✅ Ver una opinión específica (público)
router.get("/:id", OpinionController.getOpinionById);

// ✅ Crear una opinión (solo usuarios logueados)
router.post("/", verifyToken, OpinionController.createOpinion);

// ✅ Actualizar una opinión (solo usuarios logueados)
router.put("/:id", verifyToken, OpinionController.updateOpinion);

// ✅ Eliminar una opinión (solo usuarios logueados o admin, si querés después se puede ajustar)
router.delete("/:id", verifyToken, OpinionController.deleteOpinion);

export default router;
