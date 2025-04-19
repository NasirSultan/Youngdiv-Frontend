import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/bootstrap.css';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [number, setNumber] = useState('');
  const [alert, setAlert] = useState({ message: '', type: '' });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !email || !password || !number) {
      setAlert({ message: 'Please fill in all fields.', type: 'error' });
      return;
    }

    try {
      await axios.post('http://localhost:5000/api/auth/register', {
        username,
        email,
        password,
        number,
      });

      setAlert({ message: 'User registered successfully!', type: 'success' });
      setUsername('');
      setEmail('');
      setPassword('');
      setNumber('');

      setTimeout(() => navigate('/admin'), 1000);
    } catch (err) {
      console.error(err.response?.data || err.message);
      setAlert({
        message: 'Registration failed: ' + (err.response?.data || 'Unknown error'),
        type: 'error',
      });
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <div className="card shadow rounded-4 px-3 py-4" style={{ width: '100%', maxWidth: '480px' }}>
        <div className="card-body">
          <h5 className="text-center mb-3 text-xl font-bold font-sans">
            Register New User
          </h5>
  
          {alert.message && (
            <div
              className={`alert py-2 text-sm ${
                alert.type === 'success' ? 'alert-success' : 'alert-danger'
              }`}
              role="alert"
            >
              {alert.message}
            </div>
          )}
  
          <form onSubmit={handleSubmit} className="text-sm">
            <div className="mb-2">
              <input
                type="text"
                className="form-control text-sm"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
              />
            </div>
  
            <div className="mb-2">
              <input
                type="email"
                className="form-control text-sm"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
              />
            </div>
  
            <div className="mb-2">
              <input
                type="password"
                className="form-control text-sm"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
              />
            </div>
  
            <div className="mb-3">
              <PhoneInput
                country={'us'}
                value={number}
                onChange={(value) => setNumber(value)}
                inputClass="form-control text-sm"
                inputStyle={{ width: '100%', fontSize: '0.85rem' }}
                enableSearch
                placeholder="Phone number"
              />
            </div>
  
            <div className="d-grid gap-2">
              <button type="submit" className="btn btn-success btn-sm">
                Register
              </button>
              <button
                type="button"
                className="btn btn-outline-secondary btn-sm"
                onClick={() => navigate('/userslist')}
              >
                ← Back to Admin Dashboard
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
  
};

export default Register;
