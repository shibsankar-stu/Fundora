import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          Fundora<span>.</span>
        </Link>

        <div className={`navbar-menu ${menuOpen ? "open" : ""}`}>
          <NavLink to="/" className="nav-link" onClick={toggleMenu}>Home</NavLink>
          <NavLink to="/login" className="nav-link" onClick={toggleMenu}>Login</NavLink>
          <NavLink to="/register" className="nav-link" onClick={toggleMenu}>Register</NavLink>
        </div>

        <div className="menu-icon" onClick={toggleMenu}>
          <div className={`bar ${menuOpen ? "rotate1" : ""}`}></div>
          <div className={`bar ${menuOpen ? "hide" : ""}`}></div>
          <div className={`bar ${menuOpen ? "rotate2" : ""}`}></div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
