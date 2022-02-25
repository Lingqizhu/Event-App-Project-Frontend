import React, { useState } from "react";
import { useNavigate} from "react-router-dom";
import "./login.css";

function Login(props) {
  const [disabled, cDisabled] = useState(false);
  const navigate = useNavigate();
  /* const [userName, setUserName] = useState("");
  const [password, setPassword] = useState(""); */

  const submitHandler = (e) => {
    e.preventDefault();
    cDisabled(true);
    props.client
      .login(e.target.username.value,e.target.password.value)
      .then( (response) => {
        cDisabled(false);
        props.loggedIn(response.data.token);
        navigate("/Dashboard")
      })
      .catch( (err) => {
        alert("Username does not exist, please register");
        console.log(err);
        cDisabled(false);
      })

  };
  /* const submitHandler = (e) => {
    console.log("submit");
    e.preventDefault();
    props.client
      .login(userName, password)
      .then((response) => {
        loggedIn(response.data.token);
      })
      .catch((err) => {
        alert("an error has occurred");
        console.log(err);
      });
  }; */

  return (
    <div>
        <div className="loginbackground">
        <form className="login" onSubmit={(e) => submitHandler(e)}>
          <h2>Event App</h2>
          <h4>Login</h4>
          <input type="text" name="username" placeholder="username" id="loginput" disabled={disabled} />
          {/* <input
            type="text"
            placeholder="username"
            id="loginput"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          /> */}
          <br />
          <input type="password" name="password" placeholder="password" id="loginput" disabled={disabled} />
         {/*  <input
            type="password"
            placeholder="password"
            id="loginput"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          /> */}
          <br />
          <br />
          <button type="submit" className="submit" disabled={disabled}>
            Login
          </button>
          <button type="submit" className="submit" onClick={()=>{navigate("/Register")}}>
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
