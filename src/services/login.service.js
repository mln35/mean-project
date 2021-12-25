const User=require('../model/user.model');
const nodemail=require('nodemailer');
var log={error:0, login:0};
loginPost= async(req)=>{
    let user=await User.findOne({email:req.body.email, password:req.body.password});
    if(user){
        return user;
    }
    
}
validEmail=async(_email)=>{
    var mailformat=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(_email.match(mailformat)){
        console.log(`${_email} is valid`);
    }
    else
    {
        console.log(`${_email} is valid not`);
    }
}
module.exports={loginPost,validEmail, log};