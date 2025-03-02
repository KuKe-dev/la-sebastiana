import express from 'express';
import { corsConfig } from './middleware/cors.js'; //* CORS configuration
import cookieParser from 'cookie-parser';
import { productsRouter } from './routes/api/products.js'; //* API routes for products
import { loginRouter } from './routes/auth/login.js'; //* Authentication routes

const app = express();

//* Middleware setup
app.use(corsConfig); // Enable CORS
app.use(express.json()); // Parse JSON request bodies
app.use(cookieParser()); // Parse cookies

//* Route handlers
app.use('/api', productsRouter); // Mount products routes under /api
app.use('/auth', loginRouter); // Mount authentication routes under /auth

//! Root route for health check
app.get('/', (req, res) => {
    res.send('<h1>Server is running</h1>');
});

//? Optional: Global error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack); // Log the error stack trace
    res.status(500).json({ message: 'Something went wrong!' }); // Send a generic error response
});

export default app; //* Export the app for use in server.js