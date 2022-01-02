const express = require("express");
const route = express.Router();
const loginService = require("../services/login.service");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../model/user.model");

let key = process.env.TOKEN_KEY;

route.get("/user/login", loginService.goToLogin);

route.post("/user/login", loginService.login);

route.get("/user/logout", (req, res) => {
    res.locals.logged = false;
    res.clearCookie("token");
    res.clearCookie("reset");
    res.render("main");
});

module.exports = route;
