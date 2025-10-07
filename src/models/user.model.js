// src/models/user.model.js
import sql from '../db/connect/connectDB.js';

export const getAllUsers = async () => {
  try {
    const result = await sql`SELECT * FROM usuario`;
    return result;
  } catch (error) {
    console.error("Error obteniendo usuarios:", error);
    throw error;
  }
};
