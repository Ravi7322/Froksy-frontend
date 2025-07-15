import React, { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { resetCart } from "../redux/redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from 'react-toastify';

const PaymentPage = () => {
  const items = useSelector((state) => state.cart.items);
  const totalPrice = useSelector((state) => state.cart.totalPrice);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [orderId] = useState(`ORD${Date.now()}`);

  const [form, setForm] = useState({
    fullname: "",
    number: "",
    address: "",
    city: "",
    zip: ""
  });

  const [paymentMethod, setPaymentMethod] = useState("");
  const [countdown, setCountdown] = useState(120);
  const countdownRef = useRef(null);
  const formRef = useRef();

  const showQRModal = () => {
    const modal = new window.bootstrap.Modal(document.getElementById("qrModal"));
    modal.show();
    setCountdown(120);

    // Clear previous interval
    clearInterval(countdownRef.current);

    countdownRef.current = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(countdownRef.current);
          modal.hide();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const submitOrder = async () => {
    await axios.post(`${process.env.REACT_APP_API_URL}/details`, {
      orderId,
      fullname: form.fullname,
      number: form.number,
      address: `${form.address}, ${form.city}, ${form.zip}`,
    });

    await axios.post(`${process.env.REACT_APP_API_URL}/order`, {
      orderId,
      number: form.number,
      items,
    });
  };

  const handledone = async (e) => {
  e.preventDefault();
  try {
    await submitOrder();
    toast.success(" Order and payment confirmed!");
    dispatch(resetCart());

    const modal = window.bootstrap.Modal.getInstance(document.getElementById("qrModal"));
    modal?.hide();

    navigate("/placed"); // ✅ Redirect here
  } catch (err) {
    console.error("❌ Order failed:", err);
    alert("❌ Something went wrong.");
  }
};


  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    if (!formRef.current.checkValidity()) {
      formRef.current.reportValidity();
      return;
    }

    if (!paymentMethod) {
      alert("⚠️ Select a payment method.");
      return;
    }

    if (paymentMethod === "QR/UPI") {
      showQRModal();
      return;
    }

    try {
      await submitOrder();
      toast.success(" Order and payment confirmed!");
      dispatch(resetCart());
      navigate("/placed");
    } catch (err) {
      console.error(err);
      alert("❌ Failed to place order. Try again.");
    }
  };

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="container my-4">
      <h2 className="mb-4">Checkout & Payment</h2>

      <div className="card mb-4 p-3">
        <h5>Order Summary</h5>
        {items.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <ul className="list-group">
            {items.map((item) => (
              <li key={item.id} className="list-group-item d-flex justify-content-between">
                <span>{item.name} x {item.quantity}</span>
                <span>₹{item.price * item.quantity}</span>
              </li>
            ))}
            <li className="list-group-item d-flex justify-content-between fw-bold">
              <span>Total:</span>
              <span>₹{totalPrice.toFixed(2)}</span>
            </li>
          </ul>
        )}
      </div>

      <form ref={formRef} onSubmit={handlePlaceOrder}>
        <div className="card mb-4 p-3">
          <h5>Billing Information</h5>
          <div className="row g-3">
            <div className="col-md-6">
              <input type="text" name="fullname" className="form-control" placeholder="Full Name" required onChange={handleInputChange} />
            </div>
            <div className="col-md-6">
              <input type="tel" name="number" className="form-control" placeholder="Mobile Number" required onChange={handleInputChange} />
            </div>
            <div className="col-12">
              <input type="text" name="address" className="form-control" placeholder="Address" required onChange={handleInputChange} />
            </div>
            <div className="col-md-6">
              <input type="text" name="city" className="form-control" placeholder="City" required onChange={handleInputChange} />
            </div>
            <div className="col-md-6">
              <input type="text" name="zip" className="form-control" placeholder="ZIP Code" required onChange={handleInputChange} />
            </div>
          </div>
        </div>

        <div className="card mb-4 p-3">
          <h5>Payment Method</h5>
          <div className="form-check">
            <input className="form-check-input" type="radio" name="paymentMethod" id="cod" onChange={() => setPaymentMethod("Cash on Delivery")} />
            <label className="form-check-label" htmlFor="cod">Cash on Delivery (COD)</label>
          </div>
          <div className="form-check">
            <input className="form-check-input" type="radio" name="paymentMethod" id="qr" onChange={() => setPaymentMethod("QR/UPI")} />
            <label className="form-check-label" htmlFor="qr">QR Code / UPI</label>
          </div>
        </div>

        <button type="submit" className="btn btn-success w-100" disabled={items.length === 0}>
          Place Order
        </button>
      </form>

      <div className="modal fade" id="qrModal" tabIndex="-1" aria-labelledby="qrModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="qrModalLabel">Scan to Pay</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
            </div>
            <div className="modal-body text-center">
              <img src="/images/QRcode.jpg" alt="QR Code" style={{ width: "200px", height: "200px" }} />
              <p className="mt-2">UPI ID: <strong>raviteja.7@superyes</strong></p>
              <p className="text-danger fw-bold">
                Time left: {String(Math.floor(countdown / 60)).padStart(2, "0")}:
                {String(countdown % 60).padStart(2, "0")}
              </p>
              <p className="text-muted">QR will auto-close after 2 minutes.</p>
              <button className="btn btn-primary mt-3" onClick={handledone}>I Have Paid</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
