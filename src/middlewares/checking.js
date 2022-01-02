const User=require('../model/user.model');
const Reset=require('../model/reset.model');
const jwt = require("jsonwebtoken");

duplicateEmail = (req, res, next) => {
  User.findOne({
    email: req.body.email,
  }).then((user) => {
    

    if (user) {
      res.render('pages/register',{ message: "Registration failed! Email is already in use!" });
      return;
    }

    next();
  }).catch((e)=>{
    
    res.render('pages/register',{ message: "An error occured while performing registration" });
    return;
    
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

// verifyToken = (req, res, next) => {
//   module.exports.checkConnection = (req, res, next) => {
//     const tokenCookie = req.headers.cookie;
//     if (!tokenCookie) {
//       res.status(400).send({ message: "No token provided!" });
//       return;
//     }
//     const token = tokenCookie
//       .split(";")
//       .filter((t) => t.includes("token"))[0]
//       .split("=")[1];
//     console.log(token);
//     if (!token) {
//       res.status(400).send({ message: "No token provided!" });
//       return;
//     }
//     next();
//   };
// };

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

  isAdmin = (req, res, next) => {
    
  }
const requiredFields = (req, res ,next) => {
  let data = req.body;
  if(!isEmpty(data.firstname) && !isEmpty(data.lastname) && !isEmpty(data.email) && !isEmpty(data.password) && !isEmpty(data.password2))
  {
    return next();
  }
  res.render('pages/register',{message:'Firstname, Lastname, Email and Password are required'})
}

const isEmpty = (str) => {
  return !str || str === '';
}

module.exports = {
  checkPasswordLength,
  existingEmail,
  duplicateEmail,
  // verifyToken,
  verifyResetToken,
  isAdmin,
  requiredFields
};
