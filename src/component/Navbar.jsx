import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Custom styles

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark bg-gradient shadow-sm">
      <div className="container-fluid">
        {/* Left: Brand */}
        <Link className="navbar-brand fw-bold text-warning" to="/">
          <i className="bi bi-shop-window me-2"></i>Computer Hub
        </Link>

        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Right: Navigation Links */}
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link custom-button text-light" to="/Sa">
                <i className="bi bi-plus-square me-2"></i>Add Products
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link custom-button text-light" to="/signup">
                <i className="bi bi-person-plus-fill me-2"></i>Signup
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link custom-button text-light" to="/signin">
                <i className="bi bi-box-arrow-in-right me-2"></i>Signin
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link custom-button text-light" to="/about">
                <i className="bi bi-info-circle-fill me-2"></i>About Us
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
