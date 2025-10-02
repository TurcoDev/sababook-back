import db from '../config/db.js';

// Crear comentario
export const crearComentario = async (req, res) => {
  try {
    const { foro_id, usuario_id, contenido } = req.body;
    const [result] = await db.execute(
      'INSERT INTO comentario_foro (foro_id, usuario_id, contenido) VALUES (?, ?, ?)',
      [foro_id, usuario_id, contenido]
    );
    res.status(201).json({ comentario_id: result.insertId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al crear el comentario' });
  }
};

// Obtener todos los comentarios (opcional filtro por foro_id)
export const obtenerComentarios = async (req, res) => {
  try {
    let query = 'SELECT * FROM comentario_foro';
    const params = [];
    if (req.query.foro_id) {
      query += ' WHERE foro_id = ?';
      params.push(req.query.foro_id);
    }
    const [rows] = await db.execute(query, params);
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al obtener los comentarios' });
  }
};

// Obtener comentario por id
export const obtenerComentario = async (req, res) => {
  try {
    const [rows] = await db.execute('SELECT * FROM comentario_foro WHERE comentario_id = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ mensaje: 'Comentario no encontrado' });
    res.json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al obtener el comentario' });
  }
};

// Actualizar comentario
export const actualizarComentario = async (req, res) => {
  try {
    const { contenido } = req.body;
    const [result] = await db.execute(
      'UPDATE comentario_foro SET contenido = ? WHERE comentario_id = ?',
      [contenido, req.params.id]
    );
    if (result.affectedRows === 0) return res.status(404).json({ mensaje: 'Comentario no encontrado' });
    res.json({ mensaje: 'Comentario actualizado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al actualizar el comentario' });
  }
};

// Eliminar comentario
export const eliminarComentario = async (req, res) => {
  try {
    const [result] = await db.execute('DELETE FROM comentario_foro WHERE comentario_id = ?', [req.params.id]);
    if (result.affectedRows === 0) return res.status(404).json({ mensaje: 'Comentario no encontrado' });
    res.json({ mensaje: 'Comentario eliminado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al eliminar el comentario' });
  }
};
