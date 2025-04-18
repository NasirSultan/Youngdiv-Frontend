import React from 'react';
import { useNavigate } from 'react-router-dom';

function UserDashboard() {
  const navigate = useNavigate();

  const goToProducts = () => {
    navigate('/getproduct');
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
        Welcome User!
      </h2>

      <button
        className="btn mt-3"
        style={{
          width: '500px',
          maxWidth: '90%',
          marginLeft: 'auto',
          marginRight: 'auto',
          height: '100px',
          background: 'linear-gradient(to right, rgb(152, 64, 224), rgb(2, 99, 10))',
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
        View Products
      </button>

      <button
        className="btn mt-3"
        style={{
          width: '500px',
          maxWidth: '90%',
          marginLeft: 'auto',
          marginRight: 'auto',
          height: '100px',
          background: 'linear-gradient(to right, rgb(40, 109, 60), rgb(161, 134, 76))',
          border: 'none',
          color: 'white',
          transition: 'transform 0.2s, box-shadow 0.2s',
        }}
        onClick={()=>navigate('/ProductHistory')}
        onMouseEnter={(e) => {
          e.target.style.transform = 'scale(1.03)';
          e.target.style.boxShadow = '0px 4px 10px rgba(0, 0, 0, 0.2)';
        }}
        onMouseLeave={(e) => {
          e.target.style.transform = 'scale(1)';
          e.target.style.boxShadow = 'none';
        }}
      >
   Products History
      </button>

      <button
    className="btn mt-3 hide"
    style={{
        width: '500px',
        maxWidth: '90%',
        marginLeft: 'auto',
        marginRight: 'auto',
        height: '100px',
        background: 'linear-gradient(to right, rgb(152, 64, 224), rgb(49, 139, 53))',
        border: 'none',
        color: 'white',
        transition: 'transform 0.2s, box-shadow 0.2s',
        display: 'none', // Hides the button
    }}
    onClick={() => navigate('/addproduct')}
    onMouseEnter={(e) => {
        e.target.style.transform = 'scale(1.03)';
        e.target.style.boxShadow = '0px 4px 10px rgba(0, 0, 0, 0.2)';
    }}
    onMouseLeave={(e) => {
        e.target.style.transform = 'scale(1)';
        e.target.style.boxShadow = 'none';
    }}
>
    Add Product
</button>

    </div>
  );
}

export default UserDashboard;
