const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    firstname: {
        type:String,
        required: true,
    },
    lastname: {
        type:String,
        required:true
    },
    email: {
        type:String,
        required:true,
        unique:true
    },
    phone: {
        type:String,
    },
    password: {
        type:String,
        required:true,
        minlength:8
    },
    role:{
        type:String,
        required:true,
        default:'USER'
    },
    image:{
        type:String
    },
    verified: {
        type: Boolean,
        required: true,
        default: false
    },
    date: Date
})
module.exports= mongoose.model('User',UserSchema)
