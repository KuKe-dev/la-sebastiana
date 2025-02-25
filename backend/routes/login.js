import { Router } from "express";
import { pool, SECRETE_KEY } from "../config.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import cookieParser from "cookie-parser";

export const loginRouter = Router()

loginRouter.use(cookieParser())

// Login
loginRouter.post('/login', async (req, res) => {

    // Get username and password
    const { username, password } = req.body

    // Get column user from database
    const user = await pool.query(`SELECT * FROM "Validation" WHERE use= $1`, [username])

    // Check if user exists
    if (user.rows.length !== 0) {

        // Check if password is correct
        if ( await bcrypt.compare(password, user.rows[0].pass) ) {

            //Create cookie's token
            const token = jwt.sign(
                {   
                    id: user.rows[0].id,
                    username: user.rows[0].use,
                    password: user.rows[0].pass },
                SECRETE_KEY,
                { expiresIn: '24h' }
            )

            //Send cookie
            res.cookie('access_token', token, {httpOnly: true,sameSite: "lax",maxAge: 86400000}).send("Login successful")
        }
        else {
            Error()
        }
    }
    else {
        Error()
    }
    function Error(){
        return (res.status(401).send("Incorrect username or password"), console.error('Incorrect user or password'))
    }
})

// Endpoint to check if user is logged
loginRouter.post('/isLogged', (req, res) => {
    try {
        const token = req.cookies.access_token
        const validToken = jwt.verify(token, SECRETE_KEY)
        res.status(200).send(true)
    } catch (error) {
        res.status(401).send(false)
    }

})