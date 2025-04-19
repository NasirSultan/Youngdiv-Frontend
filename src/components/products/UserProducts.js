import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const UserProducts = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [userId, setUserId] = useState(location.state?.userId || '');
  const [products, setProducts] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (userId) fetchUserProducts();
  }, [userId]);

  const fetchUserProducts = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/products/getuserproducts/${userId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

      const products = res.data.products;
      const calculatedTotal = products.reduce((sum, item) => sum + (item.price || 0), 0);
      setProducts(products);
      setTotalAmount(calculatedTotal);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch user products');
    }
  };

  const handleDelete = async (productId) => {
    const isConfirmed = window.confirm('Are you sure you want to delete this product?');
    if (isConfirmed) {
      try {
        await axios.delete(`http://localhost:5000/api/products/deleteProductadmin/${productId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          },
          data: { userId }
        });
        fetchUserProducts();
      } catch (err) {
        console.error(err);
        setError('Failed to delete product');
      }
    }
  };

  return (
    <div className="container my-5 pb-5 mt-5 pt-4">
      <div className="d-flex flex-column mb-4">
        <h3 className="text-primary d-flex align-items-center gap-2">
          <i className="bi bi-box-seam-fill text-success"></i> 
        Items  Detail
        </h3>
      
        <div className="border-bottom border-success mt-2" style={{ width: '180px', height: '3px', borderRadius: '2px' }}></div>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      {products.length > 0 ? (
        <>
          {/* Header row for large screens */}
          <div className="d-none d-lg-flex fw-bold border-bottom pb-2 mb-3" style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div className="col-lg-4">Name</div>
            <div className="col-lg-4">Price</div>
            <div className="col-lg-4 text-center">Operation</div>
          </div>

          {/* Product rows */}
          {products.map((prod) => (
            <div className="col-12 mb-3" key={prod._id}>
              {/* Large screen row */}
              <div
                className="d-none d-lg-flex border rounded py-2 px-3 align-items-center bg-light product-row mx-auto shadow-sm"
                style={{
                  maxWidth: '800px',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  fontSize: '0.95rem',
                  lineHeight: '1.2',
                }}
              >
                <div className="col-lg-4">{prod.name}</div>
                <div className="col-lg-4 text-success">₹{prod.price}</div>
                <div className="col-lg-4 text-center">
                  <button className="btn btn-danger btn-sm" onClick={() => handleDelete(prod._id)}>
                    Delete
                  </button>
                </div>
              </div>

              {/* Small screen card */}
              <div className="d-lg-none card shadow-sm bg-light mx-auto" style={{ maxWidth: '400px' }}>
                <div className="card-body d-flex flex-column align-items-center justify-content-center">
                  <h5 className="mb-2 text-center">{prod.name}</h5>
                  <p className="text-success mb-2 text-center">₹{prod.price}</p>
                  <button className="btn btn-danger btn-sm w-100" onClick={() => handleDelete(prod._id)}>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </>
      ) : (
        <div className="text-muted text-center">No products found for this user.</div>
      )}

      {/* Total Amount Modal */}
      {showModal && (
        <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content text-center">
              <div className="modal-header">
                <h5 className="modal-title w-100">Total Amount</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                <h2 className="text-success">₹{totalAmount}</h2>
              </div>
              <div className="modal-footer justify-content-center">
                <button className="btn btn-secondary" onClick={() => setShowModal(false)}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Additional Styling */}
      <style>{`
        .product-row:hover {
          background-color: #e9f7ef;
          transform: scale(1.01);
        }
      `}</style>
    </div>
  );
};

export default UserProducts;
