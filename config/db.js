// config/db.js
import mysql from 'mysql2/promise';

const db = mysql.createPool({
    host: 'localhost',       // Cambia si tu host es diferente
    user: 'tu_usuario',      // Tu usuario de MySQL
    password: 'tu_contraseña', // Tu contraseña de MySQL
    database: 'sababook',    // Nombre de la base de datos
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

export default db;
