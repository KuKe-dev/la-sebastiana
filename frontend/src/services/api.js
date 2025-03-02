import { useState, useEffect } from 'react';

/**
 * Fetches all products from the server.
 * @returns {Array|null} The list of products or null if loading.
 */
export function GetProducts() {
  const [products, setProducts] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:1234/api/products');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  return products;
}

/**
 * Fetches a single product by ID from the server.
 * @param {string} id - The ID of the product to fetch.
 * @returns {Object|null} The product data or null if loading.
 */
export function GetProduct(id) {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:1234/api/products?id=${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch product');
        }
        const data = await response.json();
        setData(data);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [id]);

  return data;
}

/**
 * Adds a new product to the server.
 * @param {Event} e - The form submission event.
 * @returns {Promise<void>}
 */
export async function AddProduct(e) {
  try {
    e.preventDefault();
    
    const formData = new FormData();

    //* Append form data to the FormData object
    formData.append('name', document.getElementById('name').value);
    formData.append('img', document.getElementById('imgInp').files[0]);
    formData.append('description', document.getElementById('description').value);
    formData.append('price', document.getElementById('price').value);
    formData.append('stock', document.getElementById('stock').value);
    formData.append(
      'filters',
      JSON.stringify({
        categories: [
          document.getElementById('cat_dym').checked ? 'dym' : null,
          document.getElementById('cat_deco').checked ? 'deco' : null,
          document.getElementById('cat_mascotas').checked ? 'mascotas' : null,
        ].filter(Boolean),
        materials: [
          document.getElementById('fil_ceramica').checked ? 'ceramica' : null,
          document.getElementById('fil_madera').checked ? 'madera' : null,
        ].filter(Boolean),
      })
    );

    //* Send the form data to the server
    const response = await fetch('http://localhost:1234/api/product', {
      method: 'POST',
      credentials: 'include',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Failed to add product');
    }

    //* Reset the form on success
    document.getElementById('addProduct-form').reset();
  } catch (error) {
    console.error('Error adding product:', error);
    alert('Failed to add product. Please try again.');
  }
}

/**
 * Deletes a product from the server.
 * @param {string} id - The ID of the product to delete.
 * @returns {Promise<void>} 
 */
export async function DeleteProduct(id) {
  try {
      const response = await fetch(`http://localhost:1234/api/product?id=${id}`, {
      method: 'DELETE',
      });

  if (!response.ok) {
      throw new Error('Failed to delete product');
  }

  window.location.reload(); // Reload the page to reflect changes
  } catch (error) {
      console.error('Error deleting product:', error);
      alert('Failed to delete product. Please try again.');
  }
};