import Home from './pages/Home';
import './App.css';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Dish from './pages/Dish';
import Footter from './components/Footter';
import Cart from './pages/Cart';
import Payment from './pages/Payment';
import Paymentdone from './pages/Paymentdone';
import Profile from './pages/Profile';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'; 
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import About from './pages/About';
import Offers from './pages/Offer';
import SplashScreen from './components/SplashScreen';
import Privacy from './pages/Privacy';
import Contact from './pages/Contact';



function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [showSplash, setShowSplash] = useState(true);


  const RequireLogin = ({ children }) => {
  if (!isLoggedIn) {
    toast.error("Please login to proceed.");
    return <Navigate to="/" replace />;
  }
  return children;
};


  useEffect(() => {
    const stored = localStorage.getItem("loggedEmail");
    setIsLoggedIn(!!stored); // true if email exists
  }, []);
 
  return (
     <div className="app-wrapper">
      {showSplash && window.location.pathname === "/" ? (
          <SplashScreen onFinish={() => setShowSplash(false)} />
      ) : (

      <Router>
       <Navbar setIsLoggedIn={setIsLoggedIn} setSearchText={setSearchText} />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home searchText={searchText}/>} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/dish/:id" element={<Dish />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/about" element={<About/>} />
            <Route path="/offers" element={<Offers/>} />
            <Route path="/privacy" element={<Privacy/>} />
             <Route path="/contact" element={<Contact/>} />
            <Route path="/placed" element={<Paymentdone/>} />
            <Route
  path="/payment"
  element={
    <RequireLogin>
      <Payment />
    </RequireLogin>
  }
/>

          </Routes>
        </div>
        <Footter />
      </Router>
      )}
    </div>
  );
}

export default App;
