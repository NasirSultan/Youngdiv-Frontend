import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

const ProductHistory = () => {
  const [logs, setLogs] = useState([]);
  const [historyList, setHistoryList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalAmount, setTotalAmount] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();
  const userId = location.state?.userId;

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    return date.toLocaleString();
  };

  const fetchLogs = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:5000/api/log/body', { userId }, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const logs = response.data;
      setLogs(logs);

      const grouped = {};

      logs.forEach((log) => {
        const productId = log.product;
        if (!productId) return;

        if (!grouped[productId]) {
          grouped[productId] = {
            add: null,
            delete: null,
            productSnapshot: {},
          };
        }

        if (log.action === 'add') {
          grouped[productId].add = log.timestamp;
          grouped[productId].productSnapshot = log.productSnapshot || {};
        } else if (log.action === 'delete') {
          grouped[productId].delete = log.timestamp;
        }
      });

      const historyArr = Object.entries(grouped).map(([productId, entry]) => {
        const total = entry.productSnapshot?.price || 0; // Changed to sum only individual item price
        return {
          productId,
          name: entry.productSnapshot?.name || 'Unknown',
          price: entry.productSnapshot?.price || 0,
          quantity: entry.productSnapshot?.quantity || 0,
          addDate: entry.add,
          deleteDate: entry.delete,
          total,
          isDeleted: !!entry.delete,
        };
      });

      const total = historyArr.reduce((sum, item) => {
        return !item.isDeleted ? sum + item.total : sum;
      }, 0);

      setHistoryList(historyArr);
      setTotalAmount(total);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching logs:', error);
      setError('Failed to fetch product history. Please try again later.');
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchLogs();
    } else {
      setError('No user ID provided.');
      setLoading(false);
    }
  }, [userId]);

  if (loading) return <p className="text-center mt-5">Loading...</p>;
  if (error) return <p className="text-center mt-5 text-danger">{error}</p>;

  return (
    <div className="container mt-5">
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-4">
        <h3 className="fw-bold mb-2 mb-md-0">Product History</h3>
        <div>
          <button className="btn btn-outline-success btn-sm me-2" onClick={() => setShowModal(true)}>
            Check Total Amount
          </button>
          <button className="btn btn-outline-dark btn-sm" onClick={() => navigate('/getproduct')}>
            Back to Products list
          </button>
        </div>
      </div>

      {historyList.length === 0 ? (
        <p>No product history available.</p>
      ) : (
        <div className="table-responsive d-none d-md-block">
          <div className="d-flex fw-semibold text-muted border-bottom bg-light p-2">
            <div className="col-2 border-end">Product</div>
            <div className="col-2 border-end">Price</div>
            <div className="col-3 border-end">Add Date</div>
            <div className="col-3 border-end">Delete Date</div>
            <div className="col-2">Status</div>
          </div>

          {historyList.map((item) => (
            <div key={item.productId} className="d-flex align-items-center border rounded p-2 mb-2 history-card xm-2">
              <div className="col-2 border-end">{item.name}</div>
              <div className="col-2 border-end">₹{item.price}</div>

              <div className="col-3 border-end">{item.addDate ? formatDate(item.addDate) : '—'}</div>
              <div className="col-3 border-end">
                {item.deleteDate ? formatDate(item.deleteDate) : (
                  <span className="text-success">Not Deleted</span>
                )}
              </div>
              <div className="col-2">
                {item.isDeleted ? (
                  <span className="badge bg-danger">Deleted</span>
                ) : (
                  <span className="badge bg-success">Active</span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Mobile card layout */}
      <div className="d-block d-md-none">
        {historyList.map((item) => (
          <div key={item.productId} className="card mb-3 shadow-sm p-2 rounded-4 border-0 bg-light history-card xm-2">
            <div className="card-body py-3 px-3">
              <h5 className="fw-semibold text-primary mb-2">{item.name}</h5>

              <div className="d-flex justify-content-between mb-2">
                <span className="text-muted">Price</span>
                <span className="fw-semibold text-dark">₹{item.price}</span>
              </div>

              <div className="d-flex justify-content-between mb-2">
                <span className="text-muted">Add </span>
                <span className="text-secondary small">
                  {item.addDate ? formatDate(item.addDate) : '—'}
                </span>
              </div>

              <div className="d-flex justify-content-between mb-2">
                <span className="text-muted">Delete </span>
                <span className="text-secondary small">
                  {item.deleteDate ? formatDate(item.deleteDate) : (
                    <span className="text-success">Not Deleted</span>
                  )}
                </span>
              </div>

              <div className="d-flex justify-content-between align-items-center mt-2">
                <span className="text-muted">Status</span>
                {item.isDeleted ? (
                  <span className="badge bg-danger px-3 py-1">Deleted</span>
                ) : (
                  <span className="badge bg-success px-3 py-1">Active</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for total amount */}
      {showModal && (
        <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content text-center">
              <div className="modal-header">
                <h5 className="modal-title w-100">Total Amount</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                <h2 className="text-success">₹{totalAmount}</h2>
              </div>
              <div className="modal-footer justify-content-center">
                <button className="btn btn-secondary" onClick={() => setShowModal(false)}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Hover styling */}
      <style jsx="true">{`
        .history-card {
          transition: transform 0.2s ease, box-shadow 0.3s ease;
        }
        .history-card:hover {
          transform: scale(1.02);
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
          background-color: #f9f9f9;
        }
        .xm-2 {
          margin: 2px;
        }
      `}</style>
    </div>
  );
};

export default ProductHistory;
