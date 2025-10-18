// models/foroModel.js
import sql from '../db/connect/connectDB.js';

export const crearForoDB = async (titulo, descripcion, creador_id) => {
    const result = await sql`
    INSERT INTO foro (titulo, descripcion, creador_id)
    VALUES (${titulo}, ${descripcion}, ${creador_id})
    RETURNING foro_id
  `;
    return result[0];
};

export const obtenerTodosForosDB = async () => {
    return await sql`SELECT * FROM foro ORDER BY fecha_creacion DESC`;
};

export const obtenerForoPorIdDB = async (foro_id) => {
    const result = await sql`
    SELECT * FROM foro WHERE foro_id = ${foro_id}
  `;
    return result[0];
};

export const actualizarForoDB = async (foro_id, titulo, descripcion) => {
    const result = await sql`
    UPDATE foro
    SET titulo = ${titulo}, descripcion = ${descripcion}
    WHERE foro_id = ${foro_id}
    RETURNING foro_id
  `;
    return result[0];
};

export const eliminarForoDB = async (foro_id) => {
    const result = await sql`
    DELETE FROM foro
    WHERE foro_id = ${foro_id}
    RETURNING foro_id
  `;
    return result[0];
};
