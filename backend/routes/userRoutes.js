const express = require("express");
const { registerUser, loginUser } = require("../controllers/userController");
const router = express.Router();

//Register ,  and get current user info
router.route("/").post(registerUser);

//Login user routes
router.route("/login").post(loginUser);

module.exports = router;
