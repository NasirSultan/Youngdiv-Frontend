import React, { useEffect, useState, useRef, useLayoutEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  FaTachometerAlt,
  FaUsers,
  FaCreditCard,
  FaCog,
  FaBoxOpen,
  FaHistory,
  FaUserCircle,
} from 'react-icons/fa';

const Navbar = ({ children }) => {
  const [role, setRole] = useState(null);
  const [activeTab, setActiveTab] = useState('');
  const [navHeight, setNavHeight] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  const navRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    const storedRole = localStorage.getItem('role');
    if (storedRole) {
      setRole(storedRole);
    } else {
      navigate('/login');
    }

    setActiveTab(location.pathname);
  }, [location, navigate]);

  useLayoutEffect(() => {
    if (navRef.current) {
      setNavHeight(navRef.current.offsetHeight);
    }
  }, []);

  const adminTabs = [
    { path: '/payment', label: 'Dashboard', icon: <FaTachometerAlt /> },
    { path: '/userslist', label: 'Users', icon: <FaUsers /> },
    { path: '/PaymentSeven', label: 'Payment Analytics', icon: <FaCreditCard /> },
    { path: '/settings', label: 'Settings', icon: <FaCog /> },
  ];

  const userTabs = [
    { path: '/user', label: 'Dashboard', icon: <FaTachometerAlt /> },
    { path: '/getproduct', label: 'Items', icon: <FaBoxOpen /> },
    { path: '/ProductHistory', label: 'History', icon: <FaHistory /> },
    { path: '/Profile', label: 'Profile', icon: <FaUserCircle /> },
  ];

  const tabs = role === 'admin' ? adminTabs : userTabs;

  return (
    <>
      <nav
        ref={navRef}
        className="navbar navbar-expand-lg text-white px-3 fixed-top"
        style={{ backgroundColor: '#007bff' }}
      >
        <div className="container-fluid d-flex justify-content-between align-items-center">
          <span className="navbar-brand text-white fw-bold mb-0">
            {role?.charAt(0).toUpperCase() + role?.slice(1)} Dashboard
          </span>

          <div
            className="d-flex align-items-center flex-nowrap gap-2"
            style={{ width: 'auto' }}
          >
            {tabs.map((tab) => (
              <div
                key={tab.path}
                className={`nav-item d-flex align-items-center gap-2 px-3 py-2 rounded ${
                  activeTab === tab.path
                    ? 'bg-white text-primary fw-semibold'
                    : 'text-white'
                }`}
                style={{
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  justifyContent: 'center',
                  transition: 'all 0.2s ease',
                }}
                onClick={() => navigate(tab.path)}
              >
                <span>{tab.icon}</span>
                <span className="d-none d-sm-inline">{tab.label}</span>
              </div>
            ))}
          </div>
        </div>
      </nav>

      <div style={{ marginTop: navHeight }}>{children}</div>
    </>
  );
};

export default Navbar;
