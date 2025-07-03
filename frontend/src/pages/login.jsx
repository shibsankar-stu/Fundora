import React, { useState, useEffect } from "react";
import { loginUser } from "../services/auth";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import Navbar from "../components/Navbar";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogout, setShowLogout] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser(form);
      const token = res.token;
      localStorage.setItem("token", token);
      alert("Login successful");
      navigate("/");
    } catch (err) {
      console.error("Login error:", err);
      alert(err.response?.data?.message || err.message || "Login failed");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    alert("Logged out successfully");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <>
      <Navbar />
      <div className="login-container">
        {!isLoggedIn ? (
          <form className="login-form" onSubmit={handleSubmit}>
            <h2 className="form-title">Login</h2>
            <input
              type="email"
              placeholder="Email"
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
            <button type="submit">Login</button>
          </form>
        ) : (
          <div
            className="logout-hover-box"
            onMouseEnter={() => setShowLogout(true)}
            onMouseLeave={() => setShowLogout(false)}
          >
            <h2 className="form-title">You are already logged in</h2>
            {showLogout && (
              <button className="logout-hover-btn" onClick={handleLogout}>
                Logout
              </button>
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default Login;
