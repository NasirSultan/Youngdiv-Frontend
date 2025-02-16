import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const StoreOrders = () => {
  const [storeName, setStoreName] = useState("");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [orderProcessing, setOrderProcessing] = useState(null); // Track order in processing

  useEffect(() => {
    // Retrieve store name from localStorage
    const storedName = localStorage.getItem("store_name");
    if (storedName) {
      setStoreName(storedName);
      fetchOrders(storedName); // Fetch orders on component mount
    } else {
      setError("No store selected. Please select a store.");
    }
  }, []);

  // ✅ Fetch Orders for the Store
  const fetchOrders = async (storeName) => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("http://127.0.0.1:8000/api/orders/manage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ store_name: storeName }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong while fetching orders.");
      }

      setOrders(data.orders || []);
    } catch (err) {
      setError(err.message);
    }

    setLoading(false);
  };

  // ✅ Approve or Reject Order
  const updateOrderStatus = async (orderId, status) => {
    setLoading(true);
    setError("");
    setOrderProcessing(orderId); // Set the processing order

    try {
      const response = await fetch("http://127.0.0.1:8000/api/update-status", { // Updated API endpoint
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ store_name: storeName, order_id: orderId, status }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update order status.");
      }

      // ✅ Update UI after status change
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === orderId ? { ...order, status: status === "approved" ? "approved" : "rejected" } : order
        )
      );
    } catch (err) {
      setError(err.message);
    }

    setOrderProcessing(null); // Reset processing state
    setLoading(false);
  };

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Store Order Management</h2>
      {error && <div className="alert alert-danger">{error}</div>}

      {/* ✅ Order List */}
      {loading ? (
        <div className="text-center">Loading orders...</div>
      ) : orders.length > 0 ? (
        <table className="table table-bordered table-striped table-responsive-sm">
          <thead className="table-dark">
            <tr>
              <th>Customer Name</th>
              <th>Customer Number</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.customer_name}</td>
                <td>{order.customer_number}</td>
                <td>{order.status}</td>
                <td>
                  {order.status === "pending" ? (
                    <>
                      <button
                        onClick={() => updateOrderStatus(order.id, "approved")}
                        className="btn btn-success me-2"
                        disabled={orderProcessing === order.id || loading}
                      >
                        {orderProcessing === order.id ? "Processing..." : "Approve"}
                      </button>
                      <button
                        onClick={() => updateOrderStatus(order.id, "rejected")}
                        className="btn btn-danger"
                        disabled={orderProcessing === order.id || loading}
                      >
                        {orderProcessing === order.id ? "Processing..." : "Reject"}
                      </button>
                    </>
                  ) : (
                    <span className="badge bg-secondary">Done</span> // Set Done when order is processed
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="text-center">No orders found.</div>
      )}
    </div>
  );
};

export default StoreOrders;
