import { Router } from 'express';
import { crearForo, obtenerForos, obtenerForo, actualizarForo, eliminarForo } from '../src/controllers/foroController.js';

const router = Router();

router.post('/', crearForo);
router.get('/', obtenerForos);
router.get('/:id', obtenerForo);
router.put('/:id', actualizarForo);
router.delete('/:id', eliminarForo);

export default router;
