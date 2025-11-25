import 'dotenv/config'; 
import pg from 'pg';

const { Pool } = pg;
const connectionString = process.env.NEON_DATABASE_URL;

export const pool = new Pool({
    connectionString: connectionString,
    ssl: {
        rejectUnauthorized: false
    }
});
console.log("Cliente de PostgreSQL Neon DB inicializado.");