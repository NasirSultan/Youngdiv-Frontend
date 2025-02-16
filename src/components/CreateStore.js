import React, { useState, useEffect } from "react";
import { getStores, updateStore, deleteStore } from "../services/api";
import { useNavigate } from "react-router-dom";

const StoreManagement = () => {
    const [store, setStore] = useState(null);
    const [formData, setFormData] = useState({ name: "", address: "", contact_info: "" });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        fetchStore();
    }, []);

    const fetchStore = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            setError("Unauthorized! Please login again.");
            return;
        }
        const result = await getStores(token);
        if (result.length > 0) {
            setStore(result[0]);
            setFormData(result[0]);
        } else {
            setError("No store found");
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        const token = localStorage.getItem("token");
        if (!token) {
            setError("Unauthorized! Please login again.");
            return;
        }

        const result = await updateStore(store.id, formData, token);
        if (result.store) {
            setSuccess("Store updated successfully!");
            setStore(result.store);
            setTimeout(() => navigate("/store"), 2000);
        } else {
            setError(result.message || "Failed to update store");
        }
    };

    const handleDelete = async () => {
        setError("");
        setSuccess("");

        const token = localStorage.getItem("token");
        if (!token) {
            setError("Unauthorized! Please login again.");
            return;
        }

        console.log("Deleting store...");
        const result = await deleteStore(store.id, token);
        console.log("Delete response:", result);

        if (result.message === "Store and related products deleted successfully") {
            setSuccess("Store deleted successfully!");
            
            // Ensure proper redirection after deletion
            setTimeout(() => {
                navigate("/"); // Redirect to home or another page first
                window.location.href = "/store"; // Force hard refresh to update state
            }, 1500);
        } else {
            setError(result.message || "Failed to delete store");
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow-lg p-4">
                        <h2 className="text-center mb-4">Manage Store</h2>

                        {error && <div className="alert alert-danger">{error}</div>}
                        {success && <div className="alert alert-success">{success}</div>}

                        {store ? (
                            <form onSubmit={handleUpdate}>
                                <div className="mb-3">
                                    <label className="form-label">Store Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        className="form-control"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Address</label>
                                    <input
                                        type="text"
                                        name="address"
                                        className="form-control"
                                        value={formData.address}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Contact Info</label>
                                    <input
                                        type="text"
                                        name="contact_info"
                                        className="form-control"
                                        value={formData.contact_info}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary w-100">
                                    Update Store
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-danger w-100 mt-3"
                                    onClick={handleDelete}
                                >
                                    Delete Store
                                </button>
                            </form>
                        ) : (
                            <p className="text-center">No store found.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StoreManagement;
