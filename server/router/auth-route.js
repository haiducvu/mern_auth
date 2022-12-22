const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth-controller");
const authMiddleware = require("../middleware/authen.middleware");

router.post("/register", authController.register);
router.post("/login", authController.login);
router.get(
  "/me",
  [authMiddleware.isAuthentication],
  authController.getUserLogin
);

module.exports = router;
