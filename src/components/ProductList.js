import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS

const ProductList = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8000/api/products", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        })
            .then((res) => res.json())
            .then((data) => setProducts(data))
            .catch((error) => console.error("Error fetching products:", error));
    }, []);

    return (
        <div className="container mt-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="text-primary">Product List</h2>
                <div>
                    <Link to="/products/create" className="btn btn-success me-2">Add Product</Link>
                    <Link to="/store" className="btn btn-info">Go to Store</Link>
                </div>
            </div>

            <div className="card shadow p-4">
                <table className="table table-striped">
                    <thead className="table-dark">
                        <tr>
                            
                            <th>Name</th>
                            <th>Per quantity Price</th>
                            <th>Total Price</th>
                            <th>Quantity</th>
                            <th>Expiry Date</th>
                            <th>Remaining Days</th>
                            <th className="text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.length > 0 ? (
                            products.map((product, index) => (
                                <tr key={product.id}>
                                 
                                    <td>{product.name}</td>
                                    <td>${product.single_quantity_price.toFixed(2)}</td>
                                    <td>${product.price}</td>
                                    <td>{product.quantity}</td>
                                    <td>{product.expiry_date}</td>
                                    <td>{product.remaining_days}</td>
                                    <td className="text-center">
                                        <Link to={`/products/manage/${product.id}`} className="btn btn-warning text-center btn-sm me-2">
                                           Operation
                                        </Link>
                                      
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="text-center">No products available</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ProductList;
