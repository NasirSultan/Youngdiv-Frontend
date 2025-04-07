// import React from "react";
// import { NavLink ,useNavigate} from "react-router-dom";
// import "./App.css";
// function Navbar() {
//   const navigate = useNavigate();
//   return (
//     <nav>
//       <NavLink to="/">Home</NavLink>
//       <NavLink to="/about">About</NavLink>
//       <button onClick={() => navigate("/about")}>Go to About</button>
//     </nav>
//   );
// }
// export default Navbar;

import React from "react";
import {useNavigate} from "react-router-dom";
function Navbar() {
  const navigate = useNavigate();
  return (
    <nav>     
    <button onClick={() => navigate("/about", { state: { data: 30 } })}>
  Go to About with Data
</button>
    </nav>
  );
}
export default Navbar;