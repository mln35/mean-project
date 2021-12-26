const User=require('../model/user.model');
const nodemail=require('nodemailer');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
var log={error:0, login:0};
loginPost= async(_email)=>{
    try{
        let user=await User.findOne({email:_email});
        if(user){
        return user;
        }
    }
    catch(e){
        console.log(e);
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
loginForm=async(obj)=>{
    try{
        const user=await User.findOne({email:obj.email});
        console.log(`in loginForm email:${user.email}`);
     if(user.length>0){
        const authResult=await bcrypt.compare(obj.password, user.password);
        if(authResult){
            const token=jwt.sign({id:user._id}, 'secretsecret',{
                expiresIn:'24h'
            });
            console.log(`in loginForm token:${token}`);
            res.cookie('token', token);
            res.render('pages/dashboard', {
            name:user.name,
            email:user.email
            });
        }else{
            res.send('Auth Failed');
        }
    }
    }
    catch(error){
        res.send('Auth Failed');
    }
}
module.exports={loginPost,validEmail, loginForm,log};