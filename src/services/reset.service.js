
const redirect = async(req, res) => {
    let token = req.params.token;
    console.log(token);
    try{
        const reset_request = await Reset.findOne({resetToken:token});
        if(!reset_request)
            return res.status(400).send('Error---reset_request')
        const authResult = await bcrypt.compare(token, reset_request.resetToken);
        if(authResult){
            res.cookie('reset', token);
            res.render('pages/reset')
        }
        
    }catch(err){
        return res.status(400).send('Error', err.message)
    }
}

const saveNewPassword = (req, res) => {
    pass = req.body.password;
    pass = bcrypt.hashSync(pass, 8);

    User.findOneAndUpdate({email:req.email},{$set:{password:pass}}).then((user) => {
        if(user){
            Reset.findOneAndRemove({resetToken:req.token});
            res.render('pages/login',{resetMessage:'Password successfully reset'});
        }
    })
}
module.exports = {
    redirect,
    saveNewPassword
}