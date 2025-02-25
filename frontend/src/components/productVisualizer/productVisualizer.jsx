import { useEffect, useState } from "react";
import { GetProducts } from "../../scripts/products";
import { Products } from "./product/products";
import './productVisualizer.css'

// eslint-disable-next-line react/prop-types
export function ProductVisualizer({ categories = [], materials = [] }) {

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

// Function to handle filter changes
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

const categoryLabels = {
    dym: "Desayunos y meriendas",
    deco: "Decoración",
    mascotas: "Mascotas"
};
const materialLabels = {
    ceramica: "Ceramica",
    madera: "Madera"
};


return (
    <>
    <section className="products-container">
        <nav className="filters">
            <h3 className="filter-title">Filter Products</h3>
            <div className="filter-group">
                <strong className="filter-label">Categories:</strong>
                {["dym", "deco", "mascotas"].map((category) => (
                    <div key={category} className="filter-option">
                        <input
                            type="checkbox"
                            value={category}
                            checked={vizFilters.categories.includes(category)}
                            onChange={() => handleFilterChange("categories", category)}
                        />
                        {categoryLabels[category] || category}
                    </div>
                ))}
            </div>

            <div className="filter-group">
                <strong className="filter-label">Materials:</strong>
                {["ceramica", "madera"].map((material) => (
                    <div key={material} className="filter-option">
                        <input
                            type="checkbox"
                            value={material}
                            checked={vizFilters.materials.includes(material)}
                            onChange={() => handleFilterChange("materials", material)}
                        />
                        {materialLabels[material] || material}
                    </div>
                ))}
            </div>
        </nav>
        <main className="products">
            <Products categories={vizFilters.categories} materials={vizFilters.materials} />
        </main>
    </section>
    </>
)}