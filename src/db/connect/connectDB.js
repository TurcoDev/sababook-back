import postgres from 'postgres';
import dotenv from 'dotenv';

dotenv.config();

// Usar el DATABASE_URL de Supabase
const connectionString = process.env.DATABASE_URL;
console.log("Using connection string:", connectionString);

// Crear la conexión usando el connection string
const sql = postgres(connectionString);

// Función para inicializar la conexión
export const initDB = async () => {
  try {
    // Probar la conexión
    await sql`SELECT 1`;
    console.log('Conexión a Supabase PostgreSQL establecida correctamente');
    return sql;
  } catch (error) {
    console.error('Error al conectar con Supabase PostgreSQL:', error);
    throw error;
  }
};

// Función para cerrar la conexión
export const closeDB = async () => {
  await sql.end();
};

export default sql;