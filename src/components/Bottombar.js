// BottomNav.jsx
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  FaTachometerAlt,
  FaUsers,
  FaCreditCard,
  FaCog,
  FaBoxOpen,
  FaHistory,
  FaUserCircle,
} from 'react-icons/fa';

const BottomNav = () => {
  const [activeTab, setActiveTab] = useState('');
  const [role, setRole] = useState('');
  const location = useLocation();

  useEffect(() => {
    const storedRole = localStorage.getItem('role'); // 'admin' or 'user'
    if (storedRole) {
      setRole(storedRole);
    }
    setActiveTab(location.pathname);
  }, [location]);

  const adminTabs = [
    { path: '/payment', label: 'Dashboard', icon: <FaTachometerAlt />, value: '/admin' },
    { path: '/userslist', label: 'Users', icon: <FaUsers />, value: '/userslist' },
    { path: '/PaymentSeven', label: 'Analytics', icon: <FaCreditCard />, value: '/admin/user-history' },
    { path: '/settings', label: 'Settings', icon: <FaCog />, value: '/settings' },
  ];

  const userTabs = [
    { path: '/user', label: 'Dashboard', icon: <FaTachometerAlt />, value: '/user' },
    { path: '/getproduct', label: 'Items', icon: <FaBoxOpen />, value: '/getproduct' },
    { path: '/ProductHistory', label: 'History', icon: <FaHistory />, value: '/user/history' },
    { path: '/profile', label: 'Profile', icon: <FaUserCircle />, value: '/profile' },
  ];

  const tabs = role === 'admin' ? adminTabs : userTabs;

  return (
    <>
      {role && (
        <div className={`bottom-nav ${role}`}>
          {tabs.map((tab) => (
            <Link to={tab.path} className="nav-item" key={tab.value}>
              <button
                className={`nav-btn ${activeTab === tab.value ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.value)}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            </Link>
          ))}
        </div>
      )}
    </>
  );
};

export default BottomNav;
