const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true,
    },
    name:{
        type:String,
        required:true,
    },
    mobile:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    confirm_Password:{
        type:String,
        require : true,
    },
    isAdmin:{
        type:Boolean,
        default:false,
    }
});

//Export the model
module.exports = mongoose.model('User', userSchema);