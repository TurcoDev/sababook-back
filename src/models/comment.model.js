// models/comentarioModel.js
import sql from '../db/connect/connectDB.js';

export const insertarComentario = async (foro_id, usuario_id, contenido) => {
    const result = await sql`
    INSERT INTO comentario_foro (foro_id, usuario_id, contenido)
    VALUES (${foro_id}, ${usuario_id}, ${contenido})
    RETURNING comentario_id
  `;
    return result[0];
};

export const obtenerComentariosPorForo = async (foro_id) => {
    return await sql`
    SELECT * FROM comentario_foro WHERE foro_id = ${foro_id} ORDER BY fecha ASC
  `;
};

export const obtenerTodosComentarios = async () => {
    return await sql`SELECT * FROM comentario_foro ORDER BY fecha ASC`;
};

export const obtenerComentarioPorId = async (comentario_id) => {
    const result = await sql`
    SELECT * FROM comentario_foro WHERE comentario_id = ${comentario_id}
  `;
    return result[0];
};

export const actualizarComentarioPorId = async (comentario_id, contenido) => {
    const result = await sql`
    UPDATE comentario_foro
    SET contenido = ${contenido}
    WHERE comentario_id = ${comentario_id}
    RETURNING comentario_id
  `;
    return result[0];
};

export const eliminarComentarioPorId = async (comentario_id) => {
    const result = await sql`
    DELETE FROM comentario_foro
    WHERE comentario_id = ${comentario_id}
    RETURNING comentario_id
  `;
    return result[0];
};
