import { medallaService } from '../services/medalla.service.js';
import { db } from '../db.js';

import {
    getAllMedallas,
    createMedalla,
    updateMedalla,
    deleteMedalla,
} from '../models/medalla.model.js';

export const obtenerMedallas = async (req, res) => {
    try {
        const medallas = await getAllMedallas();
        res.status(200).json(medallas);
    } catch (error) {
        console.error('❌ Error al obtener medallas:', error.message);
        res.status(500).json({ error: 'Error al obtener medallas' });
    }
};

export const crearMedalla = async (req, res) => {
    try {
        const { nombre, descripcion, tipo_accion } = req.body;
        const result = await createMedalla({ nombre, descripcion, tipo_accion });
        res.status(201).json({ mensaje: '✅ Medalla creada', medalla: result[0] });
    } catch (error) {
        console.error('❌ Error al crear medalla:', error.message);
        res.status(500).json({ error: 'Error al crear medalla' });
    }
};

export const actualizarMedalla = async (req, res) => {
    try {
        const medallaId = parseInt(req.params.id);
        const { nombre, descripcion, tipo_accion } = req.body;
        const result = await updateMedalla(medallaId, { nombre, descripcion, tipo_accion });

        if (result.length === 0) {
            return res.status(404).json({ error: 'Medalla no encontrada' });
        }

        res.json({ mensaje: '✅ Medalla actualizada', medalla: result[0] });
    } catch (error) {
        console.error('❌ Error al actualizar medalla:', error.message);
        res.status(500).json({ error: 'Error al actualizar medalla' });
    }
};

export const eliminarMedalla = async (req, res) => {
    try {
        const medallaId = parseInt(req.params.id);
        const result = await deleteMedalla(medallaId);

        if (result.length === 0) {
            return res.status(404).json({ error: 'Medalla no encontrada' });
        }

        res.json({ mensaje: '✅ Medalla eliminada', medalla: result[0] });
    } catch (error) {
        console.error('❌ Error al eliminar medalla:', error.message);
        res.status(500).json({ error: 'Error al eliminar medalla' });
    }
};

// Nuevo controlador para verificar y asignar medallas a un usuario
export const verificarYAsignarMedallas = async (req, res) => {
    const usuario_id = parseInt(req.params.usuario_id);

    if (isNaN(usuario_id)) {
        return res.status(400).json({ error: 'ID de usuario inválido' });
    }

    try {
        await medallaService.verificarYAsignarMedallas(usuario_id);
        res.status(200).json({ mensaje: `✅ Medallas verificadas/asignadas para el usuario ${usuario_id}` });
    } catch (error) {
        console.error('❌ Error al verificar/asignar medallas:', error.message);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

export const verificarMedallasPorUsuario = async (req, res) => {
    const usuario_id = parseInt(req.params.usuario_id, 10);

    if (isNaN(usuario_id)) {
        return res.status(400).json({ error: 'ID de usuario inválido' });
    }

    try {
        await medallaService.verificarYAsignarMedallas(usuario_id);
        res.status(200).json({ mensaje: `Medallas verificadas para el usuario ${usuario_id}` });
    } catch (error) {
        console.error('Error al verificar medallas:', error.message);
        res.status(500).json({ error: 'Error al verificar medallas' });
    }
};


export const obtenerMedallasDeUsuario = async (req, res) => {
    const usuario_id = parseInt(req.params.usuario_id, 10);

    if (isNaN(usuario_id)) {
        return res.status(400).json({ error: 'ID de usuario inválido' });
    }

    try {
        const medallas = await db.any(`
            SELECT m.medalla_id, m.nombre, m.descripcion, m.tipo_accion, um.fecha_obtenida
            FROM usuario_medalla um
            JOIN medalla m ON um.medalla_id = m.medalla_id
            WHERE um.usuario_id = $1
        `, [usuario_id]);

        res.status(200).json(medallas);
    } catch (error) {
        console.error('❌ Error al obtener medallas del usuario:', error.message);
        res.status(500).json({ error: 'Error al obtener medallas del usuario' });
    }
};