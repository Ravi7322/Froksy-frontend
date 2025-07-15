import axios from "axios";
import React, { useEffect, useState } from "react";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("profile"); // "profile" or "orders"
  const [ordersByDate, setOrdersByDate] = useState({});
  const [profile, setProfile] = useState({ email: "", number: "" });

  useEffect(() => {
    const number = localStorage.getItem("number");
    const email = localStorage.getItem("loggedEmail");

    if (!number || !email) return;

    setProfile({ number, email });

    axios
      .get(`${process.env.REACT_APP_API_URL}/history?number=${number}`)
      .then((res) => groupByDate(res.data))
      .catch((err) => console.log(err));
  }, []);

  const groupByDate = (data) => {
    const grouped = {};
    data.forEach((item) => {
      const date = new Date(item.created_at).toLocaleDateString();
      if (!grouped[date]) grouped[date] = [];
      grouped[date].push(item);
    });
    setOrdersByDate(grouped);
  };

  const logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <div className="container-fluid">
      <div className="row">
        {/* Sidebar */}
        <div className="col-md-3 border-end p-3">
          <h4>👤 My Account</h4>
          <ul className="nav flex-column mt-4">
            <li className="nav-item mb-2">
              <button
                className={`nav-link btn ${activeTab === "profile" ? "fw-bold text-primary" : "text-dark"}`}
                onClick={() => setActiveTab("profile")}
              >
                Profile
              </button>
            </li>
            <li className="nav-item mb-2">
              <button
                className={`nav-link btn ${activeTab === "orders" ? "fw-bold text-primary" : "text-dark"}`}
                onClick={() => setActiveTab("orders")}
              >
                Order History
              </button>
            </li>
          </ul>

          <button className="btn btn-outline-danger btn-sm mt-4" onClick={logout}>
            Logout
          </button>
        </div>

        {/* Main Content */}
        <div className="col-md-9 p-4">
          {activeTab === "profile" && (
            <>
              <h2>👤 Profile</h2>
              <div className="card p-4 shadow-sm mt-3">
                <p><strong>Email:</strong> {profile.email}</p>
                <p><strong>Mobile Number:</strong> {profile.number}</p>
              </div>
            </>
          )}

          {activeTab === "orders" && (
            <>
              <h2 className="mb-4">🧾 Order History</h2>
              {Object.keys(ordersByDate).length === 0 ? (
                <p>No orders found.</p>
              ) : (
                Object.entries(ordersByDate).map(([date, items]) => (
                  <div key={date} className="mb-4">
                    <h5 className="text-primary border-bottom pb-1 mb-3">{date}</h5>
                    <div className="row g-3">
                      {items.map((item) => (
                        <div className="col-md-6 col-lg-4" key={item.id}>
                          <div className="card h-100 shadow-sm">
                            <div className="card-body">
                              <h6 className="card-title mb-2">{item.item_name}</h6>
                              <p className="card-text mb-1">Quantity: {item.quantity}</p>
                              <p className="card-text mb-1">Price: ₹{item.price}</p>
                              <p className="card-text text-muted" style={{ fontSize: "0.85rem" }}>
                                Ordered at: {new Date(item.created_at).toLocaleTimeString()}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
