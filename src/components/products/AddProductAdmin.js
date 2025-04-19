import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddProductAdmin = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = location.state || {};

  const [formData, setFormData] = useState({
    name: '',
    price: ''
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

    const { name, price } = formData;

    if (!name || !price) {
      setError('Please fill all fields.');
      return;
    }

    try {
      const res = await axios.post('http://localhost:5000/api/products/admin', {
        name,
        price,
        quantity: 1,
        user: user._id
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

      setSuccess('Product added successfully!');
      setFormData({ name: '', price: '' });

    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || 'Failed to add product');
    }
  };

  return (
    <div className="container my-4 mt-5 pt-4">
      <div className="row">
        <div className="col-12 col-md-10 col-lg-8 mx-auto">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4">
            <h4 className="text-primary fw-bold mb-2 mb-md-0">
              Add Item for {user.username}
            </h4>
            <button 
              className="btn btn-outline-secondary"
              onClick={() => navigate('/userslist')}
            >
              ← Back to User List
            </button>
          </div>

          {error && <div className="alert alert-danger">{error}</div>}
          {success && <div className="alert alert-success">{success}</div>}

          <form onSubmit={handleSubmit} className="card p-4 shadow-sm bg-light border-0">
            <div className="mb-3">
              <label className="form-label fw-semibold">item Name</label>
              <input
                type="text"
                name="name"
                className="form-control"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter product name"
              />
            </div>

            <div className="mb-4">
              <label className="form-label fw-semibold">Price</label>
              <input
                type="number"
                name="price"
                className="form-control"
                value={formData.price}
                onChange={handleChange}
                placeholder="Enter price"
              />
            </div>

            <button 
              type="submit" 
              className="btn btn-success w-100 fw-semibold"
            >
              Add Item
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProductAdmin;
