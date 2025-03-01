import { useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0); // ✅ Moved useState outside the function

  const startTimer = () => {
    setInterval(() => {
      setCount((prevCount) => prevCount + 1); // ✅ Using functional update to avoid stale state
      console.log("New Count", count);
    }, 500);
  };

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={startTimer}>Start Timer</button>
    </div>
  );
}

h


export default App;
