const User=require('../model/user.model');
const jwt=require('jsonwebtoken');
let key = process.env.TOKEN_KEY;
const manageProfile=require('../services/profile.manage');
defEmail = async(req, res, next) => {
    if(req.body.email){
        console.log(`In middleware verify email:${req.body.email}`);
        next();
    }
    else{
        console.log("email is not defined");
        res.json({message:"ERROR:the eamil address is not defined"});
    }
    
}
emailComparator=async(req, res, next)=>{
    try{
        const oldData=await manageProfile.getUserByToken(req.headers.cookie);
        if(oldData.email===req.body.email){
            // console.log(`in middleware emailComparator---oldData:${oldData}`);
            console.log(`in middleware emailComparator---newData:${req.body.firstname}`);
            console.log('equality equality equality');
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


module.exports ={defEmail, emailComparator};