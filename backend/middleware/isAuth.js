const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  try {

    const token = req.cookies.token; 
    if (!token) {
      return res
        .status(401)
        .json({ message: "No token provided, access denied" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; 
    next();

  } catch (err) {
    console.error("JWT Auth Error:", err.message);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = auth;
