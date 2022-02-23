import React, { useState } from "react";
import "./login.css";

function Login(props) {
  const [disabled, cDisabled] = useState(false);

  const submitHandler = (e) => {
    console.log("submit");

    e.preventDefault();
    cDisabled(true);
    props.client
      .login(e.target.username.value, e.target.password.value)
      .then((response) => {
        cDisabled(false);
        props.loggedIn(response.data.token);
      })
      .catch((err) => {
        alert("an error has occurred");
        console.log(err);
        cDisabled(false);
      });
  };

  return (
    <div className="loginbackground">
      <div className="login">
        Login
        <br />
        <form onSubmit={(e) => submitHandler(e)}>
          <input
            type="text"
            name="username"
            disabled={disabled}
            placeholder="username"
          />
          <br />
          <input
            type="password"
            name="password"
            disabled={disabled}
            placeholder="password"
          />
          <br />
          <br />
          <button type="submit" disabled={disabled} className="submit">
            {" "}
            Submit{" "}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
