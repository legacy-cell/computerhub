import React from 'react';
import { Link } from 'react-router-dom';

const Carousel = () => {
  const carouselImages = [
    { src: "nav/n1.jpeg", alt: "Gaming Setup" },
    { src: "nav/n2.jpeg", alt: "Laptop Accessories" },
    { src: "nav/n3.jpeg", alt: "Office Computers" }
  ];

  return (
    <section className="row">
      {/* Carousel Section */}
      <div className="col-md-6">
        <div id="mycarousel" className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-inner w-100">
            {carouselImages.map((image, index) => (
              <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                <img 
                  src={image.src} 
                  alt={image.alt} 
                  className="d-block w-100" 
                  height="300"
                />
              </div>
            ))}
          </div>
          {/* Carousel Controls */}
          <button className="carousel-control-prev" type="button" data-bs-target="#mycarousel" data-bs-slide="prev">
            <span className="carousel-control-prev-icon bg-danger" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#mycarousel" data-bs-slide="next">
            <span className="carousel-control-next-icon bg-danger" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>

      {/* Explore Section */}
      <div className="col-md-6 d-flex flex-column justify-content-center">
        <div className="explore-section p-4">
          <h3 className="mb-4">Explore</h3>
          <ul className="list-unstyled">
            <li className="mb-3">
              <p>Discover our expert-tested gaming setups tailored to your performance needs.</p>
              <Link to="/gaming" className="btn btn-outline-primary">Explore Gaming</Link>
            </li>
            <li className="mb-3">
              <p>Upgrade with quality replacement parts for your laptop — easy and affordable.</p>
              <Link to="/Accessories" className="btn btn-outline-primary">Explore Accessories</Link>
            </li>
            <li>
              <p>From home to office, find computers that fit your everyday needs.</p>
              <Link to="/normal" className="btn btn-outline-primary">Explore Office Laptops</Link>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Carousel;
