const express = require("express");

const router = express.Router();
const {
  loginUser,
  registerUser,
  logoutUser,
  getUserDetails,
} = require("../controllers/userController");
const { isAuthenticatedUser } = require("../middleware/auth");

router.route("/login").post(loginUser);
router.route("/logout").get(logoutUser);
router.route("/register").post(registerUser);
router.route("/me").get(isAuthenticatedUser, getUserDetails);

module.exports = router;
