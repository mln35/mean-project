const express = require("express");
const route = express.Router();
const loginService = require("../services/login.service");

route.get("/user/login", loginService.goToLogin);

route.post("/user/login", loginService.login);

route.get("/user/logout", loginService.logout);

module.exports = route;
