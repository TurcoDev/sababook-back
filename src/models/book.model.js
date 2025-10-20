import { db } from '../db/connect/db.js';

// Obtener todos los libros
export const obtenerTodos = async () => {
  try {
    const result = await db.any('SELECT * FROM libro');
    return result;
  } catch (error) {
    console.error('Error al obtener todos los libros:', error);
    throw error;
  }
};

// Obtener libro por ID
export const obtenerPorId = async (id) => {
  const result = await db.oneOrNone('SELECT * FROM libro WHERE libro_id = $1', [id]);
  return result;
};

// Buscar libros con filtros
export const buscarLibros = async ({ titulo, autor, genero, nivel_educativo }) => {
  const filtros = [];
  const valores = [];

  if (titulo) {
    filtros.push(`titulo ILIKE $${filtros.length + 1}`);
    valores.push(`%${titulo}%`);
  }
  if (autor) {
    filtros.push(`autor ILIKE $${filtros.length + 1}`);
    valores.push(`%${autor}%`);
  }
  if (genero) {
    filtros.push(`genero = $${filtros.length + 1}`);
    valores.push(genero);
  }
  if (nivel_educativo) {
    filtros.push(`nivel_educativo = $${filtros.length + 1}`);
    valores.push(nivel_educativo);
  }

  const query = filtros.length > 0
    ? `SELECT * FROM libro WHERE ${filtros.join(' AND ')}`
    : 'SELECT * FROM libro';

  const result = await db.any(query, valores);
  return result;
};

// Actualizar libro
export const actualizarLibro = async (id, datos) => {
  const campos = [];
  const valores = [];
  let i = 1;

  for (const [clave, valor] of Object.entries(datos)) {
    campos.push(`${clave} = $${i}`);
    valores.push(valor);
    i++;
  }

  valores.push(id);
  const query = `UPDATE libro SET ${campos.join(', ')} WHERE libro_id = $${i} RETURNING *`;
  await db.oneOrNone(query, valores);
};

// Eliminar libro físicamente
export const eliminarLibro = async (id) => {
  await db.result('DELETE FROM libro WHERE libro_id = $1', [id]);
};

// Eliminación lógica
export const eliminacionLogica = async (id) => {
  await db.result('UPDATE libro SET activo = false WHERE libro_id = $1', [id]);
};