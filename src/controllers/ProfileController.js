const ProfileModel = require('../models/ProfileModel');
const jwt = require('jsonwebtoken');
const {request} = require("express");
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