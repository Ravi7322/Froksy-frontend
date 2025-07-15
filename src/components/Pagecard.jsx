import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../redux/redux';

const Pagecard = ({ product, searchText }) => {
  const dispatch = useDispatch();

  const quantity = useSelector(state =>
    state.cart.items.find(i => i.id === product.id)?.quantity || 0
  );

  const handleAdd = () => {
    dispatch(addToCart({ id: product.id, name: product.name, price: product.price }));
  };

  const handleRemove = () => {
    dispatch(removeFromCart(product.id));
  };

  const highlightText = (text, searchText) => {
    if (!searchText) return text;
    const regex = new RegExp(`(${searchText})`, "gi");
    const parts = text.split(regex);
    return parts.map((part, i) =>
      part.toLowerCase() === searchText.toLowerCase() ? (
        <mark key={i}>{part}</mark>
      ) : (
        part
      )
    );
  };

  return (
    <div className='card1'>
      <div className="card" style={{ width: "18rem" }}>
        <Link to={`/dish/${product.id}`}>
          <img src='./images/colo1.jpg' className="card-img-top" alt="..." style={{ height: "50%" }} />
          <div className="card-body">
            <h5 className='card-title'>{highlightText(product.name, searchText)}</h5>
            <p className="card-text">Price: ₹{product.price}</p>
          </div>
        </Link>

        {/* Center the cart buttons */}
        <div className="d-flex justify-content-center pb-3">
          {quantity === 0 ? (
            <button
              className="btn btn-primary"
              onClick={handleAdd}
              style={{ padding: '0.5rem 1.2rem' }}
            >
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
    </div>
  );
};

export default Pagecard;
