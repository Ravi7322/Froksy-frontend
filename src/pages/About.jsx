import React from "react";

const About = () => {
  return (
    <div className="container my-5">
      <h1 className="text-center mb-4">About Forksy 🍴</h1>

      <div className="row align-items-center">
        <div className="col-md-6 mb-4 mb-md-0">
          <img
            src="/images/logo.png"
            alt="About Forksy"
            className="img-fluid rounded shadow"
            style={{ width: "35%", height: "35%" }}
          />
        </div>
        <div className="col-md-6">
          <p className="lead">
            <strong>Forksy</strong> is your one-stop destination for delicious
            food, lightning-fast delivery, and seamless online ordering. Whether
            you're craving Indian, Chinese, or something sweet, we've got
            something for every foodie.
          </p>
          <p>
            We partner with the best local restaurants and chefs to bring you
            hot, fresh meals, right to your doorstep. Our mission is to make
            ordering food easy, fast, and enjoyable — every single time.
          </p>
          <p>
            🔒 Secure Payments
            <br />
            📦 Fast Delivery
            <br />
            ❤️ Loved by Thousands
          </p>
        </div>
      </div>

      <div className="text-center mt-5">
        <p className="text-muted">
          &copy; {new Date().getFullYear()} Forksy. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default About;
