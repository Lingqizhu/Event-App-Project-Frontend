import React from "react";
import Dashboard from "./Dashboard";
import { ApiClient } from "./apiClient";
import { useState} from 'react'
import Login from "./login";
import Register from "./Register";

function App() {
  const [token,changeToken] = useState(window.localStorage.getItem("token"))

  const logout = () => {
    window.localStorage.removeItem("token")
    changeToken("")
  }

  const loggedIn = (newToken) => {
    window.localStorage.setItem("token",newToken)
    changeToken(newToken);
  }

  /* const register=(newToken)=>{
    window.localStorage.setItem("token",newToken)
    changeToken(newToken);
  } */

  const logOut=()=>{
    localStorage.removeItem("token")
    changeToken();
  }

  const client = new ApiClient(
    token,
    logout
  );

  return (
    <>
      {token ? (
        <Dashboard client={client} logOut={()=>logOut()}/>
      ) : (
        <Login client={client} loggedIn={loggedIn} />
      )}

    </>
  );
}

export default App;