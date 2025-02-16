import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const OrderPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const selectedMedicines = location.state?.selectedMedicines || [];

  const [customer, setCustomer] = useState({
    name: "",
    number: "",
    address: "",
    comment: "",
  });

  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    let total = 0;

    selectedMedicines.forEach((medicine, index) => {
      console.log(`Medicine ${index}:`, medicine); // Debugging line
      const price = parseFloat(medicine?.price) || 0;
      total += medicine.quantity * price;
    });

    setTotalAmount(total);
  }, [selectedMedicines]);

  const handleChange = (e) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };

  const handleSubmitOrder = async () => {
    if (!customer.name || !customer.number || !customer.address) {
      alert("Please fill in all required fields.");
      return;
    }

    const orderData = {
      customer_name: customer.name,
      customer_number: customer.number,
      customer_address: customer.address,
      comment: customer.comment,
      medicines: selectedMedicines,
      total_amount: totalAmount,
    };

    try {
      const response = await fetch("http://127.0.0.1:8000/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        throw new Error("Failed to place order.");
      }

      alert("Order placed successfully!");
      navigate("/");
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center text-primary fw-bold mb-4">Order Summary</h2>

      <div className="card shadow-lg border-0 p-4">
        <h4 className="text-primary border-bottom pb-2">Customer Information</h4>
        <div className="row">
          <div className="col-md-6">
            <input
              type="text"
              className="form-control mb-3"
              placeholder="Full Name"
              name="name"
              value={customer.name}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6">
            <input
              type="text"
              className="form-control mb-3"
              placeholder="Phone Number"
              name="number"
              value={customer.number}
              onChange={handleChange}
            />
          </div>
          <div className="col-12">
            <input
              type="text"
              className="form-control mb-3"
              placeholder="Delivery Address"
              name="address"
              value={customer.address}
              onChange={handleChange}
            />
          </div>
          <div className="col-12">
            <textarea
              className="form-control mb-3"
              placeholder="Additional Comments (Optional)"
              name="comment"
              value={customer.comment}
              onChange={handleChange}
            />
          </div>
        </div>

        <h4 className="text-primary border-bottom pb-2 mt-4">Selected Medicines</h4>
        <div className="table-responsive">
          <table className="table table-hover">
            <thead className="table-primary text-center">
              <tr>
                <th>Medicine Name</th>
                <th>Store Name</th>
                <th>Quantity</th>
                <th>Price per Unit</th>
                <th>Total Price</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {selectedMedicines.map((medicine, index) => {
                const price = parseFloat(medicine?.price) || 0;

                return (
                  <tr key={index}>
                    <td className="fw-bold">{medicine.medicine_name}</td>
                    <td>{medicine.store_name}</td>
                    <td>{medicine.quantity}</td>
                    <td>${price ? price.toFixed(2) : "N/A"}</td>
                    <td className="fw-bold">${(medicine.quantity * price).toFixed(2)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <h4 className="text-end mt-3 text-success fw-bold">
          Grand Total: ${totalAmount.toFixed(2)}
        </h4>

        <div className="text-center mt-4">
          <button className="btn btn-success px-4 py-2" onClick={handleSubmitOrder}>
            Confirm Order
          </button>
          <button className="btn btn-danger px-4 py-2 ms-3" onClick={() => navigate("/")}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
