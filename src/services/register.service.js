

const User=require('../model/user.model');
const Reset=require('../model/reset.model');
const Verification=require('../model/verification.model');

const mailService = require('../services/email.service');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const getAllUsers = async ()=>{
    let users = await User.find();
    return users;
}
const signUser = (u)=> {
    return jwt.sign(
        {ID: u._id},
        process.env.TOKEN_KEY,
        {expiresIn: "7d"}
    );
}
const verify = async (token) => {
    try{
    Verification.findOne({verificationToken:token}).then(async (data) => {
        if(data){
            console.log('mail ==> ',data.email)
            let user = await User.findOneAndUpdate({email:data.email},{verified:true});
            await Verification.findByIdAndRemove(data._id);
            console.log(user);
            console.log(data._id);
        }
    });
    
    

    }catch(e){
        throw(e);
    }
}
const verifyEmail = async (req,res)=> {
    try{
        verify(req.params.id);
        res.render("pages/login", { message: `Your mail is verified` });
    }
    catch(e){
        res.render("pages/login", { message: `Verification failed` });
    }
    

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
    try{
    const _verif = await Verification.create({email:user.email, verificationToken:verificationToken});
    mailService.sendMail(_user.email, verificationToken,'verify');
    }catch(e){
        throw(e)
    }
}

const register = async (req,res)=>{
    let user = req.body;
    // user.verificationToken = '';
    saveUser(user).then((data)=>{
        console.log(data);
        if(data && data.message) 
            console.log('res',data);
            res.render('pages/login',{ message:`A mail was sent to ${user.email}, check your inbox`});
    }).catch((e)=>{
        console.log(e);
        res.render('pages/register',{message:'Registration failed'/*e.message*/});
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
const reset = async (req, res) => {
    let resetRequest = req.body;
    let resetToken = jwt.sign(
        'user_emai_reset',
        process.env.TOKEN_KEY
            );
    const _verif = await Reset.create({email:resetRequest.email, resetToken:resetToken});
    mailService.sendMail(_verif.email, resetToken,'reset');
    res.render('pages/login',{ message:`A mail was sent to ${_verif.email}, check your inbox`});
}


module.exports = {
    getAllUsers,
    saveUser,
    signUser,
    verifyEmail,
    register,
    reset,
    verify
}
