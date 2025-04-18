import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password
      });

      const { token, user } = res.data;

      if (!token || !user) {
        alert('Login failed: No token or user data received');
        return;
      }

      // Save token, role, name, and email to localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('role', user.role);
      localStorage.setItem('name', user.username);  // Store name
      localStorage.setItem('email', user.email);  
      localStorage.setItem('number', user.number);   

      if (user.role === 'admin') {
        navigate('/admin');
      } else if (user.role === 'user') {
        navigate('/user');
      } else {
        alert('Invalid role');
      }
    } catch (err) {
      console.error("Error details:", err.response);
      alert('Login failed: ' + (err.response?.data?.message || 'Unknown error'));
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light px-3">
      <div className="col-md-6 col-sm-12 p-4 border rounded shadow-sm bg-white"
        style={{
          border: '1px solid #ddd',
          transition: 'box-shadow 0.3s',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = '0 0 10px rgba(0,0,0,0.1)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = 'none';
        }}
      >
        <h2 className="fw-bold mb-2 text-start">Welcome Back</h2>
        <p className="text-muted fs-6 mb-4 text-start">Please enter your details</p>

        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group mb-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="btn bg-black text-white w-100">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
