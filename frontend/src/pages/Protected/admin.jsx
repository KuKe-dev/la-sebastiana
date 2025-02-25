import { useEffect, useState } from "react";
import './admin.css'

import { Loader } from "../../components/loader/loader";

import { AddProduct } from "../../scripts/products";
import { ProductVisualizer } from "../../components/productVisualizer/productVisualizer";
import { Products } from "../../components/productVisualizer/product/products";

export function Admin() {

// Check if user is logged
const [isLoggedIn, setIsLoggedIn] = useState(false);
useEffect(() => {
    fetch('http://localhost:1234/isLogged', {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            token: document.cookie
        })
    }).then(res => res.json()).then(login => {
        if (!login) {setTimeout(() =>window.location.href = "/login" , 800)}
    else {setTimeout(() => setIsLoggedIn(login), 800)}})
})

// Preview image
const [image, setImage] = useState(null);
const changeImgPrv = (event) => {
    const file = event.target.files[0];

    if (file) {
    setImage(URL.createObjectURL(file));
    }
};


// Rendering
if (!isLoggedIn) {
    return (
    <Loader />
)}

return (
    <>
        <h1 className="title">Admin</h1>
        <h2 className="subtitle">Agregar producto</h2>
        <section className="form">
            <form onSubmit={(e) => { AddProduct(e); window.location.reload(); }} method="POST" id="addProduct-form">
                <input type='text' id="name" placeholder='*Product name*' />
                <textarea id="description" rows={5} maxLength={250} placeholder='Description' />

                <input type='file' id="imgInp" onChange={changeImgPrv} />
                {image ? <img src={image} alt="Preview" width="40%" /> : <div style={{backgroundColor: "rgba(253, 224, 200, 0.397)",width: "40%",aspectRatio: "1/1", border: "1px solid black", display: "flex", justifyContent: "center", alignItems: "center"}}>No img</div>}

                <div className="price-stock">
                    <input type='number' id="price" min={0} placeholder='Price' />
                    <input type='number' id="stock" min={-1} placeholder='Stock' />
                </div>
                
                <h2>Filtros</h2>
                <aside style={{display: "inline-flex", flexDirection: "column"}}>
                    <h3>Categorias</h3>
                    <div>
                        <label>Desayunos y meriendas: </label>
                        <input type="checkbox" id="cat_dym" name="dym" />
                    </div>

                    <div>
                        <label>Deco: </label>
                        <input type="checkbox" id="cat_deco" name="deco" />
                    </div>

                    <div>
                        <label>Mascotas: </label>
                        <input type="checkbox" id="cat_mascotas" name="mascotas" />
                    </div>

                    <h3>Filtros</h3>
                    <div>
                        <label>Ceramica: </label>
                        <input type="checkbox" id="fil_ceramica" name="ceramica" />
                    </div>

                    <div>
                        <label>Madera: </label>
                        <input type="checkbox" id="fil_madera" name="madera" />
                    </div>
                </aside>

                <button id="addProduct-button" type="submit">Agregar producto</button>
            </form>
        </section>

        <h2>Visualizador de productos</h2>
        <ProductVisualizer />
    </>

)}