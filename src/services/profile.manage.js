const User=require('../model/user.model');
const jwt=require('jsonwebtoken');
let key = process.env.TOKEN_KEY;
getUserByToken=async (_cookie)=>{
  if(_cookie){
      const token=_cookie.split(';').filter(t => t.includes('token'))[0].split("=")[1];
      const decoded = jwt.verify(token, key);
      const user=await User.findById(decoded.id);
      return user;
  }
  else{
      console.log("error");
  }
}

const updateProfile=async(_filter, _update)=>{
  try{
    await User.findOneAndUpdate(_filter, _update, {new:true});
    console.log(`updtateProfile: User is updated -----${_update}`);
  }
  catch(e){
    console.log('in update profile', e.message);
  }
}
              
module.exports={getUserByToken, updateProfile};