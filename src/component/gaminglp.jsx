import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navpr from "./navpr";
import Footer from "./Footer";
import "./gaminglp.css";
import 'bootstrap/dist/css/bootstrap.min.css';

const GamingProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [sortOrder, setSortOrder] = useState("");
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
    const [visibleCount, setVisibleCount] = useState(10);
    const navigate = useNavigate();

    const img_url = "https://kangethevictor.pythonanywhere.com/static/images/";

    const getProducts = async () => {
        setLoading(true);
        setError("");
        try {
            const response = await axios.get(
                "https://kangethevictor.pythonanywhere.com/api/get_products_details"
            );
            setProducts(response.data);
        } catch (error) {
            setError("❌ Failed to fetch products.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getProducts();
    }, []);

    const filteredProducts = products
        .filter(product => product.category.toLowerCase() === "gaming")
        .filter(product => {
            const matchesSearch = product.product_name.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesMin = minPrice === "" || parseFloat(product.product_cost) >= parseFloat(minPrice);
            const matchesMax = maxPrice === "" || parseFloat(product.product_cost) <= parseFloat(maxPrice);
            return matchesSearch && matchesMin && matchesMax;
        })
        .sort((a, b) => {
            if (sortOrder === "asc") return a.product_cost - b.product_cost;
            if (sortOrder === "desc") return b.product_cost - a.product_cost;
            return 0;
        });

    return (
        <div className="container-fluid mt-4">
            <Navpr />
            <h3 className="text-center mb-4 fw-bold">🎮 Gaming Products</h3>

            {/* Filters */}
            <div className="row justify-content-center mb-3">
                <div className="col-md-2">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search..."
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
                <div className="col-md-2">
                    <select className="form-select" onChange={(e) => setSortOrder(e.target.value)}>
                        <option value="">Sort by</option>
                        <option value="asc">Price: Low to High</option>
                        <option value="desc">Price: High to Low</option>
                    </select>
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

            {/* Products Grid */}
            <div className="row">
                {filteredProducts.slice(0, visibleCount).map((product) => (
                    <div className="col-lg-3 col-md-4 col-sm-6 mb-4" key={product.id}>
                        <div className="card h-100 shadow-sm">
                            <img
                                src={img_url + product.product_image}
                                alt={product.product_name}
                                className="card-img-top"
                                style={{ objectFit: "cover", height: "200px" }}
                            />
                            <div className="card-body d-flex flex-column">
                                <h5 className="card-title text-truncate">{product.product_name}</h5>
                                <p className="card-text text-muted" style={{ fontSize: "0.9rem" }}>
                                    {product.product_description.slice(0, 60)}...
                                </p>
                                <p className="text-primary mb-1">{product.category}</p>
                                <h6 className="fw-bold mb-3">KES {product.product_cost}</h6>
                                <button
                                    className="btn btn-outline-primary mt-auto"
                                    onClick={() => navigate("/makepayment", { state: { product } })}
                                >
                                    🛒 Purchase Now
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Load More Button */}
            {visibleCount < filteredProducts.length && (
                <div className="text-center mb-5">
                    <button
                        className="btn btn-secondary"
                        onClick={() => setVisibleCount((prev) => prev + 10)}
                    >
                        Load More
                    </button>
                </div>
            )}

            {/* No Results */}
            {!loading && filteredProducts.length === 0 && (
                <p className="text-center text-muted mt-5">No gaming products found.</p>
            )}

            {/* Chatbot Placeholder */}
            <div className="chatbot-fixed">
                <button className="btn btn-primary rounded-circle">💬</button>
            </div>

            <Footer />
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

export default GamingProducts;
