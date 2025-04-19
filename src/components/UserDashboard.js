import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { format, subDays } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { ArrowUpCircle, ArrowDownCircle } from 'lucide-react'; // If using Lucide
const ProductHistory = () => {
  const [addActions, setAddActions] = useState([]);
  const [deleteActions, setDeleteActions] = useState([]);
  const [totalPaid, setTotalPaid] = useState(0);
  const [remainingBalance, setRemainingBalance] = useState(0);
  const navigate = useNavigate();
  const fetchLogs = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/log/product', {
        headers: { Authorization: `Bearer ${token}` },
      });

      const logs = response.data;

      const twoDaysAgo = subDays(new Date(), 2);

      const recentActions = logs
        .filter((log) => new Date(log.timestamp) >= twoDaysAgo)
        .map((log) => {
          const amount = (log.productSnapshot?.price || 0) * (log.productSnapshot?.quantity || 0);

          if (log.action === 'add') {
            log.timestamp = subDays(new Date(log.timestamp), 7);
          } else if (log.action === 'delete') {
            log.timestamp = subDays(new Date(log.timestamp), 1);
          }

          return {
            ...log,
            amount,
          };
        });

      const addLogs = recentActions.filter(log => log.action === 'add');
      const deleteLogs = recentActions.filter(log => log.action === 'delete');

      setAddActions(addLogs.slice(0, 3));
      setDeleteActions(deleteLogs.slice(0, 3));

      const addTotal = addLogs.reduce((acc, log) => acc + log.amount, 0);
      const deleteTotal = deleteLogs.reduce((acc, log) => acc + log.amount, 0);

      setTotalPaid(addTotal);
      setRemainingBalance(deleteTotal);
    } catch (error) {
      console.error('Error fetching logs:', error);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  const totalAmount = totalPaid + remainingBalance;
  const addPercentage = totalAmount ? (totalPaid / totalAmount) * 100 : 0;
  const deletePercentage = totalAmount ? (remainingBalance / totalAmount) * 100 : 0;

  return (
    <div className="container my-5 d-flex justify-content-center flex-column align-items-center">
  <style>
    {`
      .hover-card {
        transition: all 0.3s ease-in-out;
        cursor: pointer;
      }

      .hover-card:hover {
        transform: scale(1.03);
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
      }

      .log-item:hover {
        transform: scale(1.02);
        box-shadow: 0 6px 12px rgba(0, 0, 0, 0.08);
      }
    `}
  </style>

  {/* Summary Cards */}
  <div className="w-100 mt-2" style={{ maxWidth: '600px' }}>
    {/* Add Amount */}
    <div className="p-4 hover-card shadow-sm rounded-4 mb-4 text-center" style={{ backgroundColor: '#e8f5e9', border: '1px solid #a5d6a7' }}>
      <h5 className="fw-bold text-success mb-2">
        <i className="bi bi-arrow-down-circle me-2"></i>Add Amount
      </h5>
      <p className="mb-1 fs-4 fw-semibold">₹{totalPaid.toFixed(2)}</p>
      <div className="progress" style={{ height: '20px' }}>
        <div
          className="progress-bar bg-success"
          role="progressbar"
          style={{ width: `${addPercentage}%` }}
          aria-valuenow={addPercentage}
          aria-valuemin="0"
          aria-valuemax="100"
        >
          {addPercentage.toFixed(1)}%
        </div>
      </div>
    </div>

    {/* Delete Amount */}
    <div className="p-4 hover-card shadow-sm rounded-4 mb-4 text-center bg-danger-subtle border border-danger-subtle">
      <h5 className="fw-bold text-danger mb-2">
        <i className="bi bi-arrow-up-circle me-2"></i>Delete Amount 
      </h5>
      <p className="mb-1 fs-4 fw-semibold">₹{remainingBalance.toFixed(2)}</p>
      <div className="progress" style={{ height: '20px' }}>
        <div
          className="progress-bar bg-danger"
          role="progressbar"
          style={{ width: `${deletePercentage}%` }}
          aria-valuenow={deletePercentage}
          aria-valuemin="0"
          aria-valuemax="100"
        >
          {deletePercentage.toFixed(1)}%
        </div>
      </div>
    </div>

    {/* Net Amount */}
    <div className="p-4 hover-card shadow-sm rounded-4 text-center" style={{ backgroundColor: '#fff3cd', border: '1px solid #ffeeba' }}>
      <h5 className="fw-bold text-warning mb-2">
        <i className="bi bi-cash-coin me-2"></i>Net Amount 
      </h5>
      <p className="mb-0 fs-4 fw-semibold">₹{(totalPaid - remainingBalance).toFixed(2)}</p>
    </div>
  </div>
  <div className="w-100 my-4 " style={{ maxWidth: '600px' }}>
  <button
    className="btn w-100 p-3 fw-bold d-flex justify-content-center align-items-center rounded-4 shadow-sm hover-card"
    style={{
      backgroundColor: '#d1c4e9',
      border: '1px solid #b39ddb',
      fontSize: '1.1rem',
      transition: 'all 0.3s ease-in-out',
    }}
    onClick={() => navigate('/addproduct')}
  >
    <i className="bi bi-plus-circle me-2 fs-5"></i>
    Add New Item
  </button>
</div>

  {/* Recent Logs */}


<div className="w-100" style={{ maxWidth: '600px', marginBottom: '90px' }}>
  <h5 className="fw-bold mb-3 text-center"></h5>

  {/* Add Actions */}
  {addActions.map((log, idx) => (
    <div
      key={idx}
      className="shadow-sm rounded-4 p-2 mb-2 d-flex justify-content-between align-items-center log-item"
      style={{ backgroundColor: '#e0f7fa', transition: '0.3s ease' }}
    >
      <div className="d-flex align-items-center gap-2">
        <ArrowUpCircle size={18} className="text-success" />
        <span className="fw-semibold text-primary">
          {log.productSnapshot?.name || 'Unnamed Product'}
        </span>
      </div>
      <span className="fw-bold text-secondary">₹{log.amount.toFixed(2)}</span>
      <span className="text-muted">{format(new Date(log.timestamp), 'MMM d, yyyy')}</span>
    </div>
  ))}

  {/* Delete Actions */}
  {deleteActions.map((log, idx) => (
    <div
      key={idx}
      className="shadow-sm rounded-4 p-2 mb-2 d-flex justify-content-between align-items-center log-item"
      style={{ backgroundColor: '#ffebee', transition: '0.3s ease' }}
    >
      <div className="d-flex align-items-center gap-2">
        <ArrowDownCircle size={18} className="text-danger" />
        <span className="fw-semibold text-danger">
          {log.productSnapshot?.name || 'Unnamed Product'}
        </span>
      </div>
      <span className="fw-bold text-dark">₹{log.amount.toFixed(2)}</span>
      <span className="text-muted">{format(new Date(log.timestamp), 'MMM d, yyyy')}</span>
    </div>
  ))}
</div>


</div>

  );
};

export default ProductHistory;
