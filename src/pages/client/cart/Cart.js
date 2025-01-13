import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './Cart.module.scss'; 
import { Link } from 'react-router-dom';

function Cart() {
  const [products, setProducts] = useState([]); 
  const [selectedProduct, setSelectedProduct] = useState(null);  
  const [product, setProduct] = useState({
    name: '',
    category: '',
    price: '',
    quantity: '',
  });

  // Fetch products when the component is mounted
  useEffect(() => {
    fetch('http://localhost:8080/api/products')
      .then(response => response.json())
      .then(data => {
        setProducts(data);
      })
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  // Set the selected product to edit
  const selectProduct = (selected) => {
    setSelectedProduct(selected);
    setProduct(selected);  
  };

  // Handle form input changes
  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });  
  };

  // Submit form for creating or updating a product
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (selectedProduct) {
        // Update the selected product
        await axios.put(`http://localhost:8080/api/products/${selectedProduct.id}`, product);
      } else {
        // Create a new product
        await axios.post('http://localhost:8080/api/products', product);
      }
      fetchProducts();  
      clearForm();  
    } catch (error) {
      console.error('Error saving product:', error);
    }
  };

  // Fetch products again after creating/updating
  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  // Clear form and reset selected product
  const clearForm = () => {
    setProduct({ name: '', category: '', price: '', quantity: '' });
    setSelectedProduct(null);
  };

  // Delete product by ID
  const deleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/products/${id}`);
      fetchProducts();  
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <div className={styles.cartContainer}>
      <h2>Product Management</h2>
      <button Link to="/">home</button>

      {/* Form for adding or editing a product */}
      <form onSubmit={handleSubmit} className={styles.productForm}>
        <h3>{selectedProduct ? 'Edit Product' : 'Add New Product'}</h3>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Category:</label>
          <input
            type="text"
            name="category"
            value={product.category}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Price:</label>
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Quantity:</label>
          <input
            type="number"
            name="quantity"
            value={product.quantity}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">{selectedProduct ? 'Update' : 'Add'}</button>
        {selectedProduct && <button type="button" onClick={clearForm}>Cancel</button>}
      </form>

      {/* Product list with edit and delete options */}
      <h3>Product List</h3>
      <ul className={styles.productList}>
        {products.map((prod) => (
          <li key={prod.id}>
            {prod.name} - ${prod.price}
            <button onClick={() => selectProduct(prod)}>Edit</button>
            <button onClick={() => deleteProduct(prod.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Cart;
