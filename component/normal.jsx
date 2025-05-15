import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navpr from "./navpr";
import Footer from "./Footer";
import "./gaminglp.css"; // Import custom CSS for additional styling
import { Spinner } from 'react-bootstrap'; // Import Bootstrap Spinner

const Normal = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();

    const img_url = "https://kangethevictor.pythonanywhere.com/static/images/";

    // Fetch products
    const getProducts = async () => {
        setLoading(true);
        try {
            const response = await axios.get(
                "https://kangethevictor.pythonanywhere.com/api/get_products_details"
            );
            setProducts(response.data);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            setError("Failed to fetch products. Please try again later.");
        }
    };

    useEffect(() => {
        getProducts();
    }, []);

    useEffect(() => {
        if (!products) return;
        const filtered = products.filter(
            (product) =>
                product.category.toLowerCase() === "office" && // Only show "office" category
                (product.product_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    product.category.toLowerCase().includes(searchTerm.toLowerCase()))
        );
        setFilteredProducts(filtered);
    }, [searchTerm, products]);

    return (
        <div className="container-fluid mt-5">
            <Navpr />
            <h3 className="text-center mb-4">Available Office Products</h3>

            {/* Search Bar */}
            <form className="d-flex justify-content-center mb-4">
                <input
                    type="text"
                    placeholder="Search office products"
                    className="form-control w-50"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </form>

            {/* Loading Spinner */}
            {loading && (
                <div className="text-center">
                    <Spinner animation="border" variant="primary" />
                    <p>Loading products...</p>
                </div>
            )}

            {/* Error Message */}
            {error && <p className="text-center text-danger">{error}</p>}

            {/* Display Products */}
            <div className="row">
                {filteredProducts?.map((product) => (
                    <div className="col-lg-3 col-md-4 col-sm-6 mb-4" key={product.id}>
                        <div className="card shadow-sm h-100 product-card">
                            <img
                                src={img_url + product.product_image}
                                alt={product.product_name}
                                className="card-img-top product-img"
                            />
                            <div className="card-body">
                                <h5 className="card-title">{product.product_name}</h5>
                                <p className="card-text text-muted">
                                    {product.product_description.slice(0, 50)}...
                                </p>
                                <p className="text-primary">{product.category}</p>
                                <p className="text-dark font-weight-bold">
                                    KES {product.product_cost}
                                </p>
                                <button
                                    className="btn btn-outline-primary w-100"
                                    onClick={() =>
                                        navigate("/makepayment", { state: { product } })
                                    }
                                >
                                    Purchase Now
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <Footer />
        </div>
    );
};

export default Normal;
