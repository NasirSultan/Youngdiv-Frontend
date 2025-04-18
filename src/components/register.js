import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/bootstrap.css'; // Make sure you import the CSS for styling

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [number, setNumber] = useState('');
  const [alert, setAlert] = useState({ message: '', type: '' });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation for empty fields
    if (!username || !email || !password || !number) {
      setAlert({ message: 'Please fill in all fields.', type: 'error' });
      return;
    }

    try {
      // Make API request to register the user
      await axios.post('http://localhost:5000/api/auth/register', {
        username,
        email,
        password,
        number,
      });

      // Set success alert and clear fields
      setAlert({ message: 'User registered successfully!', type: 'success' });
      setUsername('');
      setEmail('');
      setPassword('');
      setNumber('');

      // Redirect to admin page after successful registration
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
    <div className="container mt-5">
      <div className="card mx-auto shadow rounded-4" style={{ maxWidth: '600px' }}>
        <div className="card-body">
        <h4 className="card-title text-center mb-3 text-2xl font-semibold font-sans">
  Register New User
</h4>


          {/* Display alert message */}
          {alert.message && (
            <div
              className={`alert ${alert.type === 'success' ? 'alert-success' : 'alert-danger'}`}
              role="alert"
            >
              {alert.message}
            </div>
          )}

          {/* Registration form */}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
             
              <input
                type="text"
                id="username"
                className="form-control"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                required
              />
            </div>

            <div className="mb-3">
             
              <input
                type="email"
                id="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="mb-3">
             
              <input
                type="password"
                id="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
            </div>

            <div className="mb-3">
              
              <PhoneInput
                country={'us'} // default country
                value={number}
                onChange={(value) => setNumber(value)} // Corrected onChange
                inputClass="form-control"
                inputStyle={{ width: '100%' }}
                enableSearch
                placeholder="Enter your phone number"
              />
            </div>

            <div className="d-grid gap-2">
              <button type="submit" className="btn btn-success">
                Register
              </button>
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => navigate('/admin')}
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
