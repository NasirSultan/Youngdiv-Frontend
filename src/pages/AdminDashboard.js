import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
    const [stores, setStores] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchStores = async () => {
            try {
                const response = await fetch("http://localhost:8000/api/stores", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch stores");
                }

                const data = await response.json();
                setStores(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchStores();
    }, []);

    return (
        <div className="container mt-5">
           
            <p> Check stores and products here.</p>

            {loading ? (
                <p>Loading stores...</p>
            ) : error ? (
                <p className="text-danger">Error: {error}</p>
            ) : stores.length > 0 ? (
                <div className="card shadow p-4">
                    <h4 className="mb-3">All Stores</h4>
                    <table className="table table-striped">
                        <thead className="table-dark">
                            <tr>
                                <th>Name</th>
                                <th>Address</th>
                                <th>Contact Info</th>
                                <th>Created At</th>
                                <th>Actions</th> {/* New Column for Product Link */}
                            </tr>
                        </thead>
                        <tbody>
                            {stores.map((store) => (
                                <tr key={store.id}>
                                    <td>{store.name}</td>
                                    <td>{store.address}</td>
                                    <td>{store.contact_info}</td>
                                    {/* Display only the date */}
                                    <td>{new Date(store.created_at).toLocaleDateString()}</td>
                                    <td>
                                        <button
                                            className="btn btn-primary btn-sm"
                                            onClick={() => navigate(`/stores/${store.id}/products`)}
                                        >
                                            View Products
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p>No stores available.</p>
            )}
        </div>
    );
};

export default AdminDashboard;
