const express = require('express');
const route = express.Router();
const User=require('../model/user.model');

route.get('/user/profile', (req, res)=>{
    console.log(`currentUser: ${req.app.locals.current}`);//
    
    res.render('pages/profile', {prof:{
    firstname:req.app.locals.current.firstname, 
    lastname:req.app.locals.current.lastname,
    email:req.app.locals.current.email,
    phone:req.app.locals.current.phone
}});
});
route.param('username', function(req, res, next, username){
    User.findOne({firstname: username}).then(function(user){
      if (!user) { return res.sendStatus(404); }
  
      req.profile = user;
  
      return next();
    }).catch(next);
  });

module.exports=route;