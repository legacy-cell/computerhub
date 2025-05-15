import React from 'react'
import { Link } from 'react-router-dom'



const Addnav = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <Link className="navbar-brand fw-bold text-warning" to="/">
                <i className="bi bi-shop-window me-2"></i>Computer Hub
              </Link>
      <button 
        className="navbar-toggler custom-button bg-primary" 
        type="button" 
        data-toggle="collapse" 
        data-target="#navbarNav">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div 
        className="collapse navbar-collapse" 
        id="navbarNav">
        <ul className="navbar-nav ml-auto">
            
          
        </ul>
      </div>
    </nav>
  )
}

export default Addnav;