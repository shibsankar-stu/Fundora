import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import FundCard from "../components/FundCard";
import "./fundDetails.css";

const FUND_DETAILS_API = "https://api.mfapi.in/mf"

const FundDetails = () => {
  const { code } = useParams();
  const [fund, setFund] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFund = async () => {
      try {
        const res = await axios.get(`${FUND_DETAILS_API}/${code}`);
        setFund({
          schemeName: res.data.meta.scheme_name,
          schemeCode: code,
          fundHouse: res.data.meta.fund_house,
          schemeType: res.data.meta.scheme_type,
          schemeCategory: res.data.meta.scheme_category,
          plan: res.data.meta.plan,
        });
      } catch (err) {
        console.error("Error fetching fund details:", err);
      }
    };

    fetchFund();
  }, [code]);

  return (
    <div className="fund-details-page">
      <h1 className="fund-details-heading">Fund Details</h1>

      {fund ? <FundCard fund={fund} /> : <p className="fund-loading">Loading fund data...</p>}

      <button className="back-button" onClick={() => navigate(-1)}>← Go Back</button>
    </div>
  );
};

export default FundDetails;
