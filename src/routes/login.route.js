const express = require("express");
const route = express.Router();
const loginService = require("../services/login.service");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../model/user.model");

let key = process.env.TOKEN_KEY;

route.get("/user/login", async (req, res) => {
    const tokenCookie = req.headers.cookie;
    if (req.app.locals.logged === true) {
        console.log("/user/login--get");
        const token = tokenCookie
            .split(";")
            .filter((t) => t.includes("token"))[0]
            .split("=")[1];
        console.log(token);
        const decoded = jwt.verify(token, key);
        const user = await User.findById(decoded.id);
        res.render("main");
    } else {
        res.render("pages/login");
    }
});

route.post("/user/login", async (req, res) => {
    try {
        const user = await loginService.loginPost(req.body.email);
        // console.log(user);
        if (user && user.verified) {
            const authResult = await bcrypt.compare(req.body.password, user.password);
            if (authResult) {
                const token = jwt.sign({ id: user._id }, key, {
                    expiresIn: "24h",
                });
                //    console.log(`in loginForm token:${token}`);
                res.cookie("token", token);
                res.locals.logged = true;
                res.render("main", {
                    name: user.firstname,
                    email: user.email,
                });
                req.app.locals.current=user;
            } else {
                res.render("pages/login", { message: `Login failed` });
            }
        }else
        if (user && !user.verified) {
            res.render("pages/login", {
                message: `Your account is waiting for verification`,
            });
        } else {
            res.render("pages/login", { message: `Login failed` });
            //    res.json({message:'Auth Failed'});
        }
    } catch (error) {
        res.render("pages/login", { message: `Login failed` });
        // res.json({ message: error.message });
    }
});

route.get("/user/logout", (req, res) => {
    res.locals.logged = false;
    res.clearCookie("token");
    res.clearCookie("reset");
    res.render("main");
});

// route.get("/user/profile", (req, res) => {
//     res.render("pages/profile", { firstname: "Magamou", lastname: "Gueye" });
// });
module.exports = route;
