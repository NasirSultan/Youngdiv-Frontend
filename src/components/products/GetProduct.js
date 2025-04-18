import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const GetProduct = () => {
  const [products, setProducts] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showTotal, setShowTotal] = useState(false);
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

  const handleDelete = async (productId) => {
    const confirm = window.confirm('Are you sure you want to delete this product?');
    if (!confirm) return;

    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/products/${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchProducts(); // Refresh data
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Failed to delete product');
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) return <p className="text-center mt-5">Loading...</p>;

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="fw-bold">My Products</h3>
        <div>
        <button
    className="btn btn-outline-dark btn-sm"
    onClick={() => navigate('/ProductHistory')}
  >
    View Add/Delete History
  </button>
  <button className="btn btn-outline-dark btn-sm mx-2"     onClick={() => navigate('/user')}>
            Back to Dashboard
          </button>
        </div>
      </div>

      {showTotal ? (
        <div className="text-center mt-4">
          
          <div className="card shadow-sm p-4 mx-auto" style={{ maxWidth: '300px' }}>
            <h5>Total Amount of All Products</h5>
            <p className="h4 text-success">${totalAmount}</p>
            <button className="btn btn-secondary btn-sm mt-3" onClick={() => setShowTotal(false)}>
              Back to Products
            </button>
        
        
        
          </div>
        
          
        </div>
      ) : products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div className="border rounded">
          {/* Header Row */}
          <div className="d-flex fw-semibold text-muted border-bottom bg-light p-2">
            <div className="col-3 border-end">Product</div>
            <div className="col-2 border-end">Price</div>
            <div className="col-2 border-end">Quantity</div>
            <div className="col-2 border-end">Total</div>
            <div className="col-2 ">Action</div>
          </div>

          {/* Product Rows */}
          {products.map((product) => (
            <div key={product._id} className="d-flex align-items-center border-bottom p-2">
              <div className="col-3 border-end">{product.name}</div>
              <div className="col-2 border-end">${product.price}</div>
              <div className="col-2 border-end">{product.quantity}</div>
              <div className="col-2 border-end">${product.price * product.quantity}</div>
              <div className="col-3  text-center">
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(product._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GetProduct;
