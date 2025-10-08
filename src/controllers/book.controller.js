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

// 2. Ver detalle
exports.verDetalle = async (req, res) => {
  const { id } = req.params;
  try {
    const libro = await LibroModel.obtenerPorId(id);
    if (!libro) {
      return res.status(404).json({ mensaje: 'Libro no encontrado' });
    }
    res.json(libro);
  } catch (error) {
    console.error('Error al obtener detalle:', error);
    res.status(500).json({ mensaje: 'Error al obtener detalle del libro' });
  }
};

// 3. Buscar
exports.buscar = async (req, res) => {
  try {
    const libros = await LibroModel.buscarLibros(req.query);
    res.json(libros);
  } catch (error) {
    console.error('Error al buscar libros:', error);
    res.status(500).json({ mensaje: 'Error al buscar libros' });
  }
};

exports.actualizar = async (req, res) => {
  const { id } = req.params;
  try {
    await LibroModel.actualizarLibro(id, req.body);
    res.json({ mensaje: 'Libro actualizado correctamente' });
  } catch (error) {
    console.error('Error al actualizar:', error);
    res.status(500).json({ mensaje: 'Error al actualizar libro' });
  }
};