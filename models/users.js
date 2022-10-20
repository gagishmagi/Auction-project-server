const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    
        password:{
            type:String,
            required:true

        },
    
        fullName:{
            type:String,
            required:false

        },
    
        phoneNumber:{
            type:String,
            required:false

        }
    }
)
const User = mongoose.model('user',UserSchema)
module.exports =User