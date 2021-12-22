const express=require('express');
const route=express.Router();


route.get('/',async (req,res)=>{
    res.render('layouts/home',{appName:'MEAN PROJECT',authors:'MLN - MG'})
})



module.exports=route;