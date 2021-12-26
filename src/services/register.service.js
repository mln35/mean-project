const User=require('../model/user.model');
const bcrypt=require('bcrypt');//add
const jwt=require('jsonwebtoken');//add

const saveUser = async(user)=>{
    user.password= await bcrypt.hash(user.password, 10);
    const u = await User.create(user);
}
save= async(user)=>{
const u = new User({
    firstname: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8)
  });
}

const getAllUsers = async ()=>{
    let users = await User.find();
    return users;
}

module.exports={
    getAllUsers,
    saveUser
}