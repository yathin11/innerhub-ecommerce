import { useState } from "react";

export default function PhonePopup({ onSubmit }) {
  const [phone, setPhone] = useState("");

  const handleSubmit = () => {
    if (phone.length === 10) {
      localStorage.setItem("phone", phone);
      onSubmit(phone);
    } else {
      alert("Enter valid phone number");
    }
  };

  return (
    <div style={{ padding: "20px", background: "#eee" }}>
      <h3>Enter Phone Number</h3>

      <input
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder="Enter phone"
      />

      <br /><br />

      <button onClick={handleSubmit}>Continue</button>
    </div>
  );
}