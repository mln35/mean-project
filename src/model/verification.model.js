const mongoose = require('mongoose');

const VerificationSchema = new mongoose.Schema({
    email: {
        type:String,
        required:true,
        unique:true
    },
    verificationToken:String
})
module.exports= mongoose.model('Verification',VerificationSchema)
