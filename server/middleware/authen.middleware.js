const jwt = require("jsonwebtoken");
const userModel = require('../models/user-model');
const isAuthentication = (req, res, next) => {
  try {
    // 1. Get token from client
    const bearerHeader = req.headers["authorization"];
    const accessToken = bearerHeader.split(" ")[1];
    // 2. verifile token
    const decodeJwt = jwt.verify(accessToken, process.env.SECRET_JWT);
    // set userId to req object (1)
    req.userId = decodeJwt._id;
    next();
  } catch (error) {
    // send code error to use refresh token
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).send("Token Expried");
    }
    return res.status(401).send("Authentication not valid");
  }
};

const isAdmin = async (req, res, next) => {
  try {
    const userId = req.userId; // (2)
    userModel.findById({ userId });
    const user = await userModel.findById(userId);
    console.log('user', user)
    if (user.role === 'regular') {
      next();
    }
  } catch (error) {
    return res.status(401).send("Authentication not valid");
  }
}

module.exports = {
  isAuthentication: isAuthentication,
  isAdmin: isAdmin,
};
