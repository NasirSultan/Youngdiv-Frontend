import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  // Importing useNavigate for routing

const AddAmountByTopUser = () => {
  const [topUser, setTopUser] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loadingDetails, setLoadingDetails] = useState(false);
  const navigate = useNavigate();  // Use the navigate hook for navigation

  useEffect(() => {
    const fetchAndFindTopUser = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error('No authentication token found!');
          return;
        }

        const response = await axios.get('http://localhost:5000/api/log/payment', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const logs = response.data.logs;
        const groupedByUser = {};

        logs.forEach(log => {
          if (log.action === 'add') {
            const { user, productSnapshot } = log;
            const { price, quantity } = productSnapshot || {};

            if (price != null && quantity != null) {
              const total = price * quantity;
              if (!groupedByUser[user]) {
                groupedByUser[user] = {
                  amounts: [],
                  total: 0,
                };
              }

              groupedByUser[user].amounts.push(total);
              groupedByUser[user].total += total;
            }
          }
        });

        const topUserId = Object.keys(groupedByUser).reduce((a, b) =>
          groupedByUser[a].total > groupedByUser[b].total ? a : b
        );

        setTopUser({ userId: topUserId, ...groupedByUser[topUserId] });

      } catch (error) {
        console.error('Error fetching logs:', error);
      }
    };

    fetchAndFindTopUser();
  }, []);

  const fetchUserDetails = async (userId) => {
    try {
      setLoadingDetails(true);
      const token = localStorage.getItem('token');

      const res = await axios.post(`http://localhost:5000/api/auth/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUserDetails(res.data);
      setShowModal(true);
    } catch (err) {
      console.error('Error fetching user details:', err);
    } finally {
      setLoadingDetails(false);
    }
  };

  const formatINR = amount =>
    new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 2,
    }).format(amount);

  const handleGoBack = () => {
    navigate(-1);  // Navigate to the previous page
  };

  return (
    <div className="container mt-5">
      <h3 className="text-center mb-4 pt-3 ">User with Top Contribution</h3>

      {topUser ? (
        <div className="mb-4 p-4 shadow rounded-4 bg-light">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <p className="text-success fw-bold">
              Total: {formatINR(topUser.total)}
            </p>

            {/* Combined Buttons for Mobile and Desktop */}
            <div className="d-flex gap-2">
              <button onClick={handleGoBack} className="btn btn-outline-secondary">
                Go Back
              </button>
              <button
                onClick={() => fetchUserDetails(topUser.userId)}
                className="btn btn-outline-primary"
              >
                {loadingDetails ? 'Fetching...' : 'Get User Details'}
              </button>
            </div>
          </div>

          <ul className="list-group mb-3">
            {topUser.amounts.map((price, index) => (
              <li key={index} className="list-group-item custom-row">
                {formatINR(price)}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="text-center">Loading...</p>
      )}

      {/* Modal */}
      {showModal && userDetails && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h4 className="mb-3">User Details</h4>
            <p><strong></strong> {userDetails.username}</p>
            <p><strong></strong> {userDetails.email}</p>
            <p><strong></strong>+{userDetails.number}</p>
            
            <button className="btn btn-danger mt-3" onClick={() => setShowModal(false)}>
              Close
            </button>
          </div>
        </div>
      )}

      {/* Modal and Mobile-responsive CSS */}
      <style>
        {`
          .modal-overlay {
            position: fixed;
            top: 0; left: 0; right: 0; bottom: 0;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 9999;
          }

          .modal-content {
            background: white;
            padding: 2rem;
            border-radius: 16px;
            max-width: 400px;
            width: 90%;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
            text-align: center;
          }

          .custom-row {
            background-color: #f1f9ff;
            border-radius: 8px;
            margin-bottom: 10px;
            padding: 10px;
            border: 1px solid #d0e7ff;
            transition: background-color 0.3s ease, transform 0.3s ease;
          }

          .custom-row:hover {
            background-color: #e5f2ff;
            transform: translateY(-5px);  /* Slightly lift on hover */
          }

          .btn-outline-primary:hover {
            background-color: #e3f2ff;
            border-color: #007bff;
          }

          .btn-outline-secondary {
            border-color: #d1d8e3;
            color: #6c757d;
          }

          .btn-outline-secondary:hover {
            background-color: #f1f9ff;
            color: #007bff;
          }

          /* Media Queries for responsiveness */
          @media (max-width: 768px) {
            .container {
              padding: 15px;
            }

            .d-flex {
              flex-direction: column;
              gap: 10px;
            }

            .btn-outline-secondary, .btn-outline-primary {
              width: 100%;
            }

            .custom-row {
              font-size: 14px;
              padding: 8px;
            }

            .modal-content {
              padding: 1rem;
            }

            h3 {
              font-size: 1.5rem;
            }
          }
        `}
      </style>
    </div>
  );
};

export default AddAmountByTopUser;
