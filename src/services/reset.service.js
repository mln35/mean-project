Reset = require('../model/reset.model');
bcrypt = require('bcrypt');
User= require('../model/user.model');
const redirect = async(req, res) => {
    let token = req.params.token;
    console.log('tooooken', token);
    try{
        const reset_request = await Reset.findOne({resetToken:token});
        console.log('request', reset_request);
        if(!reset_request){
            return res.status(400).send('Error---reset_request');
            console.log('resetRequest');
        }
        // const authResult = await bcrypt.compare(token, reset_request.resetToken);

        if(token === reset_request.resetToken){
            console.log('authRes');
            res.cookie('reset', token);
            res.render('pages/reset')
        }
    }catch(err){
        console.log('catch', err.message);
        return res.render('pages/login', {message: 'Error while reseting password'})
    }
}

const saveNewPassword = async(req, res) => {
    pass = req.body.password;
    pass = bcrypt.hashSync(pass, 8);

    User.findOneAndUpdate({email:req.email},{$set:{password:pass}}).then(async (user) => {
        if(user){
            await Reset.findOneAndRemove({resetToken:req.token});
            res.render('pages/login',{resetMessage:'Password successfully reset'});
        }
    })
}
module.exports = {
    redirect,
    saveNewPassword
}