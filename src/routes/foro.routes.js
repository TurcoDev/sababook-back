import { Router } from 'express';
import { crearForo, obtenerForos, obtenerForo, actualizarForo, eliminarForo } from '../controllers/foro.controller.js';
import { obtenerForoConComentarios } from '../controllers/foro.controller.js';
const router = Router();

router.post('/', crearForo);
router.get('/', obtenerForos);
router.get('/:id', obtenerForo);
router.put('/:id', actualizarForo);
router.delete('/:id', eliminarForo);
router.get('/:id/comentarios', obtenerForoConComentarios);

export default router;
