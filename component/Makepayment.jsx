import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Makepayment = () => {
  const { product } = useLocation().state || {};
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false); // Loading state

  const img_url = "https://kangethevictor.pythonanywhere.com/static/images/";
  const navigate = useNavigate();

  // Function to validate phone number
  const validatePhone = (phone) => {
    // Simple phone number validation: should be numeric and have 10 digits
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(phone);
  };

  // Function to handle form submission
  const submit = async (e) => {
    e.preventDefault();
    if (!validatePhone(phone)) {
      setMessage("Please enter a valid 10-digit phone number.");
      return;
    }
    setMessage("Processing payment... Please wait.");
    setLoading(true); // Show loading state

    const data = new FormData();
    data.append("phone", phone);
    data.append("amount", product.product_cost);

    try {
      const response = await axios.post(
        "https://kangethevictor.pythonanywhere.com/api/mpesa_payment",
        data
      );
      setMessage(response.data.message);
    } catch (error) {
      setMessage("Payment failed. Please try again later.");
    }
    setLoading(false); // Hide loading state
  };

  return (
    <div className="container mt-5">
      <nav className="mb-5">
        <Link className="m-4 mb-5 btn btn-dark shadow-lg" to="/">
          <i className="fas fa-arrow-left"></i> Back to Products
        </Link>
        <h1 className="text-center text-uppercase font-weight-bold text-primary">
          Make Payment - Lipa na Mpesa Online
        </h1>
      </nav>

      <div className="card shadow-lg p-4">
        <div className="row">
          <div className="col-md-5 mb-4">
            <img
              src={img_url + product.product_image}
              alt={product.product_name}
              className="img-fluid rounded shadow-sm"
            />
          </div>

          <div className="col-md-7">
            <h3 className="text-uppercase font-weight-bold">{product.product_name}</h3>
            <h4 className="text-success">KES {product.product_cost}</h4>
            <form onSubmit={submit}>
              {message && <p className="text-center text-info">{message}</p>}

              <div className="form-group">
                <input
                  type="text"
                  placeholder="Enter your phone number"
                  className="form-control p-3 border-0 shadow-sm"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>

              <button
                className="btn btn-success w-100 p-3 mt-3 shadow-sm"
                type="submit"
                disabled={loading}
              >
                {loading ? "Processing..." : "Pay Now"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Makepayment;
