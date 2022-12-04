const express = require("express");
const router = express.Router();
const userController = require("../controllers/user-controller");
const authMiddleware = require("../middleware/authen.middleware");

router.get(
  "/user",
  [authMiddleware.isAuthentication],
  userController.getListUsers
);

router.post(
  "/user/create",
  [authMiddleware.isAuthentication, authMiddleware.isAdmin],
  userController.postUser
);

router.delete(
  "/user/delete/:userId",
  [authMiddleware.isAuthentication, authMiddleware.isAdmin],
  userController.deleteUser
);

module.exports = router;
