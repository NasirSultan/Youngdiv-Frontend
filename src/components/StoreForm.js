import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateStore = () => {
    const [formData, setFormData] = useState({
        name: "",
        address: "",
        contact_info: "",
    });

    const navigate = useNavigate(); // Hook for redirection
    const authToken = localStorage.getItem("token"); // Retrieve auth token

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!authToken) {
            alert("You are not authenticated. Please log in.");
            return;
        }

        try {
            const response = await fetch("http://127.0.0.1:8000/api/stores", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${authToken}`,
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            const data = await response.json();
            alert("Store created successfully!");

            // Reset form
            setFormData({
                name: "",
                address: "",
                contact_info: "",
            });

            // Redirect to the stores list page
            navigate("/store");
        } catch (error) {
            console.error("There was a problem with the fetch operation:", error);
            alert("Failed to create store. Please try again.");
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow-lg p-4">
                        <h2 className="text-center mb-4">Create Store</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label className="form-label">Name:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Address:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Contact Info:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="contact_info"
                                    value={formData.contact_info}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <button type="submit" className="btn btn-primary w-100">
                                Create Store
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateStore;
