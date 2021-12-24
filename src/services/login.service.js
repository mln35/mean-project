const User=require('../model/user.model');
const nodemail=require('nodemailer');
loginPost= async(_email)=>{
    let user=await User.findOne({email:_email});
        if(user){
            return user;
        }
}
validEmail=async(_email)=>{
    var mailformat=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(_email.match){
        console.log(`${_email} is valid`);
    }
    else
    {
        console.log(`${_email} is valid not`);
    }
}
module.exports={loginPost,validEmail};