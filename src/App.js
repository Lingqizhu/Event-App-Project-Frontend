import React, { useState } from "react";
import { Routes, Route, useNavigate} from "react-router-dom";
import {ApiClient} from "./apiClient";
import Login from "./login";
import Register from "./Register";
import Dashboard from "./Dashboard";

const App = () => {
  const [token,changeToken] = useState(window.localStorage.getItem("token"))

  const loggedIn = (newToken) => {
    window.localStorage.setItem("token",newToken)
    changeToken(newToken);
  }
// Navigation between pages
  const navigate= new useNavigate;
  const logOut=()=>{
    window.localStorage.removeItem("token")
    changeToken("");
    navigate("/")
  }

  const client = new ApiClient(token);
  return (
    <div>

        <Routes>
          <Route path="/" element={<Login client={client} loggedIn={loggedIn}/>} />
          <Route path="/Register" element={<Register />} />
          <Route path="/Dashboard" element={<Dashboard client={client} logOut={()=>logOut()}/>} />
        </Routes>

    </div>
  );
};

export default App;
