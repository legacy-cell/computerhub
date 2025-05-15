import React, { useState } from "react";
import axios from "axios";
import Addnav from "./addnav";

const Addproducts = () => {
    const [product_name, setProductname] = useState("");
    const [product_cost, setProductcost] = useState("");
    const [category, setCategory] = useState("");
    const [product_description, setProductdescription] = useState("");
    const [product_image, setProductimage] = useState(null);

    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const submit = async (e) => {
        e.preventDefault();

        setLoading(true);
        setMessage("");
        setError("");

        try {
            const data = new FormData();
            data.append("product_name", product_name);
            data.append("product_cost", product_cost);
            data.append("product_description", product_description);
            data.append("product_image", product_image);
            data.append("category", category);

            await axios.post(
                "https://kangethevictor.pythonanywhere.com/api/add_product",
                data
            );

            setLoading(false);
            setMessage("✅ Product added successfully!");

            // Reset form
            setProductname("");
            setProductcost("");
            setCategory("");
            setProductdescription("");
            setProductimage(null);
        } catch (error) {
            setLoading(false);
            setError("❌ Failed to add product. Please try again.");
        }
    };

    return (
        <div className="row justify-content-center mt-4">
            <Addnav />
            <div className="col-md-6 card shadow p-5">
                <h2>Upload Product</h2>

                {loading && (
                    <div className="text-center my-3">
                        <div className="spinner-border text-primary" role="status" />
                    </div>
                )}
                {error && <div className="alert alert-danger">{error}</div>}
                {message && <div className="alert alert-success">{message}</div>}

                <form onSubmit={submit}>
                    <input
                        type="text"
                        placeholder="Enter Product Name"
                        className="form-control"
                        value={product_name}
                        onChange={(e) => setProductname(e.target.value)}
                        required
                    />
                    <br />
                    <input
                        type="number"
                        placeholder="Enter Product Cost"
                        className="form-control"
                        value={product_cost}
                        onChange={(e) => setProductcost(e.target.value)}
                        required
                    />
                    <br />
                    <input
                        type="text"
                        placeholder="Enter Product Category"
                        className="form-control"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        required
                    />
                    <br />
                    <textarea
                        placeholder="Describe your product"
                        className="form-control"
                        value={product_description}
                        onChange={(e) => setProductdescription(e.target.value)}
                        required
                    ></textarea>
                    <br />
                    <label htmlFor="productImage">Upload Product Image</label>
                    <input
                        id="productImage"
                        type="file"
                        className="form-control"
                        accept="image/*"
                        onChange={(e) => setProductimage(e.target.files[0])}
                        required
                    />
                    <br />
                    <button type="submit" className="btn btn-primary w-100">
                        Upload Product
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Addproducts;
