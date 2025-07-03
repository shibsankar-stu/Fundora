import React from "react";
import "./FundCard.css";
import axios from "axios";

const FundCard = ({ fund }) => {
  const handleSaveFund = async () => {
    try {
       const token = localStorage.getItem("token");
      await axios.post(
        "https://fundora-backend-iqz6.onrender.com/api/save/save-fund",
        { schemeCode: fund.schemeCode },
         {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      },
        { withCredentials: true }
      );
      alert("Fund saved successfully!");
    } catch (err) {
      console.error("Save failed:", err);
      alert(err.response?.data?.message || "Failed to save fund");
    }
  };

  return (
    <div className="fund-detail-card">
      <h2 className="fund-title">{fund.schemeName}</h2>
      <div className="fund-info">
        <p><span>Scheme Code:</span> {fund.schemeCode}</p>
        <p><span>Fund House:</span> {fund.fundHouse || "N/A"}</p>
        <p><span>Type:</span> {fund.schemeType || "N/A"}</p>
        <p><span>Category:</span> {fund.schemeCategory || "N/A"}</p>
        <p><span>Plan:</span> {fund.plan || "N/A"}</p>
      </div>
      <button className="save-fund-btn" onClick={handleSaveFund}>
        ⭐ Save Fund
      </button>
    </div>
  );
};

export default FundCard;
