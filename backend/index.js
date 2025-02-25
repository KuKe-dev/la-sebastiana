import { pool, PORT, corsConfig } from './config.js'
import cookieParser from 'cookie-parser'

import express from 'express'
const app = express()

app.use(corsConfig)
app.use(express.json())
app.use(cookieParser())

import { productsRouter } from './routes/products.js'
app.use('/', productsRouter)

import { loginRouter } from './routes/login.js'
app.use('/', loginRouter)

app.get('/', (req, res) => {
    res.send('<h1>Server is running</h1>')
})

app.listen(PORT, () => {
    console.log(`Server is runnign at: http://localhost:${PORT}`)
})