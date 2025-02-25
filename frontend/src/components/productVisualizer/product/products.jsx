import { useEffect, useState } from "react";
import { GetProducts } from "../../../scripts/products";
import './products.css'

// eslint-disable-next-line react/prop-types
export function Products({ categories = [], materials = [] }) {

const products = GetProducts()

const [vizFilters, setVizFilters] = useState({
    categories: categories,
    materials: materials,
})

const [filteredProducts, setFilteredProducts] = useState([])

useEffect(() => {
    setVizFilters({
        categories: categories,
        materials: materials,
    });
}, [categories, materials]);

useEffect(() => {
    async function filterProducts() {
        if (!products) return;
        
        const filtered = await Promise.all(products.map(async (product) => {

            const productFilters = JSON.parse(await product.filters);

            const categoryMatch =
                vizFilters.categories.length === 0 || vizFilters.categories.some((cat) => productFilters.categories.includes(cat));

            console.log("Category Match:", categoryMatch);

            const materialMatch =
                vizFilters.materials.length === 0 || vizFilters.materials.some((mat) => productFilters.materials.includes(mat));

            console.log("Material Match:", materialMatch);

            const match = categoryMatch && materialMatch;
            console.log("Match:", match);

            return match ? product : null;
        }));

        setFilteredProducts(filtered.filter(Boolean)); // Remove null values
    }

    filterProducts();
}, [products, vizFilters]);

const handleFilterChange = (type, value) => {
    setVizFilters((prevFilters) => {
        const updatedFilters = { ...prevFilters };

        if (updatedFilters[type].includes(value)) {
            updatedFilters[type] = updatedFilters[type].filter((item) => item !== value);
        } else {
            updatedFilters[type] = [...updatedFilters[type], value];
        }

        return updatedFilters;
    });
};

return (
    <>
    <main className="products">
        {filteredProducts && filteredProducts.map(product => (
                <article key={product.id} className="product">
                    <h2 className="product-name">{product.name}</h2>
                    {product.img && (<img className="product-img" src={`http://localhost:1234/product/img?id=${product.id}`} width={'20%'}
                    style={{aspectRatio: "1/1", objectFit: "cover"}}/>)}
                    <p className="product-description">{product.description}</p>
                    <p className="product-price">${product.price}</p>
                    <p className="product-stock">Stock: {product.stock}</p>
                    <p className="product-filters">Filters: {product.filters}</p>
                    <button className="edit-button">Editar</button>
                    <button className="delete-button" onClick={() => {
                        fetch(`http://localhost:1234/product?id=${product.id}`,
                        {method: 'DELETE'})
                        .then(() => window.location.reload())}}>Eliminar</button>
                </article>   
        ))}
    </main>
    </>
)}