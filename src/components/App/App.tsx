import React from "react";
import "./App.css";
import Dogs from "../Dogs/Dogs";
import Cats from "../Cats/Cats";

const App = () => {
  return (
    <div className="App">
      <Dogs />
      <Cats />
    </div>
  );
};

export default App;
