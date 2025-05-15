// Enhanced Getproducts component with sorting, filtering, load more, and chatbot placeholder

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Carousel from "./Carousel";
import Footer from "./Footer";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Modal } from "bootstrap";

const Getproducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState("");
    const [error, setError] = useState("");
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortOrder, setSortOrder] = useState("");
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
    const [visibleCount, setVisibleCount] = useState(10);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const navigate = useNavigate();

    const img_url = "https://kangethevictor.pythonanywhere.com/static/images/";

    const getProducts = async () => {
        setLoading("please wait we are retrieving your products");
        try {
            const response = await axios.get("https://kangethevictor.pythonanywhere.com/api/get_products_details");
            setProducts(response.data);
            setLoading("");
        } catch (error) {
            setLoading("");
            setError("Failed to fetch products");
        }
    };

    useEffect(() => {
        getProducts();
    }, []);

    useEffect(() => {
        let filtered = [...products];
        if (searchTerm) {
            filtered = filtered.filter((product) =>
                product.product_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                product.category.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        if (minPrice) {
            filtered = filtered.filter((product) => product.product_cost >= parseFloat(minPrice));
        }
        if (maxPrice) {
            filtered = filtered.filter((product) => product.product_cost <= parseFloat(maxPrice));
        }
        if (sortOrder === "asc") {
            filtered.sort((a, b) => a.product_cost - b.product_cost);
        } else if (sortOrder === "desc") {
            filtered.sort((a, b) => b.product_cost - a.product_cost);
        }
        setFilteredProducts(filtered);
    }, [searchTerm, products, minPrice, maxPrice, sortOrder]);

    useEffect(() => {
        let modalInstance;
        const modalElement = document.getElementById('productModal');
        if (selectedProduct && modalElement) {
            modalInstance = new Modal(modalElement);
            modalInstance.show();
            const handleHide = () => setSelectedProduct(null);
            modalElement.addEventListener("hidden.bs.modal", handleHide);
            return () => {
                modalElement.removeEventListener("hidden.bs.modal", handleHide);
                modalInstance?.hide();
            };
        }
    }, [selectedProduct]);

    const truncate = (str, len) => str.length > len ? str.slice(0, len) + '...' : str;

    return (
        <div className="row">
            <Navbar />
            <Carousel />

            <div className="container my-4">
                <h3>Available Products</h3>

                <form className="row g-2 mb-4">
                    <div className="col-md-4">
                        <input
                            type="text"
                            placeholder="Search products"
                            className="form-control"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="col-md-2">
                        <input
                            type="number"
                            className="form-control"
                            placeholder="Min Price"
                            value={minPrice}
                            onChange={(e) => setMinPrice(e.target.value)}
                        />
                    </div>
                    <div className="col-md-2">
                        <input
                            type="number"
                            className="form-control"
                            placeholder="Max Price"
                            value={maxPrice}
                            onChange={(e) => setMaxPrice(e.target.value)}
                        />
                    </div>
                    <div className="col-md-4">
                        <select
                            className="form-select"
                            value={sortOrder}
                            onChange={(e) => setSortOrder(e.target.value)}
                        >
                            <option value="">Sort by Price</option>
                            <option value="asc">Lowest to Highest</option>
                            <option value="desc">Highest to Lowest</option>
                        </select>
                    </div>
                </form>

                {loading && <div className="text-center"><div className="spinner-border text-primary" /></div>}
                {error && <div className="alert alert-danger">{error}</div>}

                <div className="row">
                    {filteredProducts.slice(0, visibleCount).map((product) => (
                        <div className="col-md-3 mb-4" key={product.id}>
                            <div className="card h-100">
                                <img
                                    src={img_url + product.product_image}
                                    alt={product.product_name}
                                    className="card-img-top"
                                    style={{ cursor: "pointer", height: "200px", objectFit: "cover" }}
                                    onClick={() => setSelectedProduct(product)}
                                />
                                <div className="card-body">
                                    <h5 className="card-title">{product.product_name}</h5>
                                    <p className="card-text">{truncate(product.product_description, 60)}</p>
                                    <p className="text-secondary">{product.category}</p>
                                    <strong>KES {product.product_cost}</strong>
                                </div>
                                <div className="card-footer">
                                    <button
                                        className="btn btn-outline-primary w-100"
                                        onClick={() => navigate('/makepayment', { state: { product } })}
                                    >
                                        Purchase now
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {visibleCount < filteredProducts.length && (
                    <div className="text-center">
                        <button
                            className="btn btn-secondary mt-3"
                            onClick={() => setVisibleCount(prev => prev + 10)}
                        >
                            Load More Products
                        </button>
                    </div>
                )}
            </div>

            {/* Modal */}
            {selectedProduct && (
                <div className="modal fade" id="productModal" tabIndex="-1">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Product Details</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                            </div>
                            <div className="modal-body row">
                                <div className="col-md-4">
                                    <img src={img_url + selectedProduct.product_image} alt={selectedProduct.product_name} className="img-fluid" />
                                </div>
                                <div className="col-md-8">
                                    <h3>{selectedProduct.product_name}</h3>
                                    <p>{selectedProduct.product_description}</p>
                                    <p className="text-primary">{selectedProduct.category}</p>
                                    <p><strong>KES {selectedProduct.product_cost}</strong></p>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button className="btn btn-primary" onClick={() => navigate('/makepayment', { state: { product: selectedProduct } })}>Purchase now</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <Footer />

            {/* Chatbot Placeholder */}
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

export default Getproducts;
