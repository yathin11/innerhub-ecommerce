import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FiSearch, FiUser, FiShoppingBag } from "react-icons/fi";
import PhonePopup from "./PhonePopup";
import "./Navbar.css";

type LinkClassProps = {
  isActive: boolean;
};

export default function Navbar() {
  const [open, setOpen] = useState<boolean>(false);
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [hasOrders, setHasOrders] = useState<boolean>(false);

  const navigate = useNavigate();

  const linkClass = ({ isActive }: LinkClassProps): string =>
    isActive ? "nav-link active" : "nav-link";

  useEffect(() => {
    const phone = localStorage.getItem("phone");

    if (!phone) return;

    fetch(`http://localhost:5000/api/orders/${phone}`)
      .then((res: Response) => res.json())
      .then((data: unknown[]) => {
        setHasOrders(data.length > 0);
      })
      .catch(() => {
        setHasOrders(false);
      });
  }, []);

  const handleUserClick = (e: React.MouseEvent<HTMLAnchorElement>): void => {
    e.preventDefault();

    const phone = localStorage.getItem("phone");

    if (!phone) {
      setShowPopup(true);
      return;
    }

    if (!hasOrders) {
      alert("No orders found for this number");
      return;
    }

    setOpen(false);
    navigate("/track-order");
  };

  return (
    <header className="navbar">
      <div className="nav-container">
        <div className="logo">
          <NavLink to="/" onClick={() => setOpen(false)}>
            YESSIX
          </NavLink>
        </div>

        <nav className="nav-links" aria-label="Primary navigation">
          <NavLink to="/" className={linkClass}>
            Home
          </NavLink>

          <NavLink to="/about" className={linkClass}>
            About
          </NavLink>

          <NavLink to="/products" className={linkClass}>
            Shop
          </NavLink>

          <NavLink to="/contact" className={linkClass}>
            Contact
          </NavLink>
        </nav>

        <div className="nav-icons">
          <button className="nav-icon-btn" type="button" aria-label="Search">
            <FiSearch />
          </button>

          <a
            className="nav-icon-btn"
            href="/track-order"
            onClick={handleUserClick}
            aria-label="Track order"
          >
            <FiUser />
          </a>

          <NavLink
            className="nav-icon-btn"
            to="/cart"
            onClick={() => setOpen(false)}
            aria-label="Cart"
          >
            <FiShoppingBag />
          </NavLink>
        </div>

        <button
          className={`hamburger ${open ? "active" : ""}`}
          onClick={() => setOpen((prev) => !prev)}
          type="button"
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      <nav className={`mobile-menu ${open ? "show" : ""}`} aria-label="Mobile navigation">
        <NavLink to="/" onClick={() => setOpen(false)}>
          Home
        </NavLink>

        <NavLink to="/about" onClick={() => setOpen(false)}>
          About
        </NavLink>

        <NavLink to="/products" onClick={() => setOpen(false)}>
          Shop
        </NavLink>

        <NavLink to="/contact" onClick={() => setOpen(false)}>
          Contact
        </NavLink>
      </nav>

      {showPopup && (
        <PhonePopup
          onSubmit={(phone: string) => {
            localStorage.setItem("phone", phone);
            setShowPopup(false);
          }}
        />
      )}
    </header>
  );
}