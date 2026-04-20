import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { FiSearch, FiUser, FiShoppingBag } from "react-icons/fi";
import PhonePopup from "../components/PhonePopup";
import "./Navbar.css";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [hasOrders, setHasOrders] = useState(false);

  const linkClass = ({ isActive }) =>
    isActive ? "active nav-link" : "nav-link";

  // ✅ Check if user has orders
  useEffect(() => {
    const phone = localStorage.getItem("phone");

    if (phone) {
      fetch(`http://localhost:5000/api/orders/${phone}`)
        .then(res => res.json())
        .then(data => {
          if (data.length > 0) setHasOrders(true);
        })
        .catch(() => {});
    }
  }, []);

  // ✅ Handle user icon click
  const handleUserClick = (e) => {
    e.preventDefault();

    const phone = localStorage.getItem("phone");

    if (!phone) {
      setShowPopup(true); // ask phone
    } else if (!hasOrders) {
      alert("No orders found for this number");
    } else {
      window.location.href = "/track-order"; // go to orders
    }
  };

  return (
    <header className="navbar">
      <div className="nav-container">

        {/* LOGO */}
        <div className="logo">
          <NavLink to="/" onClick={() => setOpen(false)}>
            InnerHub
          </NavLink>
        </div>

        {/* DESKTOP MENU */}
        <nav className="nav-links">
          <NavLink to="/" className={linkClass}>Home</NavLink>
          <NavLink to="/about" className={linkClass}>About</NavLink>
          <NavLink to="/products" className={linkClass}>Shop</NavLink>
          <NavLink to="/contact" className={linkClass}>Contact</NavLink>
        </nav>

        {/* RIGHT SIDE ICONS */}
        <div className="nav-icons">
          <FiSearch />

          {/* ✅ USER ICON CONTROLLED */}
          <a href="/track-order" onClick={handleUserClick}>
            <FiUser />
          </a>

          <NavLink to="/cart" onClick={() => setOpen(false)}>
            <FiShoppingBag />
          </NavLink>
        </div>

        {/* HAMBURGER */}
        <div
          className={`hamburger ${open ? "active" : ""}`}
          onClick={() => setOpen(!open)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      {/* MOBILE MENU */}
      <div className={`mobile-menu ${open ? "show" : ""}`}>
        <NavLink to="/" onClick={() => setOpen(false)}>Home</NavLink>
        <NavLink to="/about" onClick={() => setOpen(false)}>About</NavLink>
        <NavLink to="/products" onClick={() => setOpen(false)}>Shop</NavLink>
        <NavLink to="/contact" onClick={() => setOpen(false)}>Contact</NavLink>
      </div>

      {/* ✅ PHONE POPUP */}
      {showPopup && (
        <PhonePopup
          onSubmit={(phone) => {
            localStorage.setItem("phone", phone);
            setShowPopup(false);
          }}
        />
      )}
    </header>
  );
}