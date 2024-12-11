import React, { useState } from "react";
import { loginAuth } from "../../Services/LoginServices";
import { FaUserAlt } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";

import "./style.css";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await loginAuth(username, password, setError);
  };
  return (
    <div className="wrapper">
      <form onSubmit={handleSubmit} className="form-wrapper">
        <h1>Login</h1>
        <div className="input-box">
          <input
            required
            type="text"
            placeholder="Name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <FaUserAlt className="icon" />
        </div>
        <div className="input-box">
          <input
            required
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <RiLockPasswordFill className="icon" />
        </div>
        <button type="submit">Login</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default LoginPage;
