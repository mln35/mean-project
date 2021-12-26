const express=require('express');
const route=express.Router();
const loginService=require('../services/login.service');

route.get('/',async (req,res)=>{
    res.render('main', {login:loginService.log.login});
})

module.exports=route;