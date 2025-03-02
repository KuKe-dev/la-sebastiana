import cors from 'cors';
import { CLIENT_ORIGIN } from '../config/env.js'; // Import the CLIENT_ORIGIN from env variables

//* CORS configuration
export const corsConfig = cors({
    origin: CLIENT_ORIGIN, // Allow requests from this origin
    credentials: true, // Allow cookies and credentials to be sent
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allowed request headers
});