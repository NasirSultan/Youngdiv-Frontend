import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const AdminProductList = () => {
    const { storeId } = useParams(); // Get store ID from URL
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(`http://localhost:8000/api/products?store_id=${storeId}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch products");
                }

                const data = await response.json();
                setProducts(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [storeId]);

    return (
        <div className="container mt-5">
            <h2 className="text-primary">Product List</h2>
            <p>Showing products for Store ID: {storeId}</p>

            {loading ? (
                <p>Loading products...</p>
            ) : error ? (
                <p className="text-danger">Error: {error}</p>
            ) : products.length > 0 ? (
                <div className="card shadow p-4">
                    <h4 className="mb-3">Available Products</h4>
                    <table className="table table-striped">
                        <thead className="table-dark">
                            <tr>
                                <th>Name</th>
                                <th>Total Price</th>
                                <th>Quantity</th>
                                <th>Expiry Date</th>
                                <th>Remaining Days</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product) => (
                                <tr key={product.id}>
                                    <td>{product.name}</td>
                                    <td>${product.price}</td>
                                    <td>{product.quantity}</td>
                                    <td>{product.expiry_date}</td>
                                    <td>{product.remaining_days}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p>No products found.</p>
            )}
        </div>
    );
};

export default AdminProductList;
