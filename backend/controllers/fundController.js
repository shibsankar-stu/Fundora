const axios = require("axios");

exports.searchFunds = async (req, res) => {
  const { q } = req.query;
  if (!q) return res.status(400).json({ message: "Query is required" });

  try {
    const allFundsRes = await axios.get("https://api.mfapi.in/mf");
    const allFunds = allFundsRes.data;

    const filtered = allFunds.filter((fund) =>
      fund.schemeName.toLowerCase().includes(q.toLowerCase())
    );

    res.json({ funds: filtered });
  } catch (err) {
    console.error("MFAPI Error:", err.message);
    res.status(500).json({ message: "Failed to fetch data from MFAPI" });
  }
};

exports.getFundDetails = async (req, res) => {
  const { schemeCode } = req.params;

  if (!schemeCode) {
    return res.status(400).json({ message: "Scheme code is required" });
  }

  try {
    const response = await axios.get(
      `https://api.mfapi.in/mf/${schemeCode}/latest`
    );
    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error fetching fund details:", error.message);
    res.status(500).json({ message: "Unable to fetch fund details" });
  }
};
