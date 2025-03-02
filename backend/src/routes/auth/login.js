import { Router } from "express";
import { pool } from "../../config/db.js"; //* Database connection pool
import { SECRET_KEY } from "../../config/env.js"; //* Secret key for JWT
import bcrypt from 'bcryptjs'; //* For password hashing and comparison
import jwt from 'jsonwebtoken'; //* For creating and verifying JWTs
import cookieParser from "cookie-parser"; //* For parsing cookies

export const loginRouter = Router();

loginRouter.use(cookieParser()); //* Enable cookie parsing

//* Login endpoint
loginRouter.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        //* Validate required fields
        if (!username || !password) {
            return res.status(400).json({ message: 'Username and password are required' });
        }

        //* Fetch user from the database
        const user = await pool.query(`SELECT * FROM "Validation" WHERE use = $1`, [username]);

        //* Check if user exists
        if (user.rows.length === 0) {
            return res.status(401).json({ message: 'Incorrect username or password' });
        }

        //* Compare provided password with hashed password
        const isPasswordValid = await bcrypt.compare(password, user.rows[0].pass);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Incorrect username or password' });
        }

        //* Create JWT token
        const token = jwt.sign(
            {
                id: user.rows[0].id,
                username: user.rows[0].use,
            },
            SECRET_KEY,
            { expiresIn: '24h' } // Token expires in 24 hours
        );

        //* Set cookie with the token
        res.cookie('access_token', token, {
            httpOnly: true, // Prevent client-side JavaScript from accessing the cookie
            sameSite: 'lax', // Prevent CSRF attacks
            maxAge: 86400000, // Cookie expires in 24 hours (in milliseconds)
        }).status(200).json({ message: 'Login successful' });
    } catch (err) {
        console.error('Error during login:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

//* Endpoint to check if user is logged in
loginRouter.post('/isLogged', (req, res) => {
    try {
        const token = req.cookies.access_token;

        //* Verify the token
        jwt.verify(token, SECRET_KEY);
        res.status(200).json( true );
    } catch (err) {
        //* Token is invalid or expired
        res.status(401).json( false );
    }
});