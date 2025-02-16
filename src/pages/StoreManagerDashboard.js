import React, { useEffect, useState } from "react";
import { getStores } from "../services/api"; // Import getStores function
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faPhoneAlt, faStore } from '@fortawesome/free-solid-svg-icons';

const StoreManagerDashboard = () => {
    const [stores, setStores] = useState([]);
    const [error, setError] = useState("");
    const [filters, setFilters] = useState({
        name: "",
        address: "",
        contact_info: "",
    });

    const [role, setRole] = useState(""); // Store user role (admin/store_manager)

    useEffect(() => {
        const fetchStores = async () => {
            const token = localStorage.getItem("token");

            if (!token) {
                setError("Unauthorized! Please login again.");
                return;
            }

            try {
                // Get user info to determine the role (for conditional rendering)
                const user = JSON.parse(localStorage.getItem("user"));
                setRole(user?.role || "");

                const result = await getStores(token, filters);

                if (Array.isArray(result) && result.length > 0) {
                    setStores(result);
                    setError(""); 
                } else {
                    setStores([]);
                    setError(result.message || "No stores found.");
                }
            } catch (error) {
                setError(error.message || "Failed to fetch stores.");
            }
        };

        fetchStores();
    }, [filters]); 

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters({
            ...filters,
            [name]: value,
        });
    };

    return (
        <div className="container mt-5" style={{ maxWidth: '80%' }}>
            <h2 className="text-center mb-4 text-primary" style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>
                <FontAwesomeIcon icon={faStore} className="me-2" /> Store Manager Dashboard
            </h2>

            {error && <div className="alert alert-danger">{error}</div>}

            {role === "admin" && (
                <div className="mb-4">
                    <h4 className="text-center text-secondary mb-3" style={{ fontSize: '1.2rem' }}>Filter Stores</h4>
                    <div className="d-flex justify-content-center gap-3">
                        <input
                            type="text"
                            name="name"
                            placeholder="Filter by Name"
                            value={filters.name}
                            onChange={handleFilterChange}
                            className="form-control w-25"
                        />
                        <input
                            type="text"
                            name="address"
                            placeholder="Filter by Address"
                            value={filters.address}
                            onChange={handleFilterChange}
                            className="form-control w-25"
                        />
                        <input
                            type="text"
                            name="contact_info"
                            placeholder="Filter by Contact"
                            value={filters.contact_info}
                            onChange={handleFilterChange}
                            className="form-control w-25"
                        />
                    </div>
                </div>
            )}

            {stores.length > 0 ? (
                <>
                    <div className="d-flex justify-content-center align-items-center mb-4"
                        style={{
                            background: "linear-gradient(135deg, #f8fafc, #e0f2fe)", 
                            border: "1px solid #d1d5db",
                            borderRadius: "8px",
                            padding: "10px 20px",
                            transition: "all 0.3s ease-in-out",
                            cursor: "pointer"
                        }}
                        onMouseOver={(e) => e.currentTarget.style.background = "#dbeafe"} 
                        onMouseOut={(e) => e.currentTarget.style.background = "linear-gradient(135deg, #f8fafc, #e0f2fe)"}
                    >
                        <h4 className="text-center text-black fw-bold d-flex align-items-center gap-2 m-2" style={{ fontSize: '2.2rem' }}>
                            My Store
                        </h4>
                    </div>

                    <div className="row justify-content-center">
                        {stores.map((store) => (
                            <div key={store.id} className="col-md-8 mb-4">
                                <div className="card shadow-lg border-light" style={{ transition: 'transform 0.3s ease-in-out' }}>
                                    <div className="card-body p-4">
                                        <h5 className="card-title text-black text-center mb-3" style={{ fontSize: '1.8rem', fontWeight: '600' }}>
                                            {store.name}
                                        </h5>
                                        <p className="card-text text-center mb-3 p-2"
                                            style={{
                                                fontSize: '1.3rem',
                                                fontWeight: '500',
                                                backgroundColor: '#f3f4f6',
                                                borderRadius: '8px',
                                                border: '1px solid #d1d5db',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                gap: '8px',
                                                boxShadow: '2px 2px 10px rgba(0,0,0,0.1)',
                                                transition: 'all 0.3s ease-in-out'
                                            }}
                                            onMouseOver={(e) => e.currentTarget.style.background = "#e0f2fe"} 
                                            onMouseOut={(e) => e.currentTarget.style.background = "#f3f4f6"}
                                        >
                                            <FontAwesomeIcon icon={faMapMarkerAlt} className="text-danger" style={{ fontSize: '1.5rem' }} />
                                            <span style={{ color: '#1e3a8a' }}>{store.address}</span>
                                        </p>

                                        <p className="card-text text-center mb-3 p-2"
                                            style={{
                                                fontSize: '1.3rem',
                                                fontWeight: '500',
                                                backgroundColor: '#f3f4f6',
                                                borderRadius: '8px',
                                                border: '1px solid #d1d5db',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                gap: '8px',
                                                boxShadow: '2px 2px 10px rgba(0,0,0,0.1)',
                                                transition: 'all 0.3s ease-in-out'
                                            }}
                                            onMouseOver={(e) => e.currentTarget.style.background = "#e0f2fe"} 
                                            onMouseOut={(e) => e.currentTarget.style.background = "#f3f4f6"}
                                        >
                                            <FontAwesomeIcon icon={faPhoneAlt} className="text-success" style={{ fontSize: '1.5rem' }} />
                                            <span style={{ color: '#1e3a8a' }}>{store.contact_info}</span>
                                        </p>

                                        <div className="d-flex justify-content-between">
                                            <Link to={`/update`} className="btn btn-warning" style={{ width: '33%' }}>
                                                Operation
                                            </Link>
                                            <Link to={`/products`} className="btn btn-info" style={{ width: '33%' }}>
                                                Product List
                                            </Link>
                                            <Link to={`/StoreOrders`} className="btn btn-primary" style={{ width: '33%' }}
                                                onClick={() => localStorage.setItem("store_name", store.name)}
                                            >
                                                Check Orders
                                            </Link>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            ) : (
                <div className="text-center mt-4">
                    <Link to="/create-store" className="btn btn-success">
                        + Create Store
                    </Link>
                </div>
            )}
        </div>
    );
};

export default StoreManagerDashboard;
