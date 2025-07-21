import React, { useEffect, useState } from "react";
import "./navbar.css";
import { NavLink } from "react-router-dom";
import Location from "./Location";
import { useSelector } from "react-redux";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const Navbar = ({ setIsLoggedIn, setSearchText }) => {
  const totalPrice = useSelector((state) => state.cart.totalPrice);

  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [signupNumber, setSignupNumber] = useState("");

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const [input, setInput] = useState("");
  const [loggedEmail, setLoggedEmail] = useState("");

  useEffect(() => {
    const storedEmail = localStorage.getItem("loggedEmail");
    if (storedEmail) {
      setLoggedEmail(storedEmail);
    }
  }, []);

  const isValidEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const isValidNumber = (num) =>
    /^[0-9]{10}$/.test(num);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!signupEmail || !signupPassword || !signupNumber || !confirmPassword) {
      return toast.error("⚠️ Please fill all fields.");
    }

    if (!isValidEmail(signupEmail)) {
      return toast.error("📧 Enter a valid email address.");
    }

    if (!isValidNumber(signupNumber)) {
      return toast.error("📞 Enter a 10-digit mobile number.");
    }

    if (signupPassword.length < 6) {
      return toast.error("🔒 Password must be at least 6 characters.");
    }

    if (signupPassword !== confirmPassword) {
      return toast.error("❌ Passwords do not match.");
    }

    axios
      .post(`${process.env.REACT_APP_API_URL}/login`, {
        email: signupEmail,
        password: signupPassword,
        number: signupNumber,
      })
      .then(() => {
        toast.success("✅ Registered successfully!");
        setSignupEmail("");
        setSignupPassword("");
        setConfirmPassword("");
        setSignupNumber("");
      })
      .catch((err) => {
        console.error(err);
        toast.error("❌ Email is already registered.");
      });
  };

  const login = (e) => {
    e.preventDefault();

    if (!loginEmail || !loginPassword) {
      return toast.error("⚠️ Email and password required.");
    }

    if (!isValidEmail(loginEmail)) {
      return toast.error("📧 Enter a valid email.");
    }

    axios
      .get(`${process.env.REACT_APP_API_URL}/users`)
      .then((res) => {
        const user = res.data.find((u) => u.email === loginEmail);

        if (!user) {
          setLoginError("⚠️ Email is not registered.");
        } else if ((user.password ?? "").trim() === (loginPassword ?? "").trim()) {
          setLoginError("");
          setLoggedEmail(user.email);
          setIsLoggedIn(true);

          localStorage.setItem("loggedEmail", user.email);
          localStorage.setItem("user_id", user.id);
          localStorage.setItem("number", user.number);

          document.querySelector("#offcanvasScrolling .btn-close")?.click();
          toast.success("✅ Login successful!");

          setLoginEmail("");
          setLoginPassword("");
        } else {
          setLoginError("❌ Incorrect password.");
        }
      })
      .catch((err) => {
        console.log(err);
        setLoginError("⚠️ Something went wrong.");
      });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchText(input);
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg px-4">
        <div className="navbar-inner d-flex align-items-center w-100">
          <NavLink to="/">
            <img className="logo1" src="/images/logo.png" alt="logo" />
          </NavLink>

          <form className="ser d-flex" role="search" onSubmit={handleSearch}>
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              required
            />
            <button className="btn btn-outline-success" type="submit">
              Search
            </button>
          </form>

          <div className="loc d-flex">
            <Location />
          </div>

          <h1 className="forksy-text">Forksy</h1>

          <div className="menu1 d-flex gap-3">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/offers">Offers 🎁</NavLink>
            <NavLink to="/about">About</NavLink>

            {loggedEmail ? (
              <NavLink to="/profile">
                <button
                  type="button"
                  className="btn btn-link p-0 m-0 text-success fw-bold"
                  style={{ textDecoration: "none" }}
                >
                  {loggedEmail}
                </button>
              </NavLink>
            ) : (
              <NavLink
                to="#"
                data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasScrolling"
              >
                Signin
              </NavLink>
            )}

            <NavLink to="/cart">
              Cart 🛒 ₹{Math.max(0, totalPrice.toFixed(2))}
            </NavLink>
          </div>
        </div>
      </nav>

      {/* Sign In Offcanvas */}
      <div
        className="offcanvas offcanvas-end"
        data-bs-scroll="true"
        data-bs-backdrop="true"
        tabIndex="-1"
        id="offcanvasScrolling"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title">Signin</h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
          ></button>
        </div>
        <div className="offcanvas-body">
          <form className="d-flex flex-column gap-3" onSubmit={login}>
            <div>
              <label htmlFor="login-email" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="login-email"
                placeholder="Enter your email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label htmlFor="login-password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="login-password"
                placeholder="Enter your password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                required
              />
              <div style={{ color: "red", fontSize: "14px", marginTop: "5px" }}>
                {loginError}
              </div>
            </div>

            <button type="submit" className="btn btn-primary">
              Sign In
            </button>

            <button
              type="button"
              className="btn btn-primary"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasScrolling1"
            >
              SignUp
            </button>
          </form>
        </div>
      </div>

      {/* Sign Up Offcanvas */}
      <div
        className="offcanvas offcanvas-end"
        data-bs-scroll="true"
        data-bs-backdrop="true"
        tabIndex="-1"
        id="offcanvasScrolling1"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title">Sign Up</h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
          ></button>
        </div>
        <div className="offcanvas-body">
          <form className="d-flex flex-column gap-3" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="number" className="form-label">
                Number
              </label>
              <input
                type="tel"
                className="form-control"
                id="number"
                placeholder="Enter your Number"
                value={signupNumber}
                onChange={(e) => setSignupNumber(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Enter your email"
                value={signupEmail}
                onChange={(e) => setSignupEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Enter your password"
                value={signupPassword}
                onChange={(e) => setSignupPassword(e.target.value)}
                required
              />
            </div>

            <div>
              <label htmlFor="confirm-password" className="form-label">
                Confirm Password
              </label>
              <input
                type="password"
                className="form-control"
                id="confirm-password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary">
              Sign Up
            </button>
          </form>
        </div>
      </div>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default Navbar;
