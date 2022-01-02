const User = require("../model/user.model");
const Verification = require("../model/verification.model");
const jwt = require("jsonwebtoken");
const mailService = require("../services/email.service");
const registerService = require("../services/register.service");
const common = require("../services/common.service");
let key = process.env.TOKEN_KEY;

const update = async (req, res) => {
  let user = {};
  user = req.body;
  console.log("---------------------------");
  console.log(user);
  console.log("---------------------------");
  const oldUser = await common.getUserByToken(req.headers.cookie);
  console.log(`oldData:${oldUser}`);
  console.log(`newData:${user.firstname}`);
  if (req.body.email) {
    if (req.body.email === oldUser.email) {
      //email not changed
      console.log("equality...email");
      try {
        await User.findOneAndUpdate(oldUser._id, user, { new: true });
        res.render("pages/profile", {
          prof: user,
          message: `Your modification was saved`,
        });
        // res.redirect('/user/profile');
      } catch (e) {
        console.log(e.message);
        res.json({ message: "ERROR" });
      }
    } else {
      //email is changed
      user.verified = false;
      let verificationToken = jwt.sign({ ID: oldUser._id }, key, {
        expiresIn: "7d",
      });
      await Verification.create({
        email: user.email,
        verificationToken: verificationToken,
      });
      registerService.verify(verificationToken);
      mailService.sendMail(user.email, verificationToken, "verify");
      try {
        await User.findOneAndUpdate(oldUser._id, user, { new: true });
        res.redirect("/user/profile");
      } catch (e) {
        console.log(e.message);
        res.json({ message: "ERROR" });
      }
    }
  } else {
    // console.log("email is not defined");
    // res.json({message:"ERROR:the eamil address is not defined"});
    res.render("pages/profile", { message: `Email address is required` });
  }
};
const goToProfile = async (req, res) => {
  let user = await common.getUserByToken(req.headers.cookie);
  if (user) {
      console.log(user);
    res.render("pages/profile", {
      prof: {
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        phone: user.phone,
      },
    });
  } else {
    res.render("pages/main", { message: "Error" });
  }
};

module.exports = {
  update,
  goToProfile,
};
