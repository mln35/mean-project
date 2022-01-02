const User = require("../model/user.model");
const nodemail = require("nodemailer");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const express = require("express");
let key = process.env.TOKEN_KEY;

const loginPost = async (_email) => {
  try {
    let user = await User.findOne({ email: _email });
    if (user) {
      return user;
    }
  } catch (e) {
    console.log(e);
  }
};
const validEmail = async (_email) => {
  var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (_email.match(mailformat)) {
    console.log(`${_email} is valid`);
  } else {
    console.log(`${_email} is valid not`);
  }
};

const loginForm = async (obj) => {
  try {
    const user = await User.findOne({ email: obj.email });
    console.log(`in loginForm email:${user.email}`);
    if (user) {
      const authResult = await bcrypt.compare(obj.password, user.password);
      if (authResult) {
        const token = jwt.sign({ id: user._id }, "secretsecret", {
          expiresIn: "24h",
        });
        console.log(`in loginForm token:${token}`);
        res.cookie("token", token);
        res.render("pages/dashboard", {
          name: user.name,
          email: user.email,
        });
      } else {
        res.send("Incorrect password");
      }
    } else res.send("Incorrect email");
  } catch (error) {
    res.send("Auth Failed");
  }
};

const goToLogin = async (req, res) => {
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
};

const login = async (req, res) => {
  try {
      const user = await loginPost(req.body.email);
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
              req.app.locals.current = user;
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
}

const logout = (req, res) => {
  res.clearCookie("token");
  console.log("logout");
  res.redirect("/");
};

const goToProfile = (req, res) => {
  res.render("pages/profile", { firstname: "Magamou", lastname: "Gueye" });
};

module.exports = {
  loginPost,
  validEmail,
  loginForm,
  login,
  goToLogin,
  logout,
  goToProfile,
};
