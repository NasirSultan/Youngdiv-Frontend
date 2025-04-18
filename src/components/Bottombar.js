import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaTachometerAlt, FaUsers, FaCreditCard, FaExclamationCircle, FaCog } from 'react-icons/fa'; // Example icons

const BottomNav = () => {
  const [activeTab, setActiveTab] = useState('/dashboard'); // Track active tab

  return (
    <div className="bottom-nav">
      <Link to="/admin" className="nav-item">
        <button
          className={activeTab === '/dashboard' ? 'active' : ''}
          onClick={() => setActiveTab('/dashboard')}
        >
          <FaTachometerAlt className="icon" />
          <span>Dashboard</span>
        </button>
      </Link>
      <Link to="/userslist" className="nav-item">
        <button
          className={activeTab === '/users' ? 'active' : ''}
          onClick={() => setActiveTab('/users')}
        >
          <FaUsers className="icon" />
          <span>Users</span>
        </button>
      </Link>
      <Link to="/admin/user-history" className="nav-item">
        <button
          className={activeTab === '/payments' ? 'active' : ''}
          onClick={() => setActiveTab('/payments')}
        >
          <FaCreditCard className="icon" />
          <span>Payments</span>
        </button>
      </Link>
      <Link to="/reports" className="nav-item">
        <button
          className={activeTab === '/reports' ? 'active' : ''}
          onClick={() => setActiveTab('/reports')}
        >
          <FaExclamationCircle className="icon" />
          <span>Reports</span>
        </button>
      </Link>
      <Link to="/settings" className="nav-item">
        <button
          className={activeTab === '/settings' ? 'active' : ''}
          onClick={() => setActiveTab('/settings')}
        >
          <FaCog className="icon" />
          <span>Settings</span>
        </button>
      </Link>
    </div>
  );
};

export default BottomNav;
