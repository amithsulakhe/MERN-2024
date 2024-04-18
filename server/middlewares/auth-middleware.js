const jwt = require("jsonwebtoken");
const userData = require("../db/models/collection");
const authMiddleware = async (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) {
    return res.status(401).json({ message: "unAuthorized HTTP,Token not provide" });
  }
  const jwtToken = token.replace("Bearer ", "");
  try {
    const isVerified = jwt.verify(jwtToken, process.env.JWT_SECRET_KEY);
    const user = await userData.findOne({ email: isVerified.email }).select({ password: 0 });
    req.user = user;
    req.token = token;
    req.userID = user._id;

    //if next function is called then it will move next function ie authControllers.user
    next();
  } catch (err) {
    console.log(err);
  }
};

module.exports = authMiddleware;
