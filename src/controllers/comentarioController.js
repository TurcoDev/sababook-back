import { medallaService } from '../services/medalla.service.js';
// controllers/comentarioController.js
import { db as sql } from '../db/connect/db.js';

// Crear comentario
export const crearComentario = async (req, res) => {
  try {
    const { foro_id, usuario_id, contenido } = req.body;

    const result = await sql`
      INSERT INTO comentario_foro (foro_id, usuario_id, contenido)
      VALUES (${foro_id}, ${usuario_id}, ${contenido})
      RETURNING comentario_id
    `;

    // 🔁 Chequear y asignar medallas si corresponde
    await medallaService.verificarYAsignarMedallas(usuario_id);

    res.status(201).json({ comentario_id: result[0].comentario_id });
  } catch (error) {
    console.error("❌ Error al crear comentario:", error);
    res.status(500).json({
      mensaje: 'Error al crear el comentario',
      detalle: error.message,
    });
  }
};


// Obtener todos los comentarios (opcional: filtrar por foro_id)
export const obtenerComentarios = async (req, res) => {
  try {
    let result;
    if (req.query.foro_id) {
      const foroId = parseInt(req.query.foro_id);
      result = await sql`
        SELECT * FROM comentario_foro WHERE foro_id = ${foroId} ORDER BY fecha ASC
      `;
    } else {
      result = await sql`SELECT * FROM comentario_foro ORDER BY fecha ASC`;
    }

    res.json(result);
  } catch (error) {
    console.error("❌ Error al obtener comentarios:", error);
    res.status(500).json({ mensaje: 'Error al obtener los comentarios' });
  }
};

// Obtener un comentario por ID
export const obtenerComentario = async (req, res) => {
  try {
    const comentarioId = parseInt(req.params.id);
    const result = await sql`
      SELECT * FROM comentario_foro WHERE comentario_id = ${comentarioId}
    `;

    if (result.length === 0) {
      return res.status(404).json({ mensaje: 'Comentario no encontrado' });
    }

    res.json(result[0]);
  } catch (error) {
    console.error("❌ Error al obtener comentario:", error);
    res.status(500).json({ mensaje: 'Error al obtener el comentario' });
  }
};

// Actualizar comentario
export const actualizarComentario = async (req, res) => {
  try {
    const comentarioId = parseInt(req.params.id);
    const { contenido } = req.body;

    const result = await sql`
      UPDATE comentario_foro
      SET contenido = ${contenido}
      WHERE comentario_id = ${comentarioId}
      RETURNING comentario_id
    `;

    if (result.length === 0) {
      return res.status(404).json({ mensaje: 'Comentario no encontrado' });
    }

    res.json({ mensaje: 'Comentario actualizado correctamente' });
  } catch (error) {
    console.error("❌ Error al actualizar comentario:", error);
    res.status(500).json({ mensaje: 'Error al actualizar el comentario' });
  }
};

// Eliminar comentario
export const eliminarComentario = async (req, res) => {
  try {
    const comentarioId = parseInt(req.params.id);

    const result = await sql`
      DELETE FROM comentario_foro
      WHERE comentario_id = ${comentarioId}
      RETURNING comentario_id
    `;

    if (result.length === 0) {
      return res.status(404).json({ mensaje: 'Comentario no encontrado' });
    }

    res.json({ mensaje: 'Comentario eliminado correctamente' });
  } catch (error) {
    console.error("❌ Error al eliminar comentario:", error);
    res.status(500).json({ mensaje: 'Error al eliminar el comentario' });
  }
};
