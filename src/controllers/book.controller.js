import { obtenerTodos, obtenerPorId, buscarLibros, actualizarLibro, eliminarLibro, eliminacionLogica as eliminacionLogicaModel } from '../models/book.model.js';

class BookController {
  async obtenerCatalogo(req, res) {
    try {
      const libros = await obtenerTodos();
      res.json(libros);
    } catch (error) {
      console.error('Error al obtener catálogo:', error);
      res.status(500).json({ mensaje: 'Error al obtener libros' });
    }
  }

  async verDetalle(req, res) {
    const { id } = req.params;
    try {
      const libro = await obtenerPorId(id);
      if (!libro) {
        return res.status(404).json({ mensaje: 'Libro no encontrado' });
      }
      res.json(libro);
    } catch (error) {
      console.error('Error al obtener detalle:', error);
      res.status(500).json({ mensaje: 'Error al obtener detalle del libro' });
    }
  }

  async buscar(req, res) {
    try {
      const libros = await buscarLibros(req.query);
      res.json(libros);
    } catch (error) {
      console.error('Error al buscar libros:', error);
      res.status(500).json({ mensaje: 'Error al buscar libros' });
    }
  }

  async actualizar(req, res) {
    const { id } = req.params;
    try {
      await actualizarLibro(id, req.body);
      res.json({ mensaje: 'Libro actualizado correctamente' });
    } catch (error) {
      console.error('Error al actualizar:', error);
      res.status(500).json({ mensaje: 'Error al actualizar libro' });
    }
  }

  async eliminar(req, res) {
    const { id } = req.params;
    try {
      await eliminarLibro(id);
      res.json({ mensaje: 'Libro eliminado correctamente' });
    } catch (error) {
      console.error('Error al eliminar:', error);
      res.status(500).json({ mensaje: 'Error al eliminar libro' });
    }
  }

  async eliminacionLogica(req, res) {
    const { id } = req.params;
    try {
      await eliminacionLogicaModel(id);
      res.json({ mensaje: 'Libro marcado como inactivo' });
    } catch (error) {
      console.error('Error al marcar como inactivo:', error);
      res.status(500).json({ mensaje: 'Error al marcar libro como inactivo' });
    }
  }
}

export default new BookController();
