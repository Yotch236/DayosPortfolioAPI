const express = require("express");
const UserController = require("../controller/user");
const {verify} = require("../auth");

const R = express.Router();

R.post("/register",UserController.registerUser);
R.post("/login",UserController.LoginUser);
R.get("/details", verify, UserController.GetUsers);

module.exports = R;