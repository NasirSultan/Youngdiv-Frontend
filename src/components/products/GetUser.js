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

  const handleAddProduct = (user) => {
    navigate('/admin/addproduct', { state: { user } });
  };

  const handleViewDetails = (userId) => {
    navigate('/admin/userproducts', { state: { userId } });
  };

  return (
    <div className="container mt-5 pt-4 my-5">
      <div className="mx-auto px-2 px-md-4" style={{ maxWidth: '1100px' }}>
        <div className="d-flex justify-content-between align-items-center flex-column flex-md-row m-3">
          <h2 className="text-center text-md-start m-0 fs-4 fs-md-3">Users List</h2>
          <button
            className="btn btn-success btn-sm mt-2 mt-md-0 mx-4"
            onClick={() => navigate('/admin')}
          >
            Highest Contributor
          </button>
          <button
            className="btn btn-info btn-sm mt-2 mt-md-0 mx-4"
            onClick={() => navigate('/register')}
          >
            Register User
          </button>
        </div>

        {error && <div className="alert alert-danger text-center">{error}</div>}

        {usersData.length > 0 ? (
          <div className="row">
            <div className="col-12 d-none d-lg-block mb-2">
              <div className="row fw-bold px-2 small">
                <div className="col-md-3">Name</div>
                <div className="col-md-3">Email</div>
                <div className="col-md-2">Number</div>
                <div className="col-md-4">Actions</div>
              </div>
            </div>

            {usersData.map(user => (
              <div className="col-12 col-md-6 col-lg-12 mb-3" key={user._id}>
                <div className="card border-0 bg-light shadow-sm user-card h-100">
                  <div className="card-body py-3">
                    <div className="row text-center text-md-start align-items-center small">
                      <div className="col-12 col-md-3 mb-2 mb-md-0 fw-semibold">
                        {user.username}
                      </div>
                      <div className="col-12 col-md-3 mb-2 mb-md-0">
                        <small>{user.email}</small>
                      </div>
                      <div className="col-12 col-md-2 mb-2 mb-md-0">
                        <small> +{user.number || 'N/A'}</small>
                      </div>
                      <div className="col-12 col-md-4">
                        <div className="d-flex flex-nowrap justify-content-center gap-2 action-btn-row">
                          <button
                            className="btn btn-sm btn-success flex-shrink-0"
                            onClick={() => handleAddProduct(user)}
                          >
                            Add Item
                          </button>
                          <button
                            className="btn btn-sm btn-info flex-shrink-0"
                            onClick={() => handleViewDetails(user._id)}
                          >
                            Details
                          </button>
                          <button
                            className="btn btn-sm btn-warning flex-shrink-0"
                            onClick={() => navigate('/admin/user-history', { state: { userId: user._id } })}
                          >
                            History
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

      {/* Styles */}
      <style jsx="true">{`
        /* Default Light Mode */
        body {
          --text-color: #000;
          --background-color: #fff;
        }

        /* Dark Mode */
        body.dark-mode {
          --text-color: #fff;
          --background-color: #333;
        }

        .user-card {
          transition: transform 0.2s, box-shadow 0.2s;
          color: var(--text-color); /* Dynamic text color */
          background-color: var(--background-color); /* Dynamic background color */
        }
        
        .user-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
        }

        .action-btn-row::-webkit-scrollbar {
          display: none;
        }
        
        .action-btn-row {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        @media (min-width: 992px) {
          .user-card .card-body {
            font-size: 0.9rem;
          }
        }
      `}</style>
    </div>
  );
};

export default GetUsers;
