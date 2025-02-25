import {useState, useEffect} from 'react'

// get all products
export function GetProducts() {
  const [products, setProducts] = useState(null)
    useEffect(() => {
      fetch('http://localhost:1234/products')
      .then(res => res.json())
      .then(data => setProducts(data))
    }, [])

  return (products)
}

// get one product by id
export function GetProduct(id) {
  const [data, setData] = useState(null)
  useEffect(() => {
    fetch('http://localhost:1234/products?id=' + id)
      .then(res => res.json())
      .then(data => setData(data))
  }, [id])

  return (data)
}

export async function AddProduct(e) {
    e.preventDefault();

    const formData = new FormData();
    
    formData.append('name', document.getElementById('name').value);
    formData.append('img', document.getElementById('imgInp').files[0]);
    formData.append('description', document.getElementById('description').value);
    formData.append('price', document.getElementById('price').value);
    formData.append('stock', document.getElementById('stock').value);
    formData.append('filters', JSON.stringify({
      categories:[ 
        document.getElementById('cat_dym').checked ? 'dym' : null,
        document.getElementById('cat_deco').checked ? 'deco' : null,
        document.getElementById('cat_mascotas').checked ? 'mascotas' : null,
        
      ].filter(Boolean),
      materials: [
        document.getElementById('fil_ceramica').checked ? 'ceramica' : null,
        document.getElementById('fil_madera').checked ? 'madera' : null,
      ].filter(Boolean)
    }))
    

    fetch('http://localhost:1234/product', {
      method: 'POST',
      credentials: 'include',
      body: formData,
    }).then(() => document.getElementById("addProduct-form").reset())
}