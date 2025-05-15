import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Reuse existing styles from Navbar

const Navpr = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark bg-gradient shadow-sm">
      <div className="container-fluid">
        {/* Brand / Logo */}
        <Link className="navbar-brand fw-bold text-warning" to="/">
          <i className="bi bi-cpu me-2"></i>Computer Hub
        </Link>

        {/* Toggle Button (Mobile) */}
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Right-Aligned Links */}
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link custom-button text-light" to="/gaming">
                <i className="bi bi-controller me-2"></i>Gaming
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link custom-button text-light" to="/Accessories">
                <i className="bi bi-headphones me-2"></i>Accessories
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link custom-button text-light" to="/normal">
                <i className="bi bi-briefcase me-2"></i>Office
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navpr;
