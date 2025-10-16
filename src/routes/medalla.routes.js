import {
    obtenerMedallas,
    crearMedalla,
    actualizarMedalla,
    eliminarMedalla,
    obtenerMedallasDeUsuario,
    verificarYAsignarMedallas
} from '../controllers/medalla.controller.js';

import { Router } from 'express';

const router = Router();

router.get('/', obtenerMedallas);
router.post('/', crearMedalla);
router.put('/:id', actualizarMedalla);
router.delete('/:id', eliminarMedalla);
router.post('/verificar/:usuario_id', verificarYAsignarMedallas);
router.get('/usuario/:usuario_id', obtenerMedallasDeUsuario);

export default router;
