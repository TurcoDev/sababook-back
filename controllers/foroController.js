// controllers/foroController.js
import db from '../config/db.js';

// Crear un foro
export const crearForo = async (req, res) => {
    try {
        const { titulo, descripcion, creador_id } = req.body;
        const [result] = await db.execute(
            'INSERT INTO foro (titulo, descripcion, creador_id) VALUES (?, ?, ?)',
            [titulo, descripcion, creador_id]
        );
        res.status(201).json({ foro_id: result.insertId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al crear el foro' });
    }
};

// Obtener todos los foros
export const obtenerForos = async (req, res) => {
    try {
        const [rows] = await db.execute('SELECT * FROM foro');
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al obtener los foros' });
    }
};

// Obtener un foro por ID
export const obtenerForo = async (req, res) => {
    try {
        const [rows] = await db.execute('SELECT * FROM foro WHERE foro_id = ?', [req.params.id]);
        if (rows.length === 0) return res.status(404).json({ mensaje: 'Foro no encontrado' });
        res.json(rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al obtener el foro' });
    }
};

// Actualizar un foro
export const actualizarForo = async (req, res) => {
    try {
        const { titulo, descripcion } = req.body;
        const [result] = await db.execute(
            'UPDATE foro SET titulo = ?, descripcion = ? WHERE foro_id = ?',
            [titulo, descripcion, req.params.id]
        );
        if (result.affectedRows === 0) return res.status(404).json({ mensaje: 'Foro no encontrado' });
        res.json({ mensaje: 'Foro actualizado correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al actualizar el foro' });
    }
};

// Eliminar un foro
export const eliminarForo = async (req, res) => {
    try {
        const [result] = await db.execute('DELETE FROM foro WHERE foro_id = ?', [req.params.id]);
        if (result.affectedRows === 0) return res.status(404).json({ mensaje: 'Foro no encontrado' });
        res.json({ mensaje: 'Foro eliminado correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al eliminar el foro' });
    }
};
