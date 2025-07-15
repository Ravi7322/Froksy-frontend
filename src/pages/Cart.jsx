import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../redux/redux";
import { NavLink } from "react-router-dom";

const Cart = () => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);
  const totalPrice = useSelector((state) => state.cart.totalPrice);

  if (!items || items.length === 0) {
    return <h3 className="text-center mt-4">Your cart is empty 🛒</h3>;
  }

  return (
    <div className="container my-2">
      {items.map((item) => (
        <div className="card mb-3" key={item.id}>
          <div className="row g-0 align-items-center">
            {/* ✅ Hardcoded Image */}
            <div className="col-md-3">
              <img
                src="./images/colo1.jpg"
                className="img-fluid rounded-start"
                alt="Item"
                style={{
                  width: "25%",
                  height: "25%",
                  objectFit: "cover",
                  padding: "10px",
                }}
              />
            </div>

            {/* Text and buttons */}
            <div className="col-md-9">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h5 className="card-title mb-1">{item.name}</h5>
                    <p className="card-text mb-0">₹{item.price}</p>
                  </div>
                  <div className="d-flex align-items-center gap-2">
                    <button
                      className="btn btn-outline-secondary"
                      onClick={() => dispatch(removeFromCart(item.id))}
                    >
                      −
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      className="btn btn-outline-primary"
                      onClick={() => dispatch(addToCart(item))}
                    >
                      ＋
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Total Price */}
      <div className="text-end fw-bold fs-5 mt-3">Total: ₹{totalPrice}</div>
      <NavLink to="/payment" className="btn btn-success">
        Go to Payment
      </NavLink>
    </div>
  );
};

export default Cart;
