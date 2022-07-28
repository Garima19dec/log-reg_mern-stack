import "./Register.css";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  let [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    reEnterPassword: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };
  const handleRegister = () => {
    const { name, email, password, reEnterPassword } = user;
    if (name && email && password && password === reEnterPassword) {
      axios.post("http://localhost:9002/register", user).then((resp) => {
        alert(resp.data.message);
        navigate("/login");
      });
    } else {
      alert("please fill the valid data");
    }
  };
  return (
    <div className="register">
      <h1> Register </h1>
      <input
        type="text"
        name="name"
        value={user.name}
        onChange={handleChange}
        placeholder="Enter you name"
      />
      <input
        type="email"
        name="email"
        value={user.email}
        onChange={handleChange}
        placeholder="Enter you email"
      />
      <input
        type="password"
        name="password"
        value={user.password}
        onChange={handleChange}
        placeholder="Enter you password"
      />
      <input
        type="password"
        name="reEnterPassword"
        value={user.reEnterPassword}
        onChange={handleChange}
        placeholder="Re-Enter you password"
      />
      <div className="button" onClick={handleRegister}>
        Register
      </div>
      <div> Or </div>
      <div className="button" onClick={() => navigate("/Login")}>
        Login
      </div>
    </div>
  );
}

export default Register;
