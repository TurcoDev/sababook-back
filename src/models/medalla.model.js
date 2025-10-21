// import { db as sql } from '../db/connect/db.js';

// export const getAllMedallas = async () => {
//   return await sql`SELECT * FROM medalla ORDER BY medalla_id ASC`;
// };

// export const createMedalla = async ({ nombre, descripcion, tipo_accion }) => {
//   return await sql`
//     INSERT INTO medalla (nombre, descripcion, tipo_accion)
//     VALUES (${nombre}, ${descripcion}, ${tipo_accion})
//     RETURNING *;
//   `;
// };

// export const updateMedalla = async (id, { nombre, descripcion, tipo_accion }) => {
//   return await sql`
//     UPDATE medalla
//     SET nombre = ${nombre},
//         descripcion = ${descripcion},
//         tipo_accion = ${tipo_accion}
//     WHERE medalla_id = ${id}
//     RETURNING *;
//   `;
// };

// export const deleteMedalla = async (id) => {
//   return await sql`
//     DELETE FROM medalla
//     WHERE medalla_id = ${id}
//     RETURNING *;
//   `;
// };
