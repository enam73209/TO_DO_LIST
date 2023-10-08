const mongoose = require('mongoose');
const DataSchema=mongoose.Schema({
    FirstName:{type:String},
    LastName:{type:String},
    EmailAddress:{type:String,unique:true,
        validate: {
            validator:(value)=>{
               return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value);
            },
            message: "Invalid Email Address"
        }
    },
    MobileNumber:{type:String,unique: true,
    validate:{
        validator:(value)=>{
            return /(^(\+88|0088)?(01){1}[3456789]{1}(\d){8})$/.test(value);
        },
        message:"Invalid Bangladeshi Mobile Number"
    }},
    City:{type:String},
    UserName:{type:String,unique:true},
    Password:{type:String}
},{versionKey:false});

const ProfileModel = mongoose.model('profiles',DataSchema);
module.exports = ProfileModel;

