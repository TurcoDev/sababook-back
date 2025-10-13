import { Router } from 'express';
import {
  crearComentario,
  obtenerComentarios,
  obtenerComentario,
  actualizarComentario,
  eliminarComentario
} from '../controllers/comentarioController.js';

const router = Router();

router.post('/', crearComentario);
router.get('/', obtenerComentarios);
router.get('/:id', obtenerComentario);
router.put('/:id', actualizarComentario);
router.delete('/:id', eliminarComentario);

export default router;
