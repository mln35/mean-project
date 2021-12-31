const mongoose = require('mongoose');

const ResetSchema = new mongoose.Schema({
    email: {
        type:String,
        required:true,
    },
    resetToken:String
})
module.exports= mongoose.model('Reset',ResetSchema)
