import { useState } from "react";
import { FiSearch, FiUser, FiShoppingBag } from "react-icons/fi";
import "./Navbar.css";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="navbar">
      <div className="nav-container">

        {/* LOGO */}
        <div className="logo">InnerHub</div>

        {/* DESKTOP MENU */}
        <nav className="nav-links">
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#products">Shop</a>
          <a href="#contact">Contact</a>
        </nav>

        {/* RIGHT SIDE ICONS */}
        <div className="nav-icons">
          <FiSearch />
          <FiUser />
          <FiShoppingBag />
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
        <a href="#home" onClick={() => setOpen(false)}>Home</a>
        <a href="#about" onClick={() => setOpen(false)}>About</a>
        <a href="#products" onClick={() => setOpen(false)}>Shop</a>
        <a href="#contact" onClick={() => setOpen(false)}>Contact</a>
      </div>
    </header>
  );
}