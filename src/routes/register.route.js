const express = require('express');
const route = express.Router();
// const bcrypt=require('bcrypt');
const registerService = require('../services/register.service');


route.get('/user/register',async (req,res)=>{
    res.render('pages/register')
})

route.post('/user/register',async (req,res)=>{
    // req.body.password= await bcrypt.hash(password, 10);
        registerService.saveUser(req.body).then((r)=>{
            if(r && r.message) 
                    console.log('res',r);
            res.render('pages/login');
        }).catch((e)=>{
            console.log(e);
            res.render('pages/register',{msg:e.message});
            // console.log(e);
        });
        // if(result.error){
        //     console.log('there was error');
        //     res.json(result.error);
        // }else{
        //     console.log('pb');
        //     res.render('pages/login');
        // }
    });


// route.get('/',async (req,res)=>{
//     let user = await userServices.createUser(req.body);
//     res.render('index',{cars});
// })

// route.get('/contact',async (req,res)=>{
//     res.render('pages/contact');
// })
// route.post('/submit',async (req,res)=>{
//     let message = req.body;
//     console.log(message);
//     // console.log(JSON.stringify(message));
//     res.json({message:"Recu"});

// })
// route.get('/about',(req,res)=>{
//     res.render('pages/about');
// })

// route.get('/cars',async (req,res)=>{
//     let cars=await carServices.getAllCars();
//     res.render('pages/cars_list',{cars});
// })

module.exports=route;