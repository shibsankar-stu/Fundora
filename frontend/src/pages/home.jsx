import React, { useEffect, useState } from "react";
import "./Home.css";
import axios from "axios";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import FundCard from "../components/FundCard";

function Home() {
  const [query, setQuery] = useState("");
  const [funds, setFunds] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const SEARCH_FUND_API = "https://api.mfapi.in/mf"

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login"); 
    }
  }, [navigate]);

  useEffect(() => {
    const delaySearch = setTimeout(() => {
      if (query.length >= 3) {
        fetchFunds();
      } else {
        setFunds([]);
      }
    }, 500);
    return () => clearTimeout(delaySearch);
  }, [query]);

  const fetchFunds = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${SEARCH_FUND_API}/search?q=${query}`);
      setFunds(res.data);
    } catch (error) {
      console.error("Search error", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="home-wrapper">
        <div className="home-hero">
          <h1>
            🔎 Explore Mutual Funds with <span>Fundora</span>
          </h1>
          <p>
            Start typing to search funds (e.g., SBI, HDFC, Axis...) and get
            instant results!
          </p>
          <input
            type="text"
            className="search-input"
            placeholder="Search mutual funds..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        {loading && <p className="loading">Searching...</p>}

        <div className="search-results">
          {funds.map((fund, idx) => (
            <div className="fund-card" key={idx}>
              <h3
                onClick={() => navigate(`/fund/${fund.schemeCode}`)}
                style={{ cursor: "pointer" }}
              >
                {fund.schemeName}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Home;
