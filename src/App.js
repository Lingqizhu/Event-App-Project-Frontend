import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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

  const logOut=()=>{
    window.localStorage.removeItem("token")
    changeToken();
  }

  const client = new ApiClient(token);

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login client={client} loggedIn={loggedIn}/>} />
          <Route path="/Register" element={<Register />} />
          <Route path="/Dashboard" element={<Dashboard client={client} logOut={()=>logOut()}/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
