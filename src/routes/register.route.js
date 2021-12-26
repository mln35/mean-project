const express = require('express');
const route = express.Router();
// const bcrypt=require('bcrypt');
const registerService = require('../services/register.service');

route.get('/user/register',async (req,res)=>{
    res.render('pages/register')
});
route.get('/user/verify/:id',async (req,res)=> {

    await registerService.verify(req.params.id)
    res.json({msg:`Your mail is verified: ${req.params.id} :)`})
    // let id = req.params.id;
    // Verification.find({verificationToken})
});
route.post('/user/register',async (req,res)=>{
        let user = req.body;
        // user.verificationToken = '';
        registerService.saveUser(user).then((r)=>{
            console.log(r);
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
