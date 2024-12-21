// Product.jsx
import React, { useState, useEffect } from 'react';
import { useProduct } from './useProduct';

function Product() {
  const { products, status, error, fetchProducts, incrementStock, decrementStock } = useProduct();
  const [adjustValues, setAdjustValues] = useState({});

  useEffect(() => {
    fetchProducts();
  }, []);


  const handleInputChange = (productId, value) => {
    setAdjustValues((prev) => ({
      ...prev,
      [productId]: value,
    }));
  };


  const getInputValue = (productId) => {
    return adjustValues[productId] || '';
  };

  return (
    <>
      <h1>Products</h1>
      
        {products.map((product) => (
          <div key={product.id}>
            <h2>{product.name}</h2>
            <p>quantity: {product.quantity}</p>
            <input
              type="number"
              value={getInputValue(product.id)}
              onChange={(e) => handleInputChange(product.id, parseInt(e.target.value) || 0)}
              placeholder="Enter stock amount"
            />
            <button onClick={() => incrementStock({ id: product.id, value: adjustValues[product.id]})}>
              Increase
            </button>
            <button onClick={() => decrementStock({ id: product.id, value: adjustValues[product.id] })}>
              Decrease Stock
            </button>
          </div>
        ))}
      
    </>
  );
}

export default Product;

