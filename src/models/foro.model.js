import { db } from '../db/connect/db.js';

// Crear un foro
export const crearForoDB = async (titulo, descripcion, creador_id) => {
  const result = await db.any(`
    INSERT INTO foro (titulo, descripcion, creador_id)
    VALUES (${titulo}, ${descripcion}, ${creador_id})
    RETURNING foro_id
  `);
  return result[0];
};

// Obtener todos los foros
export const obtenerTodosForosDB = async () => {
  return await db.any(`SELECT * FROM foro ORDER BY fecha_creacion DESC`);
};

// Obtener un foro por ID
export const obtenerForoPorIdDB = async (foro_id) => {
  const result = await db.any(`
    SELECT * FROM foro WHERE foro_id = ${foro_id}
  `);
  return result[0];
};

// Actualizar un foro
export const actualizarForoDB = async (foro_id, titulo, descripcion) => {
  const result = await db.any(`
    UPDATE foro
    SET titulo = ${titulo}, descripcion = ${descripcion}
    WHERE foro_id = ${foro_id}
    RETURNING foro_id
  `);
  return result[0];
};

// Eliminar un foro
export const eliminarForoDB = async (foro_id) => {
  const result = await db.any(`
    DELETE FROM foro
    WHERE foro_id = ${foro_id}
    RETURNING foro_id
  `);
  return result[0];
};

// Obtener foro con comentarios y datos de usuario
export const obtenerForoConComentariosDB = async (foro_id) => {
  const foro = await db.oneOrNone(
    `SELECT f.foro_id, f.titulo, f.descripcion, f.fecha_creacion, 
            u.nombre AS creador_nombre, u.avatar_url AS creador_avatar
     FROM foro f
     JOIN usuario u ON f.creador_id = u.usuario_id
     WHERE f.foro_id = $1`,
    [foro_id]
  );

  if (!foro) return null;

  const comentarios = await db.any(
    `SELECT c.comentario_id, c.contenido, c.fecha, 
            u.nombre AS usuario_nombre, u.avatar_url AS usuario_avatar
     FROM comentario_foro c
     JOIN usuario u ON c.usuario_id = u.usuario_id
     WHERE c.foro_id = $1
     ORDER BY c.fecha ASC`,
    [foro_id]
  );

  return { ...foro, comentarios };
};
