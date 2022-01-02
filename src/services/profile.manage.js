const User=require('../model/user.model');
const jwt=require('jsonwebtoken');
let key = process.env.TOKEN_KEY;


const updateProfile = async(_filter, _update)=>{
  try{
    await User.findOneAndUpdate(_filter, _update, {new:true});
    console.log(`updtateProfile: User is updated -----${_update}`);
  }
  catch(e){
    console.log('in update profile', e.message);
  }
}

              
module.exports={updateProfile};