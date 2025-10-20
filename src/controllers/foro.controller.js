// controllers/foroController.js
import {
    crearForoDB,
    obtenerTodosForosDB,
    obtenerForoPorIdDB,
    actualizarForoDB,
    eliminarForoDB
} from '../models/foro.model.js';

// Crear un foro
export const crearForo = async (req, res) => {
    try {
        const { titulo, descripcion, creador_id } = req.body;
        const nuevoForo = await crearForoDB(titulo, descripcion, creador_id);
        res.status(201).json({ foro_id: nuevoForo.foro_id });
    } catch (error) {
        console.error("❌ Error al crear foro:", error);
        res.status(500).json({ mensaje: 'Error al crear el foro', detalle: error.message });
    }
};

// Obtener todos los foros
export const obtenerForos = async (req, res) => {
    try {
        const foros = await obtenerTodosForosDB();
        res.json(foros);
    } catch (error) {
        console.error("❌ Error al obtener foros:", error);
        res.status(500).json({ mensaje: 'Error al obtener los foros' });
    }
};

// Obtener un foro por ID
export const obtenerForo = async (req, res) => {
    try {
        const foro = await obtenerForoPorIdDB(parseInt(req.params.id));
        if (!foro) return res.status(404).json({ mensaje: 'Foro no encontrado' });
        res.json(foro);
    } catch (error) {
        console.error("❌ Error al obtener foro:", error);
        res.status(500).json({ mensaje: 'Error al obtener el foro' });
    }
};

// Actualizar un foro
export const actualizarForo = async (req, res) => {
    try {
        const { titulo, descripcion } = req.body;
        const foroActualizado = await actualizarForoDB(parseInt(req.params.id), titulo, descripcion);
        if (!foroActualizado) return res.status(404).json({ mensaje: 'Foro no encontrado' });
        res.json({ mensaje: 'Foro actualizado correctamente' });
    } catch (error) {
        console.error("❌ Error al actualizar foro:", error);
        res.status(500).json({ mensaje: 'Error al actualizar el foro' });
    }
};

// Eliminar un foro
export const eliminarForo = async (req, res) => {
    try {
        const foroEliminado = await eliminarForoDB(parseInt(req.params.id));
        if (!foroEliminado) return res.status(404).json({ mensaje: 'Foro no encontrado' });
        res.json({ mensaje: 'Foro eliminado correctamente' });
    } catch (error) {
        console.error("❌ Error al eliminar foro:", error);
        res.status(500).json({ mensaje: 'Error al eliminar el foro' });
    }
};
