import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ArrowUpCircle, ArrowDownCircle } from 'lucide-react';

const ProductHistory = () => {
  const [logs, setLogs] = useState([]);
  const [historyList, setHistoryList] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    return date.toLocaleDateString();
  };

  const formatINR = (amount) =>
    new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 2,
    }).format(amount);

  const fetchLogs = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/log/product', {
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

      const historyArr = Object.entries(grouped).map(([productId, entry]) => ({
        productId,
        name: entry.productSnapshot?.name || 'Unknown',
        price: entry.productSnapshot?.price || 0,
        addDate: entry.add,
        deleteDate: entry.delete,
        isDeleted: !!entry.delete,
        action: entry.delete ? 'Delete' : 'Add',
      }));

      setHistoryList(historyArr);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching logs:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  if (loading) return <p className="text-center mt-5">Loading...</p>;

  return (
    <div className="container mt-5 pt-4 my-5">
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-4">
        <h3 className="fw-bold mb-2 mb-md-0 text-primary mx-3"> History</h3>
        <button
          className="btn btn-outline-dark btn-sm d-none d-md-inline-block"
          onClick={() => navigate('/getproduct')}
        >
          Back to Products list
        </button>
      </div>

      {historyList.length === 0 ? (
        <p>No product history available.</p>
      ) : (
        <>
          {/* Desktop Table */}
          <div className="table-responsive d-none d-md-block">
            <div className="d-flex fw-semibold text-muted border-bottom bg-light p-2 small mb-2">
              <div className="col-3 border-end">Product</div>
              <div className="col-2 border-end">Price</div>
              <div className="col-2 border-end">Add Date</div>
              <div className="col-2 border-end">Delete Date</div>
              <div className="col-3 text-center">Action</div>
            </div>

            {historyList.map((item) => (
              <div
                key={item.productId}
                className="d-flex align-items-center px-2 py-1 mb-2 small hover-card"
                style={{
                  backgroundColor: '#e3f2fd',
                  borderRadius: '10px',
                }}
              >
                <div className="col-3 border-end text-primary fw-semibold d-flex align-items-center gap-2">
                  {item.action === 'Add' ? (
                    <ArrowUpCircle size={16} className="text-success" />
                  ) : (
                    <ArrowDownCircle size={16} className="text-danger" />
                  )}
                  {item.name}
                </div>
                <div className="col-2 border-end">{formatINR(item.price)}</div>
                <div className="col-2 border-end">{item.addDate ? formatDate(item.addDate) : '—'}</div>
                <div className="col-2 border-end">
                  {item.deleteDate ? formatDate(item.deleteDate) : (
                    <span className="text-success">Not Deleted</span>
                  )}
                </div>
                <div className="col-3 text-center">
                  {item.action === 'Add' ? (
                    <span className="badge bg-success">Add</span>
                  ) : (
                    <span className="badge bg-danger">Delete</span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Mobile Cards */}
          <div className="d-block d-md-none">
            {historyList.map((item) => (
              <div
                key={item.productId}
                className="card mb-3 shadow-sm p-2 rounded-4 border-0 hover-card"
                style={{ backgroundColor: '#e3f2fd' }}
              >
                <div className="card-body py-3 px-3">
                  <h5 className="fw-semibold text-primary mb-2">{item.name}</h5>

                  <div className="d-flex justify-content-between mb-2">
                    <span className="text-muted">Price</span>
                    <span className="fw-semibold">{formatINR(item.price)}</span>
                  </div>

                  <div className="d-flex justify-content-between mb-2">
                    <span className="text-muted">Add Date</span>
                    <span className="text-secondary small">
                      {item.addDate ? formatDate(item.addDate) : '—'}
                    </span>
                  </div>

                  <div className="d-flex justify-content-between mb-2">
                    <span className="text-muted">Delete Date</span>
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
        </>
      )}

      {/* Hover styles */}
      <style jsx="true">{`
        .hover-card {
          transition: transform 0.2s ease, box-shadow 0.3s ease;
        }
        .hover-card:hover {
          transform: scale(1.01);
          box-shadow: 0 6px 14px rgba(0, 0, 0, 0.08);
          background-color: #d0eafc;
        }
      `}</style>
    </div>
  );
};

export default ProductHistory;
