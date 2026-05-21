import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Admin.css";

export default function AdminLogin() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    if (email === "admin@innerhub.com" && password === "1234") {
      localStorage.setItem("admin", "true");
      navigate("/admin");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <main className="admin-auth-page">
      <form className="admin-auth-card" onSubmit={handleLogin}>
        <p className="admin-kicker">InnerHub Admin</p>
        <h1 className="admin-title">Login</h1>

        <label className="admin-field">
          <span>Email</span>
          <input
            className="admin-input"
            type="email"
            placeholder="admin@innerhub.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>

        <label className="admin-field">
          <span>Password</span>
          <input
            className="admin-input"
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>

        <button className="admin-btn primary full" type="submit">
          Login
        </button>
      </form>
    </main>
  );
}