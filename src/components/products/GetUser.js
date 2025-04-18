import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const GetUsers = () => {
  const [usersData, setUsersData] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/products/getuser', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setUsersData(res.data);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch users');
      }
    };

    fetchUsers();
  }, []);

  const handleBack = () => {
    navigate('/admin');
  };

  const handleAddProduct = (user) => {
    navigate('/admin/addproduct', { state: { user } });
  };

  const handleViewDetails = (userId) => {
    navigate('/admin/userproducts', { state: { userId } });
  };

  return (
    <div className="container my-5">
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap p-3 bg-light rounded shadow-sm">
        <h2 className="text-primary m-0">User List</h2>
        <button className="btn btn-outline-primary mt-2 mt-md-0" onClick={handleBack}>
          ← Back to Admin Dashboard
        </button>
      </div>

      {error && (
        <div className="alert alert-danger text-center">{error}</div>
      )}

      {usersData.length > 0 ? (
        <div className="row">
          <div className="col-12 d-none d-lg-block mb-2">
            <div className="row fw-bold">
              <div className="col-md-3">Name</div>
              <div className="col-md-3">Email</div>
              <div className="col-md-2">Number</div>
              <div className="col-md-4">Actions</div>
            </div>
          </div>

          {usersData.map(user => (
            <div className="col-12 col-md-6 col-lg-12 mb-3" key={user._id}>
              <div className="card shadow-sm border-0">
                <div className="card-body">
                  <div className="row text-center text-md-start align-items-center">
                    <div className="col-12 col-md-3 mb-2 mb-md-0">
                      <strong>{user.username}</strong>
                    </div>
                    <div className="col-12 col-md-3 mb-2 mb-md-0">
                      <small>{user.email}</small>
                    </div>
                    <div className="col-12 col-md-2 mb-2 mb-md-0">
                      <small>{user.number || 'N/A'}</small>
                    </div>
                    <div className="col-12 col-md-4">
                      <div className="d-flex flex-column flex-md-row gap-2 justify-content-md-start">
                        <button
                          className="btn btn-sm btn-success"
                          onClick={() => handleAddProduct(user)}
                        >
                          Add Product
                        </button>
                        <button
                          className="btn btn-sm btn-info"
                          onClick={() => handleViewDetails(user._id)}
                        >
                          View Details
                        </button>
                        <button
                          className="btn btn-sm btn-warning"
                          onClick={() => navigate('/admin/user-history', { state: { userId: user._id } })}
                        >
                          View History
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-muted mt-5">No user records found.</div>
      )}
    </div>
  );
};

export default GetUsers;
