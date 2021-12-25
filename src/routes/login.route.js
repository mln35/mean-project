const express = require('express');
const route = express.Router();
const loginService=require('../services/login.service');
const registerService=require('../services/register.service');

route.get('/user/login',async (req,res)=>{
    res.render('pages/login', {error:loginService.log.__NO_ERROR});
});
route.post('/user/login', async(req, res)=>{
    // registerService.getAllUsers().then((allUser)=>{
    //     console.log(req.body);
    //     console.log(allUser);
    // }).catch((e)=>{
    //     console.log(e);
    // });
    loginService.loginPost(req).then((user)=>{
        if(user){
            console.log(`user:${user.firstname} password:${user.password}`);
            // res.render('main', {user:user});
            loginService.log.login=1;
            res.redirect('/');
        }
        else{
            console.log('Error');
            res.render('pages/login', {error: 1});
        }
    }).catch((e)=>{
        console.log(e);
    });
});

module.exports=route;