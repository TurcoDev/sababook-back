import {
  insertarComentario,
  obtenerComentariosPorForo,
  obtenerTodosComentarios,
  obtenerComentarioPorId,
  actualizarComentarioPorId,
  eliminarComentarioPorId
} from '../models/comment.model.js';
import { medalModel } from '../models/medal.model.js';

export const crearComentario = async (req, res) => {
  try {
    const { foro_id, usuario_id, contenido } = req.body;
    const nuevoComentario = await insertarComentario(foro_id, usuario_id, contenido);
    // Verificar y asignar medallas después de crear el comentario del usuario
    await medalModel.verificarYAsignarMedallas(usuario_id);
    res.status(201).json({ comentario_id: nuevoComentario.comentario_id });
  } catch (error) {
    console.error("❌ Error al crear comentario:", error);
    res.status(500).json({ mensaje: 'Error al crear el comentario', detalle: error.message });
  }
};

export const obtenerComentarios = async (req, res) => {
  try {
    let comentarios;
    if (req.params.foro_id) {
      comentarios = await obtenerComentariosPorForo(parseInt(req.params.foro_id));
    } else {
      comentarios = await obtenerTodosComentarios();
    }
    res.json(comentarios);
  } catch (error) {
    console.error("❌ Error al obtener comentarios:", error);
    res.status(500).json({ mensaje: 'Error al obtener los comentarios' });
  }
};

export const obtenerComentario = async (req, res) => {
  try {
    const comentario = await obtenerComentarioPorId(parseInt(req.params.id));
    if (!comentario) return res.status(404).json({ mensaje: 'Comentario no encontrado' });
    res.json(comentario);
  } catch (error) {
    console.error("❌ Error al obtener comentario:", error);
    res.status(500).json({ mensaje: 'Error al obtener el comentario' });
  }
};

export const actualizarComentario = async (req, res) => {
  try {
    const comentarioActualizado = await actualizarComentarioPorId(parseInt(req.params.id), req.body.contenido);
    if (!comentarioActualizado) return res.status(404).json({ mensaje: 'Comentario no encontrado' });
    res.json({ mensaje: 'Comentario actualizado correctamente' });
  } catch (error) {
    console.error("❌ Error al actualizar comentario:", error);
    res.status(500).json({ mensaje: 'Error al actualizar el comentario' });
  }
};

export const eliminarComentario = async (req, res) => {
  try {
    const comentarioEliminado = await eliminarComentarioPorId(parseInt(req.params.id));
    if (!comentarioEliminado) return res.status(404).json({ mensaje: 'Comentario no encontrado' });
    res.json({ mensaje: 'Comentario eliminado correctamente' });
  } catch (error) {
    console.error("❌ Error al eliminar comentario:", error);
    res.status(500).json({ mensaje: 'Error al eliminar el comentario' });
  }
};
