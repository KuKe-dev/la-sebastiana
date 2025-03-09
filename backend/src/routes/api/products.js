import { Router } from "express";
import { pool } from "../../config/db.js"; //* Database connection pool
import multer from 'multer'; //* For handling file uploads
import fs from 'fs'; //* For file system operations
import path from 'path'; //* For handling file paths
import { fileURLToPath } from 'url'; //* For converting file URLs to paths

//* Router
export const productsRouter = Router();

//* Stuff needed
//*------------------------------------------------------------------------

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


//* Endpoints
//*------------------------------------------------------------------------

//* Api menu
productsRouter.get('/', async (req, res) => {
    res.send('<ul><li><a href="/api/products">All Products</a></li><li><a href="/api/product/:id">Single Product</a></li></ul>');
});

//* Get all products
productsRouter.get('/products', async (req, res) => {
    try {
        const query = await pool.query(`SELECT * FROM "Products"`);
        res.json(query.rows);
    } catch (err) {
        console.error('Error fetching products:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

//* Get a single product by ID
productsRouter.get('/product/:id', async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: 'Product ID is required' });
        }

        const query = await pool.query(`SELECT * FROM "Products" WHERE id = $1`, [id]);
        const result = query.rows[0];

        if (!result) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.json(result);
    } catch (err) {
        console.error('Error fetching product:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

//* Add a new product
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

//* Update a product by ID
productsRouter.put('/product/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, price, stock, filters } = req.body;

        if (!id || !name || !description || !price || !stock || !filters) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        const jsonFilters = JSON.stringify(filters);
        console.log(jsonFilters);
        const query = await pool.query(
            `UPDATE "Products" SET "name" = $1, "description" = $2, "price" = $3, "stock" = $4, "filters" = $5 WHERE "id" = $6 RETURNING *`,
            [name, description, price, stock, jsonFilters, id]
        );
        const result = query.rows[0];

        res.json(result);
    } catch (err) {
        console.error('Error updating product:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

//* Delete a product by ID
productsRouter.delete('/product/:id', async (req, res) => {
    try {
        const { id } = req.params;

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

//* Get a product image by ID
productsRouter.get('/product/:id/img', async (req, res) => {
    try {
        const { id } = req.params;

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