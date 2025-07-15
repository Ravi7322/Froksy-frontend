import React, { useState, useEffect } from 'react';
import './dish.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart,removeFromCart } from '../redux/redux';

const Dish = () => {
  const [product, setProduct] = useState(null);
  const { id } = useParams();
  const dispatch = useDispatch();

  // Check current quantity in Redux cart
  
  const quantity = useSelector(state =>
  state.cart.items.find(i => i.id === parseInt(id))?.quantity || 0
);


  const handleAdd = () => {
    dispatch(addToCart({ id: product.id, name: product.name, price: product.price }));
    
  };

  const handleRemove = () => {
    dispatch(removeFromCart(product.id));
  };

  useEffect(() => {
    async function fetchProductDetails() {
      try {
        const res = await axios.get('https://dummyjson.com/c/bbdf-897f-4e4c-9a07');
        const allProducts = res.data.products;
        const matched = allProducts.find((item) => item.id === parseInt(id));
        setProduct(matched);
      } catch (err) {
        console.error("Error fetching product:", err);
      }
    }

    fetchProductDetails();
  }, [id]);

  if (!product) return <h3>Loading...</h3>;

  return (
    <div className='page d-flex flex-wrap'>
      <div className='imginfo'>
        <img src='./images/colo1.jpg' alt={product.name} style={{ width: '60%' }} />
      </div>
      <div className='proinfo'>
        <h2>{product.name}</h2>
        <h4>₹{product.price}</h4>
         {quantity === 0 ? (
            <button className="btn btn-primary" onClick={handleAdd}>
              Add to Cart
            </button>
          ) : (
            <div className="d-flex align-items-center gap-2">
              <button className="btn btn-outline-secondary" onClick={handleRemove}>−</button>
              <span>{quantity}</span>
              <button className="btn btn-outline-primary" onClick={handleAdd}>＋</button>
            </div>
          )}
      </div>
    </div>
  );
};

export default Dish;
