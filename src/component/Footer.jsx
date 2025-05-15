import React from 'react';

const Footer = () => {
  return (
    <>
      {/* Contact & Social Section */}
      <section id="contact" className="bg-dark text-white py-5">
        <div className="container text-center">
          <div className="row">
            {/* Contact Info */}
            <div className="col-md-6 mb-4 mb-md-0">
              <h2>Get in Touch</h2>
              <p>We'd love to hear from you. Reach out with any questions or feedback!</p>
              <a href="mailto:contact@novelmoviehub.com" className="btn btn-outline-light">
                Email Us
              </a>
            </div>

            {/* Social Links */}
            <div className="col-md-6">
              <h4 className="mb-3">Stay Connected</h4>
              <div className="d-flex justify-content-center gap-4">
                <a href="https://www.facebook.com" aria-label="Facebook">
                  <img src="nav/OIP (17).jpeg" alt="Facebook" height="40" />
                </a>
                <a href="https://www.instagram.com" aria-label="Instagram">
                  <img src="nav/OIP (16).jpeg" alt="Instagram" height="40" />
                </a>
                <a href="https://x.com" aria-label="X (Twitter)">
                  <img src="nav/OIP (18).jpeg" alt="X (Twitter)" height="40" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comment Section */}
      <section className="bg-light py-4">
        <div className="container">
          <h4 className="text-center mb-3">Leave a Comment</h4>
          <form className="w-75 mx-auto">
            <div className="mb-3">
              <textarea
                className="form-control"
                rows="4"
                placeholder="Your feedback or questions..."
              ></textarea>
            </div>
            <div className="text-center">
              <button type="submit" className="btn btn-primary">Submit Comment</button>
            </div>
          </form>
        </div>
      </section>

      {/* Footer Bar */}
      <footer className="bg-secondary text-white text-center py-3">
        &copy; 2025 Novel Hub. Developed by Victor.
      </footer>
    </>
  );
};

export default Footer;
