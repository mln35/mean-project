const User=require('../model/user.model');
const jwt=require('jsonwebtoken');

let key = process.env.TOKEN_KEY;


const getToken = (cookie) => {
    let userToken = null;
    if (cookie) {
      const tokens = cookie.split(";").filter((t) => t.includes("token"));
      if (tokens && tokens.length > 0) {
        const token = tokens[0].split("=")[1];
        if (token) {
          userToken = token;
        }
      }
    }
    return userToken;
}
const getUserByToken=async (_cookie)=>{
    let user = null;
    if(_cookie){
        const token = getToken(_cookie);
        if(token){
            const decoded = jwt.verify(token, key);
            user = await User.findById(decoded.id);
        }
        
    }
    return user;
  }

  module.exports={getToken, getUserByToken};