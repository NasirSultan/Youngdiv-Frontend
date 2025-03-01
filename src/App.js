import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const maxPages = 3;

  useEffect(() => {
    if (page > maxPages) {
      setPage(1);
      return;
    }
    fetchItems();
  }, [page, search]);

  const fetchItems = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `http://localhost:5000/api/items?page=${page}&search=${search}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await response.json();
      setItems(data.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      {/* Styled Heading with Custom Font */}
      <h1 className="text-center text-dark bg-light py-3 rounded shadow custom-font">
        Items List
      </h1>

      {/* Search Input */}
      <div className="input-group my-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search items..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Display Loading or Error */}
      {loading && <div className="alert alert-info">Loading...</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      {/* Table with Hover Effect */}
      <table className="table table-hover table-bordered shadow rounded">
        <thead className="table-secondary">
          <tr>
            <th>Item Name</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item._id} className="hover-effect">
              <td className="fw-bold">{item.name}</td>
              <td className="text-success"><strong>${item.price}</strong></td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="d-flex justify-content-center mt-4">
        <button
          className="btn btn-outline-primary me-2"
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
        >
          Prev
        </button>
        <span className="btn btn-light">Page {page}</span>
        <button
          className="btn btn-outline-primary ms-2"
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>

      {/* Custom CSS */}
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&display=swap');

          .custom-font {
            font-family: 'Playfair Display', serif;
            font-weight: 700;
            letter-spacing: 1px;
          }

          .hover-effect:hover {
            background-color: #f1f1f1 !important;
            transition: 0.3s ease-in-out;
          }

          .table {
            border-radius: 10px;
            overflow: hidden;
          }
        `}
      </style>
    </div>
  );
};

export default App;
