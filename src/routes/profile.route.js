const express = require("express");
const route = express.Router();
const profileService = require('../services/profile.service')
let key = process.env.TOKEN_KEY;

route.post('/user/profile/update', profileService.update);

route.get('/user/profile', profileService.goToProfile);

route.get("/user/profile/update/newEmail", (req, res) => {res.render("pages");
});
module.exports = route;
