import { db } from '../db.js';

class MedallaService {
    async verificarYAsignarMedallas(usuario_id) {
        try {
            // Verificar cantidad de opiniones
            const { count: cantidadOpiniones } = await db.one(`
        SELECT COUNT(*) FROM opinion WHERE usuario_id = $1
      `, [usuario_id]);

            if (parseInt(cantidadOpiniones, 10) >= 10) {
                await this.asignarMedallaSiNoTiene(usuario_id, 'Opinador', 'Ha opinado en más de 10 libros.', 'opinar');
            }

            // Verificar cantidad de participaciones en foros
            const { count: cantidadForos } = await db.one(`
        SELECT COUNT(*) FROM comentario_foro WHERE usuario_id = $1
      `, [usuario_id]);

            if (parseInt(cantidadForos, 10) >= 10) {
                await this.asignarMedallaSiNoTiene(usuario_id, 'Debatiente', 'Ha participado en más de 10 foros.', 'participar');
            }

        } catch (error) {
            console.error('Error al verificar o asignar medallas:', error.message);
        }
    }

    async asignarMedallaSiNoTiene(usuario_id, nombre, descripcion, tipo_accion) {
        // Verifica si la medalla ya existe, si no, la crea
        const medalla = await db.oneOrNone(`
      SELECT * FROM medalla WHERE nombre = $1
    `, [nombre]);

        let medalla_id;

        if (!medalla) {
            const nuevaMedalla = await db.one(`
        INSERT INTO medalla (nombre, descripcion, tipo_accion)
        VALUES ($1, $2, $3)
        RETURNING medalla_id
      `, [nombre, descripcion, tipo_accion]);

            medalla_id = nuevaMedalla.medalla_id;
        } else {
            medalla_id = medalla.medalla_id;
        }

        // Verifica si el usuario ya tiene la medalla
        const yaTiene = await db.oneOrNone(`
      SELECT * FROM usuario_medalla WHERE usuario_id = $1 AND medalla_id = $2
    `, [usuario_id, medalla_id]);

        if (!yaTiene) {
            await db.none(`
        INSERT INTO usuario_medalla (usuario_id, medalla_id)
        VALUES ($1, $2)
      `, [usuario_id, medalla_id]);

            console.log(`✅ Medalla '${nombre}' asignada al usuario ${usuario_id}`);
        }
    }
}

export const medallaService = new MedallaService();
