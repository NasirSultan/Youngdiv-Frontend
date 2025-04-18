import React from 'react';
import { useNavigate } from 'react-router-dom';

function AdminDashboard() {
  const navigate = useNavigate();

  const goToProducts = () => {
    navigate('/register');
  };

  return (
    <div
      className="container mt-5"
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      
      }}
    >
      <h2
        style={{
          fontWeight: 'bold',
          transition: 'color 0.3s ease, transform 0.3s ease',
          cursor: 'pointer',
        }}
        onMouseEnter={(e) => {
          e.target.style.color = '#02630a';
          e.target.style.transform = 'scale(1.05)';
        }}
        onMouseLeave={(e) => {
          e.target.style.color = '';
          e.target.style.transform = 'scale(1)';
        }}
      >
        Welcome Admin!
      </h2>

      <button
        className="btn mt-3"
        style={{
          width: '500px',
          maxWidth: '90%',
          marginLeft: 'auto',
          marginRight: 'auto',
          height: '100px',
          background: 'linear-gradient(to top, rgb(110, 75, 40), rgb(173, 162, 38))',
          border: 'none',
          color: 'white',
          transition: 'transform 0.2s, box-shadow 0.2s',
        }}
        onClick={goToProducts}
        onMouseEnter={(e) => {
          e.target.style.transform = 'scale(1.03)';
          e.target.style.boxShadow = '0px 4px 10px rgba(0, 0, 0, 0.2)';
        }}
        onMouseLeave={(e) => {
          e.target.style.transform = 'scale(1)';
          e.target.style.boxShadow = 'none';
        }}
      >
     Add New User
      </button>

      <button
        className="btn mt-3"
        style={{
          width: '500px',
          maxWidth: '90%',
          marginLeft: 'auto',
          marginRight: 'auto',
          height: '100px',
          background: 'linear-gradient(to top, rgb(173, 162, 38), rgb(110, 75, 40))',
          border: 'none',
          color: 'white',
          transition: 'transform 0.2s, box-shadow 0.2s',
        }}
        onClick={() => navigate('/userslist')}
        onMouseEnter={(e) => {
          e.target.style.transform = 'scale(1.03)';
          e.target.style.boxShadow = '0px 4px 10px rgba(0, 0, 0, 0.2)';
        }}
        onMouseLeave={(e) => {
          e.target.style.transform = 'scale(1)';
          e.target.style.boxShadow = 'none';
        }}
      >
        Users LIst
      </button>
    </div>
  );
}

export default AdminDashboard;
