import React, { useState } from "react";
import { Link } from "react-router-dom";

const CreateProduct = () => {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");
    const [expiryDate, setExpiryDate] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:8000/api/products", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify({ name, price, quantity, expiry_date: expiryDate }),
        });

        const data = await response.json();
        if (response.ok) {
            alert("Product added successfully!");
            setName("");
            setPrice("");
            setQuantity("");
            setExpiryDate("");
        } else {
            alert("Error: " + data.message);
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-8"> {/* Increased width */}
                    <div className="card shadow-lg border-0">
                        <div className="card-header text-center bg-light">
                            <h2 className="mb-0">Create Product</h2>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label className="form-label">Product Name</label>
                                    <input type="text" className="form-control" placeholder="Enter product name" value={name} onChange={(e) => setName(e.target.value)} required />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Price </label>
                                    <input type="number" className="form-control" placeholder="Enter price" value={price} onChange={(e) => setPrice(e.target.value)} required />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Quantity</label>
                                    <input type="number" className="form-control" placeholder="Enter quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} required />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Expiry Date</label>
                                    <input type="date" className="form-control" value={expiryDate} onChange={(e) => setExpiryDate(e.target.value)} required />
                                </div>

                                <button type="submit" className="btn btn-dark w-100">Add Product</button>
                            </form>

                            {/* Link to go back to the product list */}
                            <div className="text-center mt-3">
                                <Link to="/products" className="btn btn-secondary">Back to Product List</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateProduct;
