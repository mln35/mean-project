const User=require('../model/user.model');

const saveUser = async(user)=>{
    try{
        await User.create(user);
    }catch(e){
        throw(e)
    }
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