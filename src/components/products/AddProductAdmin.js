import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddProductAdmin = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = location.state || {};

  const [formData, setFormData] = useState({
    name: '',
    price: '',
    quantity: ''
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  if (!user) {
    return <div className="text-center text-danger mt-5">No user selected.</div>;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const { name, price, quantity } = formData;

    if (!name || !price || !quantity) {
      setError('Please fill all fields.');
      return;
    }

    try {
      const res = await axios.post('http://localhost:5000/api/products/admin', {
        name,
        price,
        quantity,
        user: user._id
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

      setSuccess('Product added successfully!');
      setFormData({ name: '', price: '', quantity: '' });

    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || 'Failed to add product');
    }
  };

  return (
    <div className="container my-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="text-primary">Add Product for {user.username}</h3>
        <button className="btn btn-outline-secondary" onClick={() => navigate('/admin')}>
          ← Back to User List
        </button>
      </div>

      {/* Alerts */}
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      <form onSubmit={handleSubmit} className="card p-4 shadow-sm">
        <div className="mb-3">
          <label className="form-label">Product Name</label>
          <input
            type="text"
            name="name"
            className="form-control"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter product name"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Price</label>
          <input
            type="number"
            name="price"
            className="form-control"
            value={formData.price}
            onChange={handleChange}
            placeholder="Enter price"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Quantity</label>
          <input
            type="number"
            name="quantity"
            className="form-control"
            value={formData.quantity}
            onChange={handleChange}
            placeholder="Enter quantity"
          />
        </div>

        <button type="submit" className="btn btn-success w-100">Add Product</button>
      </form>
    </div>
  );
};

export default AddProductAdmin;
