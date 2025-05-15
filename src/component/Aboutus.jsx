import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import './AboutUs.css';  // Import the external stylesheet

const Aboutus = () => {
  return (
    <div className="aboutus-container">
      <Navbar />

      <div className="aboutus-image-container">
        <img 
          src="nav/OIP (19).jpeg" 
          alt="About Us" 
          className="aboutus-image"
        />
      </div>

      <div className="aboutus-content">
        <h2 className="aboutus-heading">What We Believe In</h2>
        <p className="aboutus-text">
          We believe in transparency in our services, ensuring a secure method of buying and selling books.
        </p>

        <h2 className="aboutus-heading">Our Goal</h2>
        <p className="aboutus-text">
          Our goal is to create a platform where people can trade their books with each other.
        </p>

        <h2 className="aboutus-heading">Our Dream</h2>
        <p className="aboutus-text">
          We dream of providing books to everyone, no matter where they are.
        </p>
      </div>

      <Footer />
    </div>
  );
};

export default Aboutus;
