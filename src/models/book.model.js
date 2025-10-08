const pool = require('../db');

exports.obtenerTodos = async () => {
  const result = await pool.query('SELECT * FROM libro');
  return result.rows;
};
