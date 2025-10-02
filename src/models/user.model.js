import sql from "../db/connect/connectDB.js";

export const getAllUsers = async () => {
  try {
    // Usar directamente la instancia sql importada con template literals
    const results = await sql`SELECT * FROM usuario`;
    return results;
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    throw error;
  }
};