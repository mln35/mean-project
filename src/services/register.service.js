

const User=require('../model/user.model');
const Verification=require('../model/verification.model');

const mailService = require('../services/email.service');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// save = async(user) => {
//     const u = new User({
//     firstname: req.body.username,
//     email: req.body.email,
//     password: bcrypt.hashSync(req.body.password, 8)
//   });
// }

const getAllUsers = async ()=>{
    let users = await User.find();
    return users;
}
const getVerificationToken = (u)=> {
    return jwt.sign(
        {ID: u._id},
        process.env.TOKEN_KEY,
        {expiresIn: "7d"}
    );
}
const verify = async (token) => {
    Verification.findOne({verificationToken:token}).then(async (data) => {
        if(data){
            console.log('mail ==> ',data.email)
            let user = await User.findOneAndUpdate({email:data.email},{verified:true});
            console.log(user);
        }
    });

}
const verifyEmail = async (req,res)=> {

    await verify(req.params.id)
    res.json({msg:`Your mail is verified: ${req.params.id} :)`})

 }

const saveUser = async(user) => {
    user.password = bcrypt.hashSync(user.password, 8);
    user.date = new Date();
    const _user = await User.create(user);
    let verificationToken = jwt.sign(
        {ID: _user._id},
        process.env.TOKEN_KEY,
        {expiresIn: "7d"}
    );
    const _verif = await Verification.create({email:user.email, verificationToken:verificationToken});

    mailService.sendMail(_user.email, verificationToken);
}

const register = async (req,res)=>{
    let user = req.body;
    // user.verificationToken = '';
    saveUser(user).then((data)=>{
        console.log(data);
        if(data && data.message) 
            console.log('res',data);
        res.render('pages/login');
    }).catch((e)=>{
        console.log(e);
        res.render('pages/register',{msg:e.message});
        // console.log(e);
    });
    // if(result.error){
    //     console.log('there was error');
    //     res.json(result.error);
    // }else{
    //     console.log('pb');
    //     res.render('pages/login');
    // }
}
const reset = (req, res) => {

}
const saveNewPassword = (req, res) => {

}

module.exports = {
    getAllUsers,
    saveUser,
    getVerificationToken,
    verifyEmail,
    register,
    reset,
    saveNewPassword
}
