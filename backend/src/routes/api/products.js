import { Router } from "express";
import { pool } from "../../config/db.js"; //* Database connection pool
import multer from 'multer'; //* For handling file uploads
import fs from 'fs'; //* For file system operations
import path from 'path'; //* For handling file paths
import { fileURLToPath } from 'url'; //* For converting file URLs to paths

export const productsRouter = Router();

//* Reconstruct __dirname for ES modules
const __filename = fileURLToPath(import.meta.url); // Get the file path of the current module
const __dirname = path.dirname(__filename); // Get the directory name of the current module

//* Multer configuration for file uploads
const storage = multer.memoryStorage(); // Store files in memory
const upload = multer({ storage: storage });

//! Ensure the images directory exists
const imagesDir = path.join(__dirname, './../../../public/images');
if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir, { recursive: true });
}

//* Get all products or a single product by ID
productsRouter.get('/products', async (req, res) => {
    try {
        const { id } = req.query;

        if (id) {
            //* Fetch a single product by ID
            const query = await pool.query(`SELECT * FROM "Products" WHERE id = $1`, [id]);
            const result = query.rows[0];
            if (!result) {
                return res.status(404).json({ message: 'Product not found' });
            }
            res.json(result);
        } else {
            //* Fetch all products
            const query = await pool.query(`SELECT * FROM "Products"`);
            res.json(query.rows);
        }
    } catch (err) {
        console.error('Error fetching products:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

//* Add a new product with an image
productsRouter.post('/product', upload.single('img'), async (req, res) => {
    try {
        const { name, description, price, stock, filters } = req.body;

        //* Validate required fields
        if (!name || !description || !price || !stock || !filters || !req.file) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        const jsonFilters = JSON.stringify(filters);

        //* Insert product into the database
        const query = await pool.query(
            `INSERT INTO "Products" ("name", "description", "price", "stock", "filters") VALUES ($1, $2, $3, $4, $5) RETURNING *`,
            [name, description, price, stock, jsonFilters]
        );
        const result = query.rows[0];

        //* Save the uploaded image
        const imgName = `${result.id}.jpg`; // Use product ID as the image name
        const imgPath = path.join(imagesDir, imgName);
        fs.writeFileSync(imgPath, req.file.buffer);

        res.status(201).json(result);
    } catch (err) {
        console.error('Error adding product:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

//* Get a product image by ID
productsRouter.get('/product/img', async (req, res) => {
    try {
        const { id } = req.query;

        if (!id) {
            return res.status(400).json({ message: 'Product ID is required' });
        }

        //* Fetch product details
        const query = await pool.query(`SELECT * FROM "Products" WHERE id = $1`, [id]);
        const result = query.rows[0];

        if (!result) {
            return res.status(404).json({ message: 'Product not found' });
        }

        //* Send the product image
        const imgName = `${result.img}.jpg`;
        const imgPath = path.join(imagesDir, imgName);

        if (!fs.existsSync(imgPath)) {
            return res.status(404).json({ message: 'Image not found' });
        }

        res.sendFile(imgPath);
    } catch (err) {
        console.error('Error fetching product image:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

//* Delete a product by ID
productsRouter.delete('/product', async (req, res) => {
    try {
        const { id } = req.query;

        if (!id) {
            return res.status(400).json({ message: 'Product ID is required' });
        }

        //* Fetch product image path
        const imgQuery = await pool.query(`SELECT img FROM "Products" WHERE id = $1`, [id]);
        const imgName = `${imgQuery.rows[0].img}.jpg`;
        const imgPath = path.join(imagesDir, imgName);

        //* Delete the product image
        if (fs.existsSync(imgPath)) {
            fs.unlinkSync(imgPath);
            console.log('Image deleted:', imgPath);
        }

        //* Delete the product from the database
        const query = await pool.query(`DELETE FROM "Products" WHERE id = $1 RETURNING *`, [id]);
        const result = query.rows[0];

        if (!result) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.json(result);
    } catch (err) {
        console.error('Error deleting product:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
});