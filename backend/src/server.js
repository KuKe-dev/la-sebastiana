import app from './app.js'; //* Import the Express app
import { PORT } from './config/env.js'; //* Import the port from environment variables

//* Start the server
app.listen(PORT, () => {
    console.log(`Server is running at: http://localhost:${PORT}`);
});

//? Optional: Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
    console.error('Unhandled Rejection:', err);
    // Gracefully shut down the server
    server.close(() => {
        process.exit(1); // Exit with failure
    });
});

//? Optional: Handle uncaught exceptions
process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
    // Gracefully shut down the server
    server.close(() => {
        process.exit(1); // Exit with failure
    });
});