import React, { useEffect, useState } from "react";
import "./navbar.css";
import { NavLink } from "react-router-dom";
import Location from "./Location";
import { useSelector } from "react-redux";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const Navbar = ({ setIsLoggedIn ,setSearchText }) => {
  const totalPrice = useSelector((state) => state.cart.totalPrice);
  
  const [email, setEmail] = useState();
  const [email1, setEmail1] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [number, setNumber] = useState();
  const [password1, setPassword1] = useState();
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

  // ✅ Phone number must be exactly 10 digits
  const isValidNumber = (num) =>
    /^[0-9]{10}$/.test(num);

  const handleSubmit = (e) => {
    e.preventDefault();

     if (!email || !password || !number || !confirmPassword) {
      return toast.error("⚠️ Please fill all fields.");
    }

    if (!isValidEmail(email)) {
      return toast.error("📧 Enter a valid email address.");
    }

    if (!isValidNumber(number)) {
      return toast.error("📞 Enter a 10-digit mobile number.");
    }

    if (password.length < 6) {
      return toast.error("🔒 Password must be at least 6 characters.");
    }

    if (password !== confirmPassword) {
      return toast.error("❌ Passwords do not match.");
    }

    axios
      .post(`${process.env.REACT_APP_API_URL}/login`, { email, password, number })
      .then((res) => {
        toast.success("✅ Registered successfully!");
      })
      .catch((err) => {
        console.error(err);
        toast.error("Email is already exits.");
      });
  };

  const login = (e) => {
    e.preventDefault();
     if (!email1 || !password1) {
      return toast.error("⚠️ Email and password required.");
    }

    if (!isValidEmail(email1)) {
      return toast.error("📧 Enter a valid email.");
    }


    axios
      .get(`${process.env.REACT_APP_API_URL}/users`)
      .then((res) => {
        const user = res.data.find((user) => user.email === email1);

        if (!user) {
          setLoginError("Email is not registered.");
        } else if ((user.password ?? "").trim() === (password1 ?? "").trim()) {
          setLoginError("");
          setLoggedEmail(user.email);
          localStorage.setItem("number", user.number);
          setIsLoggedIn(true);

          // ✅ Save details
          localStorage.setItem("loggedEmail", user.email);
          localStorage.setItem("user_id", user.id);
          localStorage.setItem("number", user.number); // ✅ Save number

          document.querySelector("#offcanvasScrolling .btn-close")?.click();
          toast.success("Login successful!");
        } else {
          setLoginError("Incorrect password.");
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
            <NavLink to='/'>Home</NavLink>
            <NavLink to='/offers'>Offers 🎁</NavLink>
            <NavLink to='/about'>About</NavLink>

            {loggedEmail ? (
              <>
                <NavLink to="/profile">
                  <button
  type="button"
  className="btn btn-link p-0 m-0 text-success fw-bold"
  style={{ textDecoration: "none" }}
>
  {loggedEmail}
</button>

                   
                </NavLink>
              
              </>
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
                onChange={(e) => setEmail1(e.target.value)}
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
                onChange={(e) => setPassword1(e.target.value)}
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
                onChange={(e) => setNumber(e.target.value)}
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
                onChange={(e) => setEmail(e.target.value)}
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
                onChange={(e) => setPassword(e.target.value)}
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
                onChange={(e) => setConfirmPassword(e.target.value)}
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
