const ToDoListModel = require('../models/ToDoListModel');
exports.CreateToDo=async (req,res)=>{
    let UserName = req.headers['username'];
    let reqBody = req.body;
    reqBody['UserName']=UserName;
    //res.send(reqBody);
    try{
        let ToDO = await ToDoListModel.create(reqBody);
        if(ToDO){
            res.status(200).json({status:"success",data:ToDO});
        }
        else{
            res.status(401).json({status:"fail",data:"Something Went Wrong"});
        }
    }catch (e){
        res.status(400).json({status:"fail",data:e.toString()});
    }
}