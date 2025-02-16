import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const ManageProduct = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState({
        name: "",
        price: 0,
        quantity: 0,
        expiry_date: ""
    });

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`http://localhost:8000/api/products/${id}`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch product");
                }

                const data = await response.json();
                setProduct(data);
            } catch (error) {
                console.error("Error fetching product:", error);
            }
        };

        fetchProduct();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct((prevProduct) => ({
            ...prevProduct,
            [name]: value,
        }));
    };

    const updateProduct = async (updatedData) => {
        try {
            const response = await fetch(`http://localhost:8000/api/products/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify(updatedData),
            });

            if (response.ok) {
                setProduct(updatedData);
            } else {
                alert("Error updating product");
            }
        } catch (error) {
            console.error("Error updating product:", error);
        }
    };

    const adjustQuantity = (amount) => {
        const newQuantity = Math.max(0, product.quantity + amount);
        const newPrice = product.price * (newQuantity / product.quantity || 1);

        const updatedProduct = { ...product, quantity: newQuantity, price: newPrice };
        updateProduct(updatedProduct);
    };

    const handleDelete = async () => {
        if (!window.confirm("Are you sure you want to delete this product?")) return;
        try {
            const response = await fetch(`http://localhost:8000/api/products/${id}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            });

            if (response.ok) {
                alert("Product deleted successfully!");
                navigate("/products");
            } else {
                alert("Error deleting product");
            }
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    };

    if (!product) return <p className="text-center mt-5">Loading...</p>;

    return (
        <div className="container mt-5">
            <div className="card shadow p-4">
                <h2 className="text-center mb-4">Manage Product</h2>
                <form>
                    <div className="mb-3">
                        <label className="form-label">Product Name</label>
                        <input type="text" className="form-control" name="name" value={product.name || ""} readOnly />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Price</label>
                        <input type="number" className="form-control" name="price" value={product.price || 0} readOnly />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Quantity</label>
                        <div className="input-group">
                            <button type="button" className="btn btn-danger" onClick={() => adjustQuantity(-1)}>-</button>
                            <input type="number" className="form-control text-center" value={product.quantity || 0} readOnly />
                            <button type="button" className="btn btn-success" onClick={() => adjustQuantity(1)}>+</button>
                        </div>
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Expiry Date</label>
                        <input type="date" className="form-control" name="expiry_date" value={product.expiry_date || ""} readOnly />
                    </div>
                </form>

                <div className="d-flex justify-content-between mt-3">
                    <button onClick={handleDelete} className="btn btn-danger w-50 me-2">Delete Product</button>
                    <button onClick={() => navigate("/products")} className="btn btn-secondary w-50">Back to Products</button>
                </div>
            </div>
        </div>
    );
};

export default ManageProduct;
