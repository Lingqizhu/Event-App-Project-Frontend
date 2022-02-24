import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Login from "./login";
import Register from "./Register";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
