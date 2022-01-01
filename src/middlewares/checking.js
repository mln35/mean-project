const User=require('../model/user.model');
const Reset=require('../model/reset.model');
const jwt = require("jsonwebtoken");

duplicateEmail = (req, res, next) => {
  User.findOne({
    email: req.body.email,
  }).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (user) {
      res.status(400).send({ message: "Failed! Email is already in use!" });
      return;
    }

    next();
  });
};

existingEmail = (req, res, next) => {
  User.findOne({
    email: req.body.email,
  }).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (!user) {
      res.status(400).send({ message: "Failed! User does not exist!" });
      return;
    }

    next();
  });
};

checkPasswordLength = (req, res, next) => {
  if (req.body.password.length < 6) {
    res
      .status(400)
      .send({ message: "Failed! Password must be at least six characters!" });
    return;
  }
  next();
};

verifyToken = (req, res, next) => {
  module.exports.checkConnection = (req, res, next) => {
    const tokenCookie = req.headers.cookie;
    if (!tokenCookie) {
      res.status(400).send({ message: "No token provided!" });
      return;
    }
    const token = tokenCookie
      .split(";")
      .filter((t) => t.includes("token"))[0]
      .split("=")[1];
    console.log(token);
    if (!token) {
      res.status(400).send({ message: "No token provided!" });
      return;
    }
    next();
  };
};

verifyResetToken = async (req, res, next) => {
  // module.exports.checkConnection = async (req, res, next) => {
    const tokenCookie = req.headers.cookie;
    if (!tokenCookie) {
      res.status(400).send({ message: "No token provided!" });
      return;
    }
    const token = tokenCookie
      .split(";")
      .filter((t) => t.includes("reset"))[0]
      .split("=")[1];
    if (!token) {
      res.status(400).send({ message: "No token provided!" });
      return;
    }
    await Reset.findOne({resetToken:token}).then((data) => {
        if(!data){
          res.status(400).send({ message: "Request not found!" });
          return;
        }
        req.email = data.email;
        req.token = token;
    });

    next();
  };


module.exports = {
  checkPasswordLength,
  existingEmail,
  duplicateEmail,
  verifyToken,
  verifyResetToken
};
