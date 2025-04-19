import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const GetProduct = () => {
  const [products, setProducts] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showTotal, setShowTotal] = useState(false);
  const [hoveredProductId, setHoveredProductId] = useState(null); // To track hover state
  const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/products/my', {
        headers: { Authorization: `Bearer ${token}` },
      });

      setProducts(response.data.products);
      setTotalAmount(response.data.totalAmount || 0);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching products:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const formatDate = (date) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  const formatPriceInINR = (price) => {
    // Format the price to show in INR with two decimal places
    return `₹${price.toFixed(2)}`;
  };

  if (loading) return <p className="text-center mt-5">Loading...</p>;

  // Sort products by `createdAt` in descending order
  const sortedProducts = [...products].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return (
    <div className="container bg-light  rounded shadow-sm mt-5 pt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="fw-bold">Items</h3>
        <div>
          <button
            className="btn btn-outline-dark btn-sm d-none d-md-inline"
            onClick={() => navigate('/user')}
          >
            Back to Dashboard
          </button>
        </div>
      </div>

      {showTotal ? (
        <div className="text-center mt-4">
          <div className="card shadow-sm p-4 mx-auto" style={{ maxWidth: '300px' }}>
            <h5>Total Amount of All Products</h5>
            <p className="h4 text-success">{formatPriceInINR(totalAmount)}</p>
            <button className="btn btn-secondary btn-sm mt-3" onClick={() => setShowTotal(false)}>
              Back to Products
            </button>
          </div>
        </div>
      ) : products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div>
          {/* Header Row */}
          <div className="d-flex fw-semibold text-muted bg-white p-2 border-bottom mb-2">
            <div className="col-4">Name</div>
            <div className="col-4">Price</div>
            <div className="col-4 text-center">Date </div>
          </div>

          {/* Product Rows */}
          {sortedProducts.map((product) => (
            <div
              key={product._id}
              className="d-flex align-items-center p-2 mb-2 rounded"
              style={{
                backgroundColor: hoveredProductId === product._id ? '#c8e6c9' : '#e3f2fd', // Change color on hover
                cursor: 'pointer', // Show pointer cursor on hover
              }}
              onMouseEnter={() => setHoveredProductId(product._id)} // Set hover state
              onMouseLeave={() => setHoveredProductId(null)} // Reset hover state
            >
              <div className="col-4">{product.name}</div>
              <div className="col-4">{formatPriceInINR(product.price)}</div> {/* Display price in INR */}
              <div className="col-4 text-center">{formatDate(product.createdAt)}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GetProduct;
