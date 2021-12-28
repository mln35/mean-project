const express = require('express');
const route = express.Router();


route.get('/user/profile', (req, res)=>{
    res.render('pages/profile', {firstname:'Magamou', lastname:'Gueye'});
});
module.exports=route;