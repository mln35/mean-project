const express = require('express');
const route = express.Router();
const User=require('../model/user.model');
const Verification=require('../model/verification.model');
const jwt=require('jsonwebtoken');
let key = process.env.TOKEN_KEY;
const manageProfile=require('../services/profile.manage');
const mailService=require('../services/email.service');
const registerService=require('../services/register.service');
// const profMW=require('../middlewares/profiler');
// route.post('/user/profile/update', profMW.defEmail, profMW.emailComparator);

route.post('/user/profile/update', async(req, res)=>{
    let user={};
    user=req.body;
    console.log('---------------------------');
    console.log(user);
    console.log('---------------------------');
    const oldUser=await getUserByToken(req.headers.cookie);
    console.log(`oldData:${oldUser}`);
    console.log(`newData:${user.firstname}`);
    if(req.body.email){
        if(req.body.email===oldUser.email){
            console.log("equality...email");
            try{
                await User.findOneAndUpdate(oldUser._id, user, {new:true});
                res.redirect('/user/profile');
            }
            catch(e){
                console.log(e.message);
                res.json({message:"ERROR"});
            }
        }
        else{
            //email is changed
            user.verified=false;
            let verificationToken = jwt.sign(
                {ID: oldUser._id},
                 key,
                {expiresIn: "7d"}
            );
           await Verification.create({email:user.email, verificationToken:verificationToken});
            registerService.verify(verificationToken);
            mailService.sendMail(user.email, verificationToken);
            try{
                await User.findOneAndUpdate(oldUser._id, user, {new:true});
                res.redirect('/user/profile');
            }
            catch(e){
                console.log(e.message);
                res.json({message:"ERROR"});
            }
        }
    }
    else{
        console.log("email is not defined");
        res.json({message:"ERROR:the eamil address is not defined"});
    }    
    
});

route.get('/user/profile', async (req, res)=>{
    manageProfile.getUserByToken(req.headers.cookie).then((user)=>{
        res.render('pages/profile', {
            prof:{
                firstname:user.firstname,
                lastname:user.lastname,
                email:user.email,
                phone:user.phone,
            }});
    }).catch((e)=>{
        res.json({message:"ERROR"});
        console.log(e);
    })
});

route.get('/user/profile/update/newEmail', (req, res)=>{
    res.render('pages')
})
module.exports=route;









