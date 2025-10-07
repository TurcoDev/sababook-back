import { Router } from 'express';
import { getAllUsersController } from '../controllers/user.controller.js';

const router = Router();

router.get('/user', getAllUsersController);

export default router;


