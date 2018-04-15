const mongoose = require('mongoose');
var Schema = mongoose.Schema;
const userSchema = mongoose.Schema({
    name : { 
        type:String
    },
    lastName: {
         type:String
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
    },
    pwd: {
        type: String,
    },
   
});

module.exports = mongoose.model('User', userSchema);