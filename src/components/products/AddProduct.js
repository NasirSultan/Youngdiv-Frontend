import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [alert, setAlert] = useState({ message: '', type: '' });

  const navigate = useNavigate();

  const handleAddProduct = async (e) => {
    e.preventDefault();

    if (!name || !price) {
      setAlert({ message: 'Please fill in all fields.', type: 'error' });
      return;
    }

    const parsedPrice = parseFloat(price);
    const quantity = 1; // Default quantity
    const totalAmount = parsedPrice * quantity;

    try {
      const token = localStorage.getItem('token');

      const response = await axios.post(
        'http://localhost:5000/api/products',
        { name, price: parsedPrice, quantity },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setAlert({
        message: `Product added successfully!`,
        type: 'success',
      });

      // Clear input fields
      setName('');
      setPrice('');
    } catch (err) {
      console.error(err);
      setAlert({ message: 'Failed to add product. Please try again.', type: 'error' });
    }
  };

  const goToDashboard = () => {
    navigate('/user');
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <div className="card shadow-lg rounded-4">
            <div className="card-body">
              <h2 className="card-title text-center mb-4 fw-bold text-black">Add New Product</h2>

              {alert.message && (
                <div
                  className={`alert ${
                    alert.type === 'success' ? 'alert-success' : 'alert-danger'
                  }`}
                  role="alert"
                >
                  {alert.message}
                </div>
              )}

              <form onSubmit={handleAddProduct}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Product Name</label>
                  <input
                    type="text"
                    id="name"
                    className="form-control"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. iPhone 14 Pro"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="price" className="form-label">Price ($)</label>
                  <input
                    type="number"
                    id="price"
                    className="form-control"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="e.g. 999"
                    required
                    min="1"
                  />
                </div>

                <div className="d-grid gap-2">
                  <button type="submit" className="btn btn-dark text-light">
                    Add Product
                  </button>
                  <button type="button" className="btn btn-outline-secondary" onClick={goToDashboard}>
                    Go Back to Dashboard
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
