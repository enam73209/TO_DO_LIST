const ProfileModel = require('../models/ProfileModel');
const OTPModel = require('../models/OTPModel');
const jwt = require('jsonwebtoken');
const {request} = require("express");
const SendEmailUtility = require('../utility/SendEmailUtility');
exports.CreateProfile=async (req,res)=>{
    let reqBody = req.body;
    try{
        let result = await ProfileModel.create(reqBody);
        if(result){
            res.status(201).json({status:"success",data:result});
        }
        else{
            res.status(201).json({status:"Fail",data:"Something went wrong"});
        }
    }catch (e){
        res.status(400).json({status:"Fail",data:e.toString()});
    }
}

exports.UserLogin =async (req,res)=>{
    let UserName = req.body['UserName'];
    let Password = req.body['Password'];
    try{
        let result = await ProfileModel.find({UserName:UserName,Password:Password});
        if(result.length>0){
            let Payload = {exp:Math.floor(Date.now() / 1000) + (60 * 60),
                data:result[0]};
            let Token= jwt.sign(Payload,"SecretKey123");
            res.status(200).json({status:"success",Token:Token,data:result[0]})
        }
        else{
            res.status(401).json({status:"fail",data:"Unauthorized"})
        }
    }catch (e) {
            res.status(400).json({status:"fail",data:"Unauthorized"})
    }


}

exports.SelectProfile=async (req,res)=>{
        let Username = req.headers['username'];
        try{
            let UserProfile =await ProfileModel.find({UserName:Username});
            if(UserProfile){
                res.status(200).json({status:"success",data:UserProfile})
            }
            else{
                res.status(400).json({status:"fail",data:"Not Found"})
            }
        }catch (e){
                res.status(400).json({status:"fail",data:e.toString()})
        }


}

exports.UpdateProfile=async (req,res)=>{
    let UserName = req.headers['username'];
    let reqBody = req.body;
    try{
        let ProfileUpdate = await ProfileModel.updateOne({UserName:UserName},reqBody,{ runValidators: true });
        if(ProfileUpdate){
            res.status(200).json({status:"success",data:"profile updated successfully"});
        }
        else{
            res.status(400).json({status:"success",data:"Something went wrong"});
        }
    }catch (e){
            res.status(400).json({status:"success",data:e.toString()});
    }
}

exports.RecoverVerifyEmail=async (req,res)=>{
    let email = req.params.email;
    let OTPCode = Math.floor(100000 + Math.random() * 900000);
    let EmailText="Your Verification Code is ="+OTPCode
    let EmailSubject="Task manager verification code"

    let result= await ProfileModel.find({EmailAddress:email}).count();
    if(result===1){
        // Verification Email
        await SendEmailUtility(email,EmailText,EmailSubject);
        await OTPModel.create({email:email,otp:OTPCode})
        res.status(200).json({status:"success",data:"6 Digit Verification Code has been send"})

    }
    else{
        res.status(200).json({status:"fail",data:"No User Found"})
    }

}
exports.VerifyOTP = async (req,res)=>{
    let email =req.body['EmailAddress'];
    let OTPCode =req.body['otp'] ;
    let status =0;
    let UpdateStatus = 1;
     try{
         let CheckingExpiry = await OTPModel.find({email:email,otp:OTPCode,status:status});
         let CreatedAt = CheckingExpiry[0].createdAt;
         const CurrentTime = new Date();
         const timeDifferenceMs = CurrentTime - CreatedAt;
         const otpExpirationTimeMs = 5 * 60 * 1000; //5 min
         if(timeDifferenceMs <= otpExpirationTimeMs){
             let result = await OTPModel.find({email:email,otp:OTPCode,status:status}).count();
             if(result===1){
                 await  OTPModel.updateOne({email:email,otp:OTPCode,status:status},{status:UpdateStatus});
                 res.status(200).json({status:"success",data:"Verification successfully completed"});
             }
             else{
                 res.status(200).json({status:"Fail",data:"Invalid Verification"});
             }
         }
         else{
             res.status(200).json({status:"Fail",data:"OTP has been expired"});
         }

     }catch (e) {
         res.status(400).json({status:"Fail",data:"Invalid Verification"});
     }
}

exports.UpdatePassword = async (req,res)=>{
    let email = req.body['EmailAddress'];
    let OTPCode=req.body['otp'];
    let NewPassword=req.body['Password'];
    let status = 1;
    try{
        let result = await OTPModel.find({email:email,otp:OTPCode,status:status}).count();
        if(result ===1){
            let Updated_Password=await ProfileModel.updateOne({EmailAddress:email},{
                Password:NewPassword});
            if(Updated_Password){
                res.status(200).json({status:"success",data:"Password update success"});
            }
            else{
                res.status(200).json({status:"fail",data:"Password update failed"});
            }
        }
        else{
            res.status(400).json({status:"fail",data:"Invalid verification"});
        }
    }catch (e) {
            res.status(400).json({status:"fail",data:e.toString()});
    }
}
