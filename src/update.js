import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";



const Update = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Destructure values from location.state
  const { _id, name: initialName, price: initialPrice } = location.state;

  // Initialize state with received data
  const [name, setName] = useState(initialName);
  const [price, setPrice] = useState(initialPrice || '');

  const handleUpdate = () => {
    axios.put(`http://localhost:5000/dish/${_id}`, { name, price })
      .then(() => {
        alert("Dish updated successfully!");
        navigate('/');
      })
      .catch(err => console.log("Update failed:", err));
  };

  return (
    <div>
      <h1>Update Dish</h1>

      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Dish Name"
      />

      <input
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        placeholder="Dish Price"
      />

      <button onClick={handleUpdate}>
        Submit Update
      </button>
    </div>
  );
};

export default Update;










