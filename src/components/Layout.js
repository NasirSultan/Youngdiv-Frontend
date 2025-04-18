import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Bottombar from './Bottombar';

const Layout = () => {
  return (
    <div>
      {/* Show Navbar only on md and up */}
      <div className="d-none d-md-block">
        <Navbar />
      </div>

      <div className="container mt-4">
        <Outlet />
      </div>

      {/* Show Bottombar only on small screens */}
      <div className="d-block d-md-none">
        <Bottombar />
      </div>
    </div>
  );
};

export default Layout;
