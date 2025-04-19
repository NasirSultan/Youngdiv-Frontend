import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';

import Login from './components/Login';
import Bottombar from './components/Bottombar';
import AdminDashboard from './components/AdminDashboard';
import UserDashboard from './components/UserDashboard';
import Register from './components/register';
import NotFound from './pages/NotFound';
import Layout from './components/Layout';
import { Sitting } from './components/Sitting';  // wrap here
import Example from './components/Example';
import Profile from './components/Profile';
import GetProduct from './components/products/GetProduct';
import AddProduct from './components/products/AddProduct';
import GetUser from './components/products/GetUser';
import ProductHistory from './components/products/ProductHistory';
import AddProductAdmin from './components/products/AddProductAdmin';
import UserProducts from './components/products/UserProducts';
import Payment from './components/products/Payment';
import UserHistory from './components/products/UserHistory';
import PaymentSeven from './components/products/PaymentSeven';

function App() {
  return (
    <Sitting> {/* 🟡 Apply context wrapper here */}
      <Routes>
        <Route path="/" element={<Login />} />

        <Route element={<Layout />}>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/user" element={<UserDashboard />} />
          <Route path="/getproduct" element={<GetProduct />} />
          <Route path="/userslist" element={<GetUser />} />
          <Route path="/addproduct" element={<AddProduct />} />
          <Route path="/ProductHistory" element={<ProductHistory />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin/addproduct" element={<AddProductAdmin />} />
          <Route path="/admin/userproducts" element={<UserProducts />} />
          <Route path="/admin/user-history" element={<UserHistory />} />
          <Route path="/Payment" element={<Payment />} />
          <Route path="/Bottombar" element={<Bottombar />} />
          <Route path="/PaymentSeven" element={<PaymentSeven />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/Sitting" element={<SittingTogglePage />} /> {/* optional page */}
          <Route path="/example" element={<Example />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Sitting>
  );
}

// Optional sitting toggle page for UI if needed
const SittingTogglePage = () => {
  const { theme, toggleTheme } = require('./components/Sitting').useTheme();
  return (
    <div className="container py-4">
      <h3>Toggle Theme</h3>
      <button className="btn btn-primary" onClick={toggleTheme}>
        Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
      </button>
    </div>
  );
};

export default App;
