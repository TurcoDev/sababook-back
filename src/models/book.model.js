const pool = require('../db');

exports.obtenerTodos = async () => {
  const result = await pool.query('SELECT * FROM libro');
  return result.rows;
};

exports.obtenerPorId = async (id) => {
  const result = await pool.query('SELECT * FROM libro WHERE libro_id = $1', [id]);
  return result.rows[0];
};
