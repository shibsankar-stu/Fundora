import React from "react";
import "./FundCard.css";

const FundCard = ({ fund }) => {
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
    </div>
  );
};

export default FundCard;
