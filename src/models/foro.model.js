// models/foroModel.js
import { db } from '../db/connect/db.js';

// Crear un foro
export const crearForoDB = async (titulo, descripcion, creador_id) => {
  try {
    const result = await db.one(
      'INSERT INTO foro (titulo, descripcion, creador_id) VALUES ($1, $2, $3) RETURNING foro_id',
      [titulo, descripcion, creador_id]
    );
    return result; // contiene { foro_id: ... }
  } catch (error) {
    console.error('❌ Error en crearForoDB:', error.message);
    throw error;
  }
};

// Obtener todos los foros
export const obtenerTodosForosDB = async () => {
  try {
    return await db.any('SELECT * FROM foro ORDER BY fecha_creacion DESC');
  } catch (error) {
    console.error('❌ Error en obtenerTodosForosDB:', error.message);
    throw error;
  }
};

// Obtener un foro por ID
export const obtenerForoPorIdDB = async (foro_id) => {
  try {
    return await db.oneOrNone('SELECT * FROM foro WHERE foro_id = $1', [foro_id]);
  } catch (error) {
    console.error('❌ Error en obtenerForoPorIdDB:', error.message);
    throw error;
  }
};

// Actualizar un foro
export const actualizarForoDB = async (foro_id, titulo, descripcion) => {
  try {
    const result = await db.result(
      'UPDATE foro SET titulo = $1, descripcion = $2 WHERE foro_id = $3',
      [titulo, descripcion, foro_id]
    );
    return result.rowCount > 0; // true si se actualizó
  } catch (error) {
    console.error('❌ Error en actualizarForoDB:', error.message);
    throw error;
  }
};

// Eliminar un foro
export const eliminarForoDB = async (foro_id) => {
  try {
    const result = await db.result(
      'DELETE FROM foro WHERE foro_id = $1',
      [foro_id]
    );
    return result.rowCount > 0; // true si se eliminó
  } catch (error) {
    console.error('❌ Error en eliminarForoDB:', error.message);
    throw error;
  }
};
