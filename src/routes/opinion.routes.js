import { Router } from "express";
import OpinionController from "../controllers/opinion.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";

const router = Router();


router.get("/", OpinionController.getAllOpinions);
router.get("/:id", OpinionController.getOpinionById);
router.post("/", verifyToken, OpinionController.createOpinion);
router.put("/:id", verifyToken, OpinionController.updateOpinion);
router.delete("/:id", verifyToken, OpinionController.deleteOpinion);

export default router;
