// controllers/foroController.js
import sql from '../db/connect/connectDB.js';

// Crear un foro
export const crearForo = async (req, res) => {
    try {
        const { titulo, descripcion, creador_id } = req.body;
        const result = await sql`
            INSERT INTO foro (titulo, descripcion, creador_id)
            VALUES (${titulo}, ${descripcion}, ${creador_id})
            RETURNING foro_id
        `;
        res.status(201).json({ foro_id: result[0].foro_id });
    } catch (error) {
        console.error("❌ Error al crear foro:", error);
        res.status(500).json({ mensaje: 'Error al crear el foro', detalle: error.message });
    }
};

// Obtener todos los foros
export const obtenerForos = async (req, res) => {
    try {
        const result = await sql`SELECT * FROM foro ORDER BY fecha_creacion DESC`;
        res.json(result);
    } catch (error) {
        console.error("❌ Error al obtener foros:", error);
        res.status(500).json({ mensaje: 'Error al obtener los foros' });
    }
};

// Obtener un foro por ID
export const obtenerForo = async (req, res) => {
    try {
        const foroId = parseInt(req.params.id);
        const result = await sql`SELECT * FROM foro WHERE foro_id = ${foroId}`;
        if (result.length === 0) return res.status(404).json({ mensaje: 'Foro no encontrado' });
        res.json(result[0]);
    } catch (error) {
        console.error("❌ Error al obtener foro:", error);
        res.status(500).json({ mensaje: 'Error al obtener el foro' });
    }
};

// Actualizar un foro
export const actualizarForo = async (req, res) => {
    try {
        const foroId = parseInt(req.params.id);
        const { titulo, descripcion } = req.body;
        const result = await sql`
            UPDATE foro
            SET titulo = ${titulo}, descripcion = ${descripcion}
            WHERE foro_id = ${foroId}
            RETURNING foro_id
        `;
        if (result.length === 0) return res.status(404).json({ mensaje: 'Foro no encontrado' });
        res.json({ mensaje: 'Foro actualizado correctamente' });
    } catch (error) {
        console.error("❌ Error al actualizar foro:", error);
        res.status(500).json({ mensaje: 'Error al actualizar el foro' });
    }
};

// Eliminar un foro
export const eliminarForo = async (req, res) => {
    try {
        const foroId = parseInt(req.params.id);
        const result = await sql`
            DELETE FROM foro
            WHERE foro_id = ${foroId}
            RETURNING foro_id
        `;
        if (result.length === 0) return res.status(404).json({ mensaje: 'Foro no encontrado' });
        res.json({ mensaje: 'Foro eliminado correctamente' });
    } catch (error) {
        console.error("❌ Error al eliminar foro:", error);
        res.status(500).json({ mensaje: 'Error al eliminar el foro' });
    }
};
