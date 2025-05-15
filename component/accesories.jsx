import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navpr from "./navpr";
import Footer from "./Footer";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Modal, Button } from "react-bootstrap"; // Bootstrap Modal for Product Details

const Accessories = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null); // Track selected product for modal
    const navigate = useNavigate();

    const img_url = "https://kangethevictor.pythonanywhere.com/static/images/";

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
            setError("❌ Failed to fetch products");
        }
    };

    useEffect(() => {
        getProducts();
    }, []);

    useEffect(() => {
        if (!products) return;
        const filtered = products.filter(
            (product) =>
                product.category.toLowerCase() === "accessories" &&
                (product.product_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    product.category.toLowerCase().includes(searchTerm.toLowerCase()))
        );
        setFilteredProducts(filtered);
    }, [searchTerm, products]);

    // Show Modal
    const handleShowModal = (product) => {
        setSelectedProduct(product);
        setShowModal(true);
    };

    // Hide Modal
    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedProduct(null);
    };

    return (
        <div className="container-fluid mt-5">
            <Navpr />
            <h3 className="text-center mb-4 fw-bold">🎮 Available Accessories</h3>

            {/* Search Input */}
            <div className="row justify-content-center mb-4">
                <div className="col-md-6">
                    <input
                        type="text"
                        className="form-control shadow-sm"
                        placeholder="🔍 Search accessories..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {/* Loading Spinner */}
            {loading && (
                <div className="text-center my-4">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            )}

            {/* Error Message */}
            {error && <p className="text-center text-danger">{error}</p>}

            {/* Product Cards */}
            <div className="row">
                {filteredProducts?.length > 0 ? (
                    filteredProducts.map((product) => (
                        <div className="col-lg-3 col-md-4 col-sm-6 mb-4" key={product.id}>
                            <div className="card shadow-sm h-100 product-card">
                                <img
                                    src={img_url + product.product_image}
                                    alt={product.product_name}
                                    className="card-img-top"
                                    style={{ objectFit: "cover", height: "200px" }}
                                    onError={(e) => (e.target.src = "/fallback.jpg")} // fallback image
                                />
                                <div className="card-body d-flex flex-column">
                                    <h5 className="card-title text-truncate">{product.product_name}</h5>

                                    {/* Product Tags (e.g., Best Seller, New Arrival) */}
                                    <div className="product-tags mb-2">
                                        {product.is_new && <span className="badge bg-success me-1">New</span>}
                                        {product.is_best_seller && <span className="badge bg-warning text-dark me-1">Best Seller</span>}
                                    </div>

                                    <p className="card-text text-muted" style={{ fontSize: "0.9rem" }}>
                                        {product.product_description.slice(0, 60)}...
                                    </p>

                                    <p className="text-primary mb-1">{product.category}</p>
                                    <h6 className="fw-bold mb-3">KES {product.product_cost}</h6>

                                    {/* Product Rating */}
                                    <div className="mb-3">
                                        {Array(5)
                                            .fill()
                                            .map((_, i) => (
                                                <span key={i} className={`star ${i < product.rating ? "filled" : ""}`}>&#9733;</span>
                                            ))}
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="d-flex justify-content-between">
                                        <button
                                            className="btn btn-outline-primary"
                                            onClick={() => handleShowModal(product)}
                                        >
                                            View More
                                        </button>
                                        <button
                                            className="btn btn-outline-primary"
                                            onClick={() => navigate("/makepayment", { state: { product } })}
                                        >
                                            🛒 Purchase Now
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-muted mt-5">No accessories found for your search.</p>
                )}
            </div>

            {/* Footer */}
            <Footer />

            {/* Modal for Product Details */}
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>{selectedProduct?.product_name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <img
                        src={img_url + selectedProduct?.product_image}
                        alt={selectedProduct?.product_name}
                        className="img-fluid mb-3"
                    />
                    <p>{selectedProduct?.product_description}</p>
                    <p><b>Price:</b> KES {selectedProduct?.product_cost}</p>
                    <p><b>Category:</b> {selectedProduct?.category}</p>
                    <p><b>Rating:</b> {selectedProduct?.rating} / 5</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>Close</Button>
                    <Button
                        variant="primary"
                        onClick={() => {
                            handleCloseModal();
                            navigate("/makepayment", { state: { product: selectedProduct } });
                        }}
                    >
                        🛒 Purchase Now
                    </Button>
                </Modal.Footer>
            </Modal>
            <button
    className="btn btn-primary position-fixed bottom-0 end-0 m-4 rounded-circle"
    style={{ width: '60px', height: '60px' }}
    onClick={() => navigate('/chatbot')}
>
    💬
</button>
        </div>
    );
};

export default Accessories;
