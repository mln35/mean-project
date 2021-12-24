const express = require('express');
const route = express.Router();
const loginService=require('../services/login.service');
const registerService=require('../services/register.service');
route.get('/user/login',async (req,res)=>{
    res.render('pages/login');
});
route.post('/user/login', async(req, res)=>{
    // registerService.getAllUsers().then((allUser)=>{
    //     console.log(req.body);
    //     console.log(allUser);
    // }).catch((e)=>{
    //     console.log(e);
    // });
    loginService.loginPost(req.body.email).then((user)=>{
        try{
            console.log(user.firstname);
            res.render('main', {user:user});
        }
        catch(e){
            console.log(e);
        }
        
    }).catch((e)=>{
        console.log(e);
    });
});
module.exports=route;