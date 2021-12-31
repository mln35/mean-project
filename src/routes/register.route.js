const express = require('express');
const route = express.Router();
const bcrypt=require('bcrypt');
const Reset = require('../model/reset.model')
const registerService = require('../services/register.service');
const checking = require('../middlewares/checking');

route.get('/user/register',async (req,res)=>{
    res.render('pages/register');
});

route.get('/user/verify/:id',registerService.verifyEmail);

route.post('/user/register',registerService.register);

route.get('/user/reset-request',(req,res)=>{
    res.render('pages/reset-request.hbs')
});

route.post('/user/reset-request',registerService.reset);

route.get('/user/reset/:token', async(req, res) => {
    let token = req.params.token;
    try{
        const reset_request = await Reset.findOne({resetToken:token});
        if(!reset_request)
            return res.status(400).send('Error')
        const authResult = await bcrypt.compare(token, reset_request.resetToken);
        res.cookie('reset', token);
        res.render('pages/reset')
    }catch(err){
        return res.status(400).send('Error')
    }
});

route.post('/user/reset',[checking.verifyResetToken],registerService.saveNewPassword);

module.exports=route;
