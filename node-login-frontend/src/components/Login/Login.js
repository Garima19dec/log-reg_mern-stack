import React, { useState } from "react";
import "./Login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = ({ setLoginUser }) => {
  const navigate = useNavigate();
  let [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const loginHandle = () => {
    axios.post("http://localhost:9002/login", user).then((resp) => {
      alert(resp.data.message);
      setLoginUser(resp.data.user); //redirecting to homepage
      navigate("/");
    });
  };
  return (
    <div className="login">
      <h1> Login </h1>
      <input
        type="email"
        name="email"
        value={user.email}
        onChange={handleChange}
        placeholder="Enter you email..."
      />
      <input
        type="password"
        name="password"
        id="password"
        value={user.password}
        onChange={handleChange}
        placeholder="Enter you password..."
      />
      <div className="button" onClick={loginHandle}>
        Login
      </div>
      <div> Or </div>
      <div className="button" onClick={() => navigate("/register")}>
        Register
      </div>
    </div>
  );
};

export default Login;
