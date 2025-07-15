import React from 'react';
import './footter.css';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

const Footter = () => {
  return (
    <footer className="footer">
      <div className="footer-top">
        <h5>
          Developed by <span className="highlight">Ravi</span>
        </h5>
        <div className="social-icons">
          <a href="https://github.com/Ravi7322/src" target="_blank" rel="noopener noreferrer">
            <FaGithub />
          </a>
          <a href="https://www.linkedin.com/in/ravi-teja-6b712b292/" target="_blank" rel="noopener noreferrer">
            <FaLinkedin />
          </a>
        </div>
      </div>

      <div className="footer-links">
        <NavLink to="/about">About</NavLink>
        <NavLink to="/contact">Contact</NavLink>
        <NavLink to="/privacy">Privacy Policy</NavLink>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footter;
