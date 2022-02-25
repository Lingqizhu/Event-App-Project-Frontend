import React, { useState } from "react";
import { useNavigate} from "react-router-dom";
import "./login.css";

function Login(props) {
  const [disabled, cDisabled] = useState(false);
  const navigate = useNavigate();

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
        alert("Username does not exist or password is not right");
        console.log(err);
        cDisabled(false);
      })
  };

  return (
    <div>
        <div className="loginbackground">
        <form className="login" onSubmit={(e) => submitHandler(e)}>
          <h2>Event App</h2>
          <h4>Login</h4>
          <input type="text" name="username" placeholder="username" id="loginput" disabled={disabled} />
          <br />
          <input type="password" name="password" placeholder="password" id="loginput" disabled={disabled} />
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
