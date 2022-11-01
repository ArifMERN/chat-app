import "./App.css";
import React from "react";

const App = () => {
  const display = () => {
    document.getElementById("drop-down").classList.add("show");
    document.getElementById("drop-down").classList.remove("hide");
  };
  const hidden = () => {
    document.getElementById("drop-down").classList.add("hide");
    document.getElementById("drop-down").classList.remove("show");
  };
  const data = ["one", "two", "three"];
  return (
    <div className="App">
      <div className="card">
        <select name="" id="drop-down" className="show">
          {data.map((val, i) => (
            <option value={i}>{val}</option>
          ))}
        </select>
        <h3>Should you use Dropdown?</h3>
        <button id="yes" onMouseOver={display}>
          Yes
        </button>
        <button id="no" onMouseOver={hidden}>
          Probably not
        </button>
      </div>
    </div>
  );
};

export default App;
