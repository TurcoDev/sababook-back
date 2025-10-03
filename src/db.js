import 'dotenv/config'; 
import pgp from 'pg-promise';


const connectionOptions = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: parseInt(process.env.DB_PORT, 10)
}

const dbInit = pgp({});
const db = dbInit(connectionOptions);

async function testConnection() {
  try {
    await db.one('SELECT current_timestamp');
    console.log('Database connection successful');
  } catch (error) {
    console.error('Database connection failed:', error);
    console.error(`Message: ${error.message}`);
    process.exit(1);
  }
}

export { db, testConnection };

testConnection();