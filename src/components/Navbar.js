import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    } else {
      const storedUser = {
        username: localStorage.getItem('name'),
        email: localStorage.getItem('email'),
        role: localStorage.getItem('role'),
        number: localStorage.getItem('number'),
      };
      setUser(storedUser);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
    navigate('/');
  };

  return (
    <nav className="navbar navbar-expand-lg text-white px-3" style={{ backgroundColor: '#007bff' }}>
      <div className="container-fluid d-flex justify-content-between align-items-center">
        <span className="navbar-brand text-white fw-bold mb-0">
          {user?.role === 'admin' ? 'Admin Dashboard' : 'User Dashboard'}
        </span>

        {user && (
          <div className="d-flex align-items-center justify-content-between flex-grow-1 ms-3">
           <div className="d-flex align-items-center">
  <div className="fw-semibold me-2" style={{ fontSize: '1rem' }}>
    {user.username}
  </div>
  <div className="small text-black" style={{ fontSize: '0.875rem' }}>
    {user.email}
  </div>
  {user.role !== 'admin' && (
    <div
      className="small"
      style={{ fontSize: '0.875rem', marginLeft: '8px', color: 'brown' }}
    >
      {user.number}
    </div>
  )}
</div>

            <button className="btn btn-light btn-sm ms-auto" onClick={handleLogout}>
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
