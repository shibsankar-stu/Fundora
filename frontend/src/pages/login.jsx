import React, { useState, useEffect } from "react";
import { loginUser } from "../services/auth";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./login.css";
import Navbar from "../components/Navbar";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogout, setShowLogout] = useState(false);
  const navigate = useNavigate();

  // ✅ Check login status from backend
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get(
          "https://fundora-backend-iqz6.onrender.com/api/user/check-auth",
          { withCredentials: true }
        );
        if (res.data.loggedIn) {
          setIsLoggedIn(true);
        }
      } catch (err) {
        setIsLoggedIn(false);
      }
    };

    checkAuth();
  }, []);

  // ✅ Login handler (no localStorage anymore)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await loginUser(form); // backend sets httpOnly cookie
      alert("Login successful");
      setIsLoggedIn(true);
      navigate("/");
    } catch (err) {
      console.error("Login error:", err);
      alert(err.response?.data?.message || err.message || "Login failed");
    }
  };

  // ✅ Logout handler (optional logout API)
  const handleLogout = async () => {
    try {
      await axios.post(
        "https://fundora-backend-iqz6.onrender.com/api/user/logout",
        {},
        { withCredentials: true }
      );
      alert("Logged out successfully");
      setIsLoggedIn(false);
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
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
