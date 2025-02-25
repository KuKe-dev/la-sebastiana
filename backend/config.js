import pg from 'pg'
import dotenv from 'dotenv'

dotenv.config() // Postgresql pool connection
export const pool = new pg.Pool({
    database: process.env.PG_DATABASE,
    port: process.env.PG_PORT,
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD
})

import cors from 'cors' // Cors config
export const corsConfig = cors({
    origin: 'http://localhost:5173',
    credentials: true,
})

export const PORT = process.env.PORT ?? 1234 // Port config

export const SECRETE_KEY = process.env.SECRETE_KEY