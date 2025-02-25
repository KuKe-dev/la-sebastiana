import { Router } from "express";
import { pool } from "../config.js";

import multer from 'multer'
import fs from 'fs'

export const productsRouter = Router()

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

upload.single('img')

// Get products
productsRouter.get('/products', async (req, res) => {
    const {
        id
    } = req.query

    if (id) {
        const query = await pool.query(`SELECT * FROM "Products" WHERE id= $1`, [id])
        const result = query.rows[0]
        res.send(result)
    }
    else {
        const query = await pool.query(`SELECT * FROM "Products"`)
        const result = query.rows
        res.send(result)
    }
    pool.end
})

// Add product
productsRouter.post('/product', upload.single('img'), async (req, res) => {
    const { name, description, price, stock, filters } = req.body

    const jsonFilters = JSON.stringify(filters)

    console.log(jsonFilters)

    const query = await pool.query(`INSERT INTO "Products" ("name", "description", "price", "stock", "filters") VALUES ($1, $2, $3, $4, $5) RETURNING *`, [ name, description, price, stock, jsonFilters ])
    const result = query.rows[0]
    const imgName = result.img + '.jpg'

    fs.writeFileSync(`./Public/Images/${imgName}`, req.file.buffer)
    res.send(result)
    pool.end
})

// Get product image
productsRouter.get('/product/img', async (req, res) => {
    const { id } = req.query
    const query = await pool.query(`SELECT * FROM "Products" WHERE id= $1`, [id])
    const result = query.rows[0]
    const imgName = result.img + '.jpg'
    const img = fs.readFileSync(`./Public/Images/${imgName}`)
    res.send(img)
    pool.end
})

// Delete product
productsRouter.delete('/product', async (req, res) => {
    const { id } = req.query

    const img = await pool.query(`SELECT img FROM "Products" WHERE id=$1`, [id])
    fs.unlink(`./Public/Images/${img.rows[0].img}.jpg`, () => {console.log('Image deleted')})

    const query = await pool.query(`DELETE FROM "Products" WHERE id= $1 RETURNING *`, [id])
    
    const result = query.rows[0]
    res.send(result)
    pool.end
})