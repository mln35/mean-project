const express = require('express');
const route = express.Router();
const bcrypt=require('bcrypt');
const Reset = require('../model/reset.model')
const registerService = require('../services/register.service');
const checking = require('../middlewares/checking');
const resetService = require('../services/reset.service')
route.get('/user/register',async (req,res)=>{
    res.render('pages/register');
});

route.get('/user/verify/:id',registerService.verifyEmail);

route.post('/user/register',[checking.requiredFields, checking.duplicateEmail],registerService.register);

route.get('/user/reset-request',(req,res)=>{
    res.render('pages/reset-request.hbs')
});

route.post('/user/reset-request',registerService.reset);

route.get('/user/reset/:token', resetService.redirect);

route.post('/user/reset',[checking.verifyResetToken],resetService.saveNewPassword);

module.exports=route;
