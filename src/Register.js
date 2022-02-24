import { useState } from "react";
import { useNavigate} from "react-router-dom";
import "./Register.css";

function Register() {

  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  async function registerUser(event) {
    event.preventDefault();
    const response = await fetch("http://localhost:3000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userName,
        password,
      }),
    });
  }

  return (
    <div  className="registerbackground">
      <form onSubmit={registerUser} className="register">
      <h2>Event App</h2>
      <h4>Register</h4>
        <input
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          type="text"
          placeholder="Name"
          id="registerinput"
        />
        <br />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
          id="registerinput"
        />
        <br />
        <input type="submit" className="submit" value="Register" />
        <input type="submit" className="submit" value="login" onClick={()=>{navigate("/login")}} />
      </form>
    </div>
  );
}

export default Register;
