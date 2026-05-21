import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CustomerLogin.css";

export default function CustomerLogin() {
  const [phone, setPhone] = useState<string>("");
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    const cleanPhone = phone.replace(/\D/g, "");

    if (cleanPhone.length !== 10) {
      alert("Please enter a valid 10 digit phone number");
      return;
    }

    localStorage.setItem("phone", cleanPhone);
    navigate("/track-order");
  };

  return (
    <main className="customer-login-page">
      <form className="customer-login-card" onSubmit={handleLogin}>
        <p className="customer-login-kicker">YESSIX</p>
        <h1>Track Your Order</h1>

        <p className="customer-login-text">
          Enter the mobile number used during checkout to view your order status.
        </p>

        <label className="customer-login-field">
          <span>Phone Number</span>
          <input
            type="tel"
            inputMode="numeric"
            maxLength={10}
            placeholder="9876543210"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </label>

        <button type="submit">Continue</button>
      </form>
    </main>
  );
}