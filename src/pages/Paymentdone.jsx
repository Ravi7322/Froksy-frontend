import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Paymentdone = () => {
  const [deliveryTime, setDeliveryTime] = useState(0);
  const [mapLink, setMapLink] = useState("");

  useEffect(() => {
    // Generate random delivery time between 15 and 45 minutes
    const time = Math.floor(Math.random() * (45 - 15 + 1)) + 15;
    setDeliveryTime(time);

    // Dummy example addresses — replace with actual from Redux/localStorage if needed
    const origin = "Forksy Restaurant, Hyderabad";
    const destination = localStorage.getItem("deliveryAddress") || "Your Address";

    const mapUrl = `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}`;
    setMapLink(mapUrl);
  }, []);

  return (
    <div className="order-confirmed-container d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="order-box text-center p-4 rounded shadow bg-white" style={{ maxWidth: "500px" }}>
        <h2 className="mb-3 text-success">✅ Order Confirmed!</h2>
        <p className="mb-2">Thank you for your purchase. Your order has been successfully placed.</p>
        <p className="text-success fw-bold fs-5">🛵 Delivery in ~ {deliveryTime} minutes</p>

        {mapLink && (
          <a href={mapLink} target="_blank" rel="noopener noreferrer" className="btn btn-outline-success mt-3">
            View Delivery Route on Map
          </a>
        )}

        <div className="mt-4">
          <Link to="/" className="btn btn-primary">
            Go Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Paymentdone;
