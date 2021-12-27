const express = require('express');
const route = express.Router();
const loginService=require('../services/login.service');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const registerService=require('../services/register.service');
const User=require('../model/user.model');
// route.get('/user/login',async (req,res)=>{
//     res.render('pages/login', {error:loginService.log.__NO_ERROR});
// });
let key = process.env.TOKEN_KEY;

route.get('/user/login', async(req, res)=>{
    const tokenCookie=req.headers.cookie;
    console.log('##############');

    console.log(tokenCookie);
    console.log('######################');

    if(tokenCookie){
        console.log('/user/login--get');
        
        const token=tokenCookie.split(';').filter(t => t.includes('token'))[0].split("=")[1];
        console.log(token);
        const decoded = jwt.verify(token, key);
        const user=await User.findById(decoded.id);
        res.render('pages/dashboard');
        // res.json({message:'dashboard'});
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


// route.get('user/register', async(req, res)=>{
//     const tokenCookie=req.headers.cookie;
//     if(tokenCookie!=undefined){
//         const token=tokenCookie.split('=')[1];
//         const decoded=jwt.verify(token, 'secretsecret');
//         const user=await User.findById(decoded.id);
//         res.redirect('/');
//     }
//     res.render('pages/register');
// })
// route.post('/user/login', async(req, res)=>{
//     // registerService.getAllUsers().then((allUser)=>{
//     //     console.log(req.body);
//     //     console.log(allUser);
//     // }).catch((e)=>{
//     //     console.log(e);
//     // });
//     loginService.loginPost(req).then((user)=>{
//         if(user){
//             console.log(`user:${user.firstname} password:${user.password}`);
//             // res.render('main', {user:user});
//             loginService.log.login=1;
//             res.redirect('/');
//         }
//         else{
//             console.log('Error');
//             res.render('pages/login', {error: 1});
//         }
//     }).catch((e)=>{
//         console.log(e);
//     });
// });
// route.get('/user/logout', async(req, res)=>{
//     try{
//         res.render('pages/dashboard');
//     }
//     catch(error){
//         console.log(error);
//     }
    
// });
route.post('/user/logout', (req, res)=>{
    res.clearCookie('token');
    console.log('logout');
    res.redirect('/');
});
module.exports=route;