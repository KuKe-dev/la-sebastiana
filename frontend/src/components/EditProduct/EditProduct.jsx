import { useState, useEffect } from "react";
import { useGetProduct, UpdateProduct } from "../../services/api.js";

export function EditProduct({ id }) {
    const { data: product, loading, error } = useGetProduct(id);

    const [image, setImage] = useState(null);
    

    // Handle image preview
    const changeImgPrv = (event) => {
        const file = event.target.files[0];
        if (file) {
            setImage(URL.createObjectURL(file));
        }
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        UpdateProduct(product.id, e);
    };



    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    if (!product) {
        return <div>Product not found</div>;
    }
    return (
        <section className="edit-form" style={{position: "absolute"}}>
            <form onSubmit={e => UpdateProduct(product.id, e)} method="PUT" id="editProduct-form">
                <input
                    type="text"
                    id="name"
                    defaultValue={product.name}
                    value={product.name}
                    placeholder="*Product name*"
                />
                <textarea
                    id="description"
                    defaultValue={product.description}
                    rows={5}
                    maxLength={250}
                    placeholder="Description"
                />

                {/* {image ? (
                    <img className="imgPrv" src={image} alt="Preview" width="40%" />
                ) : (
                    <div className="imgPrv">No img</div>
                )}
                <input type="file" id="imgInp" onChange={changeImgPrv} /> */}

                <div className="price-stock">
                    <input
                        type="number"
                        id="price"
                        defaultValue={product.price}
                        min={0}
                        placeholder="*Price*"
                    />
                    <input
                        type="number"
                        id="stock"
                        defaultValue={product.stock}
                        min={-1}
                        placeholder="*Stock*"
                    />
                </div>

                <h2>Filtros</h2>
                <div style={{ display: "inline-flex", flexDirection: "column" }}>
                    <h3>Categorias</h3>
                    <div>
                        <label>Desayunos y meriendas: </label>
                        <input
                            type="checkbox"
                            id="cat_dym"
                            name="dym"
                            defaultChecked={product.filters.categories.includes("dym")}
                        />
                    </div>

                    <div>
                        <label>Deco: </label>
                        <input
                            type="checkbox"
                            id="cat_deco"
                            name="deco"
                            defaultChecked={ product.filters.categories.includes("deco")}
                        />
                    </div>

                    <div>
                        <label>Mascotas: </label>
                        <input
                            type="checkbox"
                            id="cat_mascotas"
                            name="mascotas"
                            defaultChecked={product.filters.categories.includes("mascotas")}
                        />
                    </div>

                    <h3>Filtros</h3>
                    <div>
                        <label>Ceramica: </label>
                        <input
                            type="checkbox"
                            id="fil_ceramica"
                            name="ceramica"
                            defaultChecked={product.filters.materials.includes("ceramica")}
                        />
                    </div>

                    <div>
                        <label>Madera: </label>
                        <input
                            type="checkbox"
                            id="fil_madera"
                            name="madera"
                            defaultChecked={product.filters.materials.includes("madera")}
                        />
                    </div>
                </div>

                <button id="editProduct-button" type="submit">
                    Actualizar producto
                </button>
            </form>
        </section>
    );
}