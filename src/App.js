import React from 'react';
import {  Routes, Route } from 'react-router-dom';
import './App.css';

import Login from './components/Login';
import Bottombar from './components/Bottombar';
import AdminDashboard from './components/AdminDashboard';
import UserDashboard from './components/UserDashboard';
import Register from './components/register';
import NotFound from './pages/NotFound';
import Layout from './components/Layout'; // Import the Layout component
import GetProduct from './components/products/GetProduct';
import AddProduct from './components/products/AddProduct';
import GetUser from './components/products/GetUser';
import ProductHistory from './components/products/ProductHistory';
import AddProductAdmin from './components/products/AddProductAdmin';
import UserProducts from './components/products/UserProducts';
import Payment from './components/products/Payment';
import UserHistory from './components/products/UserHistory';

function App() {
  return (
   
      <Routes>
        {/* Login page route (No Navbar) */}
        <Route path="/" element={<Login />} />

        {/* Routes with Navbar wrapped by Layout */}
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
        </Route>

        {/* Not Found page */}
        <Route path="*" element={<NotFound />} />
      </Routes>
 
  );
}

export default App;
