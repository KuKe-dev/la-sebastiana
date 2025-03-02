import dotenv from 'dotenv';

//* Load environment variables from .env file
dotenv.config();

//! List of required environment variables
const requiredEnvVars = [
    'PG_DATABASE', // Database name
    'PG_PORT',     // Database port
    'PG_USER',     // Database user
    'PG_PASSWORD', // Database password
    'SECRET_KEY',  // Secret key for authentication (e.g., JWT)
];

//* Validate that all required environment variables are present
requiredEnvVars.forEach((envVar) => {
    if (!process.env[envVar]) {
        throw new Error(`Missing required environment variable: ${envVar}`);
    }
});

//* Export environment variables with defaults (if applicable)
export const PORT = process.env.PORT ?? 1234; // Default port: 1234
export const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN ?? 'http://localhost:5173';
export const SECRET_KEY = process.env.SECRET_KEY;