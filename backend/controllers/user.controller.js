const User = require("../models/User");
const bcrypt = require("bcryptjs");

exports.getUserProfile = async (req, res) => {
  // add Header Authorization
  try {
    const userId = req.user._id;

    const user = await User.findById(userId).select("-password"); // without password
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ user });
  } catch (error) {
    console.error("Get Profile Error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};



exports.saveFundToUser = async (req, res) => {
  const userId = req.user._id;
  console.log("saveFundToUser userId:", userId); // Debugging line
  const { schemeCode, schemeName, fundHouse } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const alreadySaved = user.savedFunds.some(
      (f) => f.schemeCode === schemeCode
    );
    if (alreadySaved) return res.status(409).json({ message: "Already saved" });

    user.savedFunds.push({ schemeCode, schemeName, fundHouse });
    await user.save();

    res.status(200).json({ message: "Fund saved successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getSavedFunds = async (req, res) => {
  const userId = req.user._id;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ savedFunds: user.savedFunds });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
