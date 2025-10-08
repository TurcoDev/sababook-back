const LibroModel = require('../models/book.model.js');

// 1. Mostrar catálogo
exports.obtenerCatalogo = async (req, res) => {
  try {
    const libros = await LibroModel.obtenerTodos();
    res.json(libros);
  } catch (error) {
    console.error('Error al obtener catálogo:', error);
    res.status(500).json({ mensaje: 'Error al obtener libros' });
  }
};
