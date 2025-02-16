import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const MedicineList = () => {
  const [medicines, setMedicines] = useState([]);
  const [filteredMedicines, setFilteredMedicines] = useState([]);
  const [selectedMedicines, setSelectedMedicines] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/medicines");
        if (!response.ok) {
          throw new Error("Failed to fetch medicines");
        }
        const data = await response.json();
        setMedicines(data);
        setFilteredMedicines(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchMedicines();
  }, []);

  const handleSearch = () => {
    const filtered = medicines.filter((medicine) =>
      medicine.medicine_name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredMedicines(filtered);
  };

  const handleSelectMedicine = (medicine, quantity) => {
    setSelectedMedicines((prev) => {
      const exists = prev.find((item) => item.product_id === medicine.id);
      if (exists) {
        return prev.map((item) =>
          item.product_id === medicine.id ? { ...item, quantity } : item
        );
      }
      return [
        ...prev,
        {
          product_id: medicine.id,
          medicine_name: medicine.medicine_name,
          store_id: medicine.store_id,
          store_name: medicine.store_name,
          quantity,
          price: medicine.price_per_unit,
        },
      ];
    });
  };

  useEffect(() => {
    localStorage.setItem("selectedMedicines", JSON.stringify(selectedMedicines));
  }, [selectedMedicines]);

  const handleProceedToOrder = () => {
    if (selectedMedicines.length === 0) {
      alert("Please select at least one medicine.");
      return;
    }
    navigate("/order", { state: { selectedMedicines } });
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center text-primary mb-4">Medicine List</h2>

      <div className="mb-3 d-flex">
        <input
          type="text"
          className="form-control border-primary shadow-sm"
          placeholder="Search medicine by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ width: "40%" }}
        />
        <button className="btn btn-info mx-1 " style={{ width: "15%" }} onClick={handleSearch}>
          Search
        </button>
        <div class="flex justify-right">
          <button className="btn btn-primary me-2" onClick={handleProceedToOrder}>
            Proceed to Order
          </button>
          <button className="btn btn-secondary" onClick={() => navigate("/order-status")}>
            View Order Status
          </button>
        </div>
      </div>

      {loading && <h4 className="text-center text-info">Loading medicines...</h4>}
      {error && <h5 className="text-center text-danger">Error: {error}</h5>}

      {!loading && !error && (
        <div className="table-responsive">
          <table className="table table-bordered table-hover">
            <thead className="table-primary text-center">
              <tr>
                <th>Select</th>
                <th>Medicine Name</th>
                <th>Price Per Unit</th>
                <th>Available Quantity</th>
                <th>Order Quantity</th>
                <th>Store Name</th>
              </tr>
            </thead>
            <tbody>
              {filteredMedicines.map((medicine) => (
                <tr key={medicine.id} className="text-center">
                  <td>
                    <input
                      type="checkbox"
                      onChange={(e) =>
                        handleSelectMedicine(medicine, e.target.checked ? 1 : 0)
                      }
                    />
                  </td>
                  <td>{medicine.medicine_name}</td>
                  <td>${medicine.price_per_unit}</td>
                  <td>{medicine.quantity}</td>
                  <td>
                    <input
                      type="number"
                      min="1"
                      defaultValue="1"
                      onChange={(e) =>
                        handleSelectMedicine(medicine, Number(e.target.value))
                      }
                    />
                  </td>
                  <td>{medicine.store_name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MedicineList;
