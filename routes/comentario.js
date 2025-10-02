import { Router } from 'express';
import {
  crearComentario,
  obtenerComentarios,
  obtenerComentario,
  actualizarComentario,
  eliminarComentario
} from '../controllers/comentarioController.js';

const router = Router();

// Crear comentario
router.post('/', crearComentario);

// Obtener todos los comentarios de un foro (puedes filtrar por foro_id con query param)
router.get('/', obtenerComentarios);

// Obtener un comentario por id
router.get('/:id', obtenerComentario);

// Actualizar comentario
router.put('/:id', actualizarComentario);

// Eliminar comentario
router.delete('/:id', eliminarComentario);

export default router;
