import React, { useEffect, useState } from "react";
import axios from "axios";

const Offers = () => {
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    axios
      .get("https://dummyjson.com/c/bbdf-897f-4e4c-9a07")
      .then((res) => {
        console.log(res.data);
        setOffers(res.data.products || []); // Fallback if response has no products
      })
      .catch((err) => {
        console.error("Error fetching offers:", err);
      });
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">🎁 Available Offers</h2>
      <div className="row">
        {offers.length === 0 ? (
          <p className="text-center">No offers available.</p>
        ) : (
          offers.map((offer) => (
            <div className="col-md-4 mb-4" key={offer.id}>
              <div className="card shadow-sm h-100">
                <div className="card-body">
                  <h5 className="card-title">{offer.name || "Special Offer"}</h5>
                  <p className="card-text">
                    {offer.description || "Limited time deal just for you!"}
                  </p>
                  {offer.discountPercentage && (
                    <p>
                      <strong>Discount:</strong> {offer.discountPercentage}%
                    </p>
                  )}
                  <p className="text-muted small">
                    Price: ₹{offer.price} &nbsp; | &nbsp; Rating: ⭐{offer.rating}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Offers;
