const pool = require('../db');

exports.obtenerTodos = async () => {
  const result = await pool.query('SELECT * FROM libro');
  return result.rows;
};

exports.obtenerPorId = async (id) => {
  const result = await pool.query('SELECT * FROM libro WHERE libro_id = $1', [id]);
  return result.rows[0];
};

exports.buscarLibros = async ({ titulo, autor, genero, nivel_educativo }) => {
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

  const result = await pool.query(query, valores);
  return result.rows;
};

