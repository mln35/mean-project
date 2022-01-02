const User=require('../model/user.model');
const jwt=require('jsonwebtoken');
let key = process.env.TOKEN_KEY;
const manageProfile=require('../services/profile.manage');

const defEmail = async(req, res, next) => {
    if(req.body.email){
        next();
    }
    else{
        res.json({message:"ERROR:the eamil address is not defined"});
    }
    
}
const emailComparator=async(req, res, next)=>{
    try{
        const oldData=await manageProfile.getUserByToken(req.headers.cookie);
        if(oldData.email===req.body.email){
            const update={
                firstname:req.body.firstname,
                lastname:req.body.lastname,
                email:req.body.email,
                phone:req.body.phone
            }
            try{
                await User.findOneAndUpdate(_filter, _update, {new:true});
                console.log(`updtateProfile: Object is up to date -----${_update}`);
              }
              catch(e){
                console.log('in update profile', e.message);
              }
            res.redirect('/user/profile');
        }
        else{
            console.log('difference difference difference');
            res.json({message:'email is changed'});
            next();
        }
        
    }
    catch(e){
        console.log(e.message);
    }
    
}

module.exports = {
    defEmail, 
    emailComparator
};