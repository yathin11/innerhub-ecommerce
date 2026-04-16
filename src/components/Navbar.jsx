import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FiSearch, FiUser, FiShoppingBag } from "react-icons/fi";
import "./Navbar.css";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const linkClass = ({ isActive }) =>
    isActive ? "active nav-link" : "nav-link";

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

          <NavLink to="/track-order" onClick={() => setOpen(false)}>
            <FiUser />
          </NavLink>

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
    </header>
  );
}