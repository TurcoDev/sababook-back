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
