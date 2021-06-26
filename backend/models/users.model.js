const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const usersSchema = new Schema({

    user_Type: {type:String},
    user_Status: {type:String},
    user_Fname: {type:String , required: true},
    user_Lname: {type:String , required: true},
    user_Contact: {type:String , required: true},
    user_Email: {type:String , required: true},
    user_Address_1: {type:String},
    user_Address_2: {type:String},
    user_Address_3: {type:String},
    user_District: {type:String},
    user_Postal: {type:String},
    user_Password: {type:String}

},  {
    timestamps: true,
});

const User = mongoose.model('User', usersSchema);

module.exports = User;