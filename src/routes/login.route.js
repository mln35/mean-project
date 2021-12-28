const express = require('express');
const route = express.Router();
const loginService=require('../services/login.service');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const User=require('../model/user.model');

let key = process.env.TOKEN_KEY;

route.get('/user/login', async(req, res)=>{
    const tokenCookie=req.headers.cookie;
    if(tokenCookie){
        console.log('/user/login--get');
        const token=tokenCookie.split(';').filter(t => t.includes('token'))[0].split("=")[1];
        console.log(token);
        const decoded = jwt.verify(token, key);
        const user=await User.findById(decoded.id);
        
        res.render('main', {
            name:user.firstname,
            email:user.email
            });
    }
    else{
        res.render('pages/login'); 
    }
});

route.post('/user/login', async(req, res)=>{
    try{
        const user=await loginService.loginPost(req.body.email);
        // console.log(user);
        if(user){
           const authResult=await bcrypt.compare(req.body.password, user.password);
           if(authResult){
               const token=jwt.sign({id:user._id}, key,{
                   expiresIn:'24h'
               });
            //    console.log(`in loginForm token:${token}`);
               res.cookie('token', token);
               res.render('pages/dashboard', {
               name:user.firstname,
               email:user.email
               });
               loginService.log.login=1;
           }else{
               res.json({message:'Auth Failed'});
           }
       }
       else{
           res.json({message:'ERROR'});
       }
       }
       catch(error){
           res.json({message:'Auth Failed'});
       }    
});

route.get('/user/logout', (req, res)=>{
    res.clearCookie('token');
    console.log('logout');
    res.redirect('/',{logged:false});
});
route.get('/user/profile', (req, res)=>{
    res.render('pages/profile', {firstname:'Magamou', lastname:'Gueye'});
})
module.exports=route;