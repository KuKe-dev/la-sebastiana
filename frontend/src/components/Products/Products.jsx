import { useEffect, useState } from "react";
import { GetAllProducts, DeleteProduct } from "../../services/api";
import { EditProduct } from "../EditProduct/EditProduct.jsx";
import './Products.css';

/**
 * Products Component
 * Displays a list of products filtered by categories and materials.
 * @param {Object} props - Component props.
 * @param {Array} props.categories - List of selected categories.
 * @param {Array} props.materials - List of selected materials.
 * @returns {JSX.Element} The Products component.
 */

// eslint-disable-next-line react/prop-types
export function Products({ categories = [], materials = [] }) {

const products = GetAllProducts(); // Fetch all products

    //* State for filters
const [vizFilters, setVizFilters] = useState({
    categories: categories,
    materials: materials,
});

    //* State for filtered products
const [filteredProducts, setFilteredProducts] = useState([]);

  //* Update filters when categories or materials change
useEffect(() => {
    setVizFilters({
        categories: categories,
        materials: materials,
    });
}, [categories, materials]);

    //* Filter products based on selected filters
useEffect(() => {
    const filterProducts = async () => {
        if (!products) return;
        const filtered = products.filter((product) => {

            const productFilters = JSON.parse(product.filters);

            //* Check if product matches selected categories
            const categoryMatch =
                vizFilters.categories.length === 0 ||
                vizFilters.categories.some((cat) => productFilters.categories.includes(cat));

            //* Check if product matches selected materials
            const materialMatch =
                vizFilters.materials.length === 0 ||
                vizFilters.materials.some((mat) => productFilters.materials.includes(mat));

            //* Return product if it matches both filters
            return categoryMatch && materialMatch;
        });

        setFilteredProducts(filtered);
    };

    filterProducts();
}, [products, vizFilters]);

return (
    <main className="products">
        {filteredProducts.map((product) => (
            <>
            <section id="EditProduct" style={{ display: 'none' }}>
            <EditProduct id={product.id}/>
            </section>
            <article key={product.id} className="product">
                <h2 className="product-name">{product.name}</h2>
                {product.img && (
                    <img
                    className="product-img"
                    src={`http://localhost:1234/api/product/${product.id}/img`}
                    width="20%"
                    style={{ aspectRatio: "1/1", objectFit: "cover" }}
                    alt={product.name} //* Add alt text for accessibility
                    />
                )}
                <p className="product-description">{product.description}</p>
                <p className="product-price">${product.price}</p>
                <p className="product-stock">Stock: {product.stock}</p>
                <p className="product-filters">Categories: {JSON.parse(product.filters).categories.join(', ')}</p>
                <p className="product-filters">Materials: {JSON.parse(product.filters).materials.join(', ')}</p>
                <button 
                    className="edit-button"
                    onClick={() => {
                        document.getElementById('EditProduct').style.display = 'block';
                    }}
                >
                Editar</button>
                <button
                    className="delete-button"
                    onClick={() => { DeleteProduct(product.id) }}
                >
                    Eliminar
                </button>
            </article>
            </>
        ))}
    </main>
);
}