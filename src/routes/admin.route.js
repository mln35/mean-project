const express = require("express");
const route = express.Router();
const adminService = require("../services/admin.service");
const checking = require("../middlewares/checking");

route.get("/user/admin",[checking.isAdmin], adminService.admin);

module.exports = route;
