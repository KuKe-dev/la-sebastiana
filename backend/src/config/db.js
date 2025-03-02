import pg from 'pg';
import dotenv from 'dotenv';

//* Load environment variables from .env file
dotenv.config();

//! Ensure required environment variables are present
if (!process.env.PG_DATABASE || !process.env.PG_PORT || !process.env.PG_USER || !process.env.PG_PASSWORD) {
    throw new Error('Missing required PostgreSQL environment variables');
}

//* PostgreSQL connection pool configuration
export const pool = new pg.Pool({
    database: process.env.PG_DATABASE, // Database name
    port: process.env.PG_PORT,         // Database port
    user: process.env.PG_USER,         // Database user
    password: process.env.PG_PASSWORD, // Database password
    
    //? Consider adding additional options for production:
    // max: 20,                         // Maximum number of clients in the pool
    // idleTimeoutMillis: 30000,        // How long a client is allowed to remain idle
    // connectionTimeoutMillis: 2000,   // How long to wait for a connection
});

//* Log connection status for debugging
pool.on('connect', () => {
    console.log('Connected to PostgreSQL database');
});

//! Handle connection errors
pool.on('error', (err) => {
    console.error('Unexpected error on idle client', err);
    process.exit(-1); // Exit the process on critical errors
});