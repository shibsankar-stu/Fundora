import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import "./Profile.css";

const USER_API = "https://fundora-backend-iqz6.onrender.com/api/user";
const FUND_API = "https://fundora-backend-iqz6.onrender.com/api/save"

const Profile = () => {
  const [user, setUser] = useState({});
  const [savedFunds, setSavedFunds] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      fetchProfile();
    }
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await axios.get(`${USER_API}/profile`, {
        withCredentials: true,
      });
      const funds = await axios.get(`${FUND_API}/saved-funds`,{
          withCredentials: true,
        }
      );

      setUser(res.data.user);
      setSavedFunds(funds.data.savedFunds || []);
    } catch (err) {
      console.error("Failed to fetch profile", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p className="loading">Loading profile...</p>;

  return (
    <>
      <Navbar />
      <div className="profile-container">
        <h2>Your Profile</h2>
        <div className="profile-box">
          <p>
            <strong>Name:</strong> {user.fullname}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
        </div>

        <h3>Saved Funds</h3>
        <div className="fund-list" >
          {savedFunds.length === 0 ? (
            <p>No saved funds found.</p>
          ) : (
            savedFunds.map((fund) => (
              <div className="fund-card" key={fund._id} 
              onClick={() => navigate(`/fund/${fund.schemeCode}`)}>
                <h4>{fund.schemeName}</h4>
                <p>Fund House: {fund.fundHouse}</p>
                <p>Scheme Code: {fund.schemeCode}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default Profile;
