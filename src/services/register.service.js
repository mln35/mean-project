

const User=require('../model/user.model');
const Verification=require('../model/verification.model');

const mailService = require('../services/email.service');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const saveUser = async(user) => {
    const _user = await User.create(user);
    let verificationToken = jwt.sign(
        {ID: _useru._id},
        process.env.TOKEN_KEY,
        {expiresIn: "7d"}
    );
    const _verif = await Verification.create({email:user.email, verificationToken:verificationToken});

    // console.log(u._id);
    // console.log(u);
    // console.log(verificationToken)
    // User.findByIdAndUpdate(u._id, {$set:{verificationToken:verificationToken}})
    const l = await User.findById(_user._id)
    // console.log(l);
    mailService.sendMail(_user.email, verificationToken);
}
save = async(user) => {
    const u = new User({
    firstname: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8)
  });
}

const getAllUsers = async ()=>{
    let users = await User.find();
    return users;
}
getVerificationToken = (u)=> {
    return jwt.sign(
        {ID: u._id},
        process.env.TOKEN_KEY,
        {expiresIn: "7d"}
    );
}
async function verify(token) {
    console.log('===>',token)
    Verification.findOne({verificationToken:token}).then(async (data) => {
        if(data){
            console.log('mail ==> ',data.email)
            let u = await User.findOneAndUpdate({email:data.email},{verified:true});
            console.log(u)
        }
    });

}
module.exports = {
    getAllUsers,
    saveUser,
    getVerificationToken,
    verify
}
