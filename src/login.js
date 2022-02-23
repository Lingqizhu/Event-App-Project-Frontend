import React, { useState } from "react";
import { BrowserRouter, Route, Link } from 'react-router-dom'
import "./login.css";

function Login(props) {

  const [disabled, cDisabled] = useState(false);

  const submitHandler = (e) => {
    console.log("submit");

    e.preventDefault();
    cDisabled(true);
    props.client
      .login(e.target.username.value,e.target.password.value)
      .then( (response) => {
        cDisabled(false);
        props.loggedIn(response.data.token);
      })
      .catch( (err) => {
        alert("an error has occurred");
        console.log(err);
        cDisabled(false);
      })
  };

  return (
    <div className="loginbackground">
      <form  className="login" onSubmit={(e) => submitHandler(e)}>
        Event App
        <input type="text" name="username" placeholder="username" id="loginput" disabled={disabled} />
        <br />
        <br />
        <input type="password" name="password" placeholder="password" id="loginput" disabled={disabled} />
        <br />
        <br />
        <button type="submit"  className="summit" disabled={disabled}>
          {" "}
          Login{" "}
        </button>
     {/*    <Link href="/register">Register</Link> */}
        <button type="register" className="summit">
          {" "}
          Register{" "}
        </button>
      </form>
    </div>
  );
}

export default Login;