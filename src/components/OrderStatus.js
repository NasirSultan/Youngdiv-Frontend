import React, { useState } from "react";

const OrderStatus = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchOrderStatus = async () => {
    if (!phoneNumber) {
      alert("Please enter a phone number.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`http://localhost:8000/api/orders/user?customer_number=${phoneNumber}`);
      if (!response.ok) {
        throw new Error("No orders found for this number.");
      }
      const data = await response.json();
      
      setOrder(data[0] || null);
    } catch (err) {
      setError(err.message);
      setOrder(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center text-dark mb-4 fw-bold">Check Order Status</h2>

      <div className="d-flex justify-content-center mb-4">
        <input
          type="text"
          className="form-control w-50 me-2"
          placeholder="Enter phone number..."
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <button className="btn btn-primary px-4" onClick={fetchOrderStatus}>
          Check
        </button>
      </div>

      {loading && <p className="text-info text-center">Fetching order details...</p>}
      {error && <p className="text-danger text-center">{error}</p>}

      {order && (
        <div className="card shadow-lg p-4 mt-4">
          <h5 className="text-center text-success fw-bold mb-3">Order Details</h5>

          {/* Order Information Table */}
          <table className="table table-bordered">
            <tbody>
              <tr>
                <td><strong>Customer Name</strong></td>
                <td>{order.customer_name}</td>
              </tr>
              <tr>
                <td><strong>Address</strong></td>
                <td>{order.customer_address}</td>
              </tr>
              <tr>
                <td><strong>Phone Number</strong></td>
                <td>{order.customer_number}</td>
              </tr>
              <tr>
                <td><strong>Comment</strong></td>
                <td>{order.comment || "No comment"}</td>
              </tr>
              <tr>
                <td><strong>Status</strong></td>
                <td>
                  <span className={`badge ${order.status === "pending" ? "bg-warning" : "bg-success"}`}>
                    {order.status.toUpperCase()}
                  </span>
                </td>
              </tr>
              <tr>
                <td><strong>Order Date</strong></td>
                <td>{new Date(order.created_at).toLocaleString()}</td>
              </tr>
            </tbody>
          </table>

      
         
        </div>
      )}
    </div>
  );
};

export default OrderStatus;
