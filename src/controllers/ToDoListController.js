const ToDoListModel = require('../models/ToDoListModel');
exports.CreateToDo=async (req,res)=>{
    let UserName = req.headers['username'];
    let TodoSubject = req.body['TodoSubject'];
    let TodoDescription = req.body['TodoDescription'];
    let TodoStatus = "New";
    let TodoCreateDate = Date.now();
    let TodoUpdateDate = Date.now();
    let PostBody={
        UserName:UserName,
        TodoSubject:TodoSubject,
        TodoDescription:TodoDescription,
        TodoStatus:TodoStatus,
        TodoCreateDate:TodoCreateDate,
        TodoUpdateDate:TodoUpdateDate

    };
    //res.send(reqBody);
    try{
        let ToDOList = await ToDoListModel.create(PostBody);
        if(ToDOList){
            res.status(200).json({status:"success",data:ToDOList});
        }
        else{
            res.status(401).json({status:"fail",data:"Something Went Wrong"});
        }
    }catch (e){
        res.status(400).json({status:"fail",data:e.toString()});
    }
}


exports.SelectToDo = async (req,res)=>{
    let UserName = req.headers['username'];
    try{
        let ToDoLists = await ToDoListModel.find({UserName:UserName});
        if(ToDoLists){
            res.status(200).json({status:"success",data:ToDoLists});
        }
        else{
            res.status(401).json({status:"fail",data:"Not Found"});
        }
    }catch (e) {
        res.status(400).json({status:"fail",data:e.toString()});
    }
}


exports.UpdateToDo = async (req,res)=>{
    let UserName = req.headers['username'];
    let id = req.body['_id'];
    let TodoSubject=req.body['TodoSubject'];
    let TodoDescription=req.body['TodoDescription'];
    let TodoUpdateDate = Date.now();
    let PostBody ={
        TodoSubject:TodoSubject,
        TodoDescription:TodoDescription,
        TodoUpdateDate:TodoUpdateDate
    }
    try{
        let UpdatedToDo = await ToDoListModel.updateOne({_id:id,UserName:UserName},PostBody);
        if(UpdatedToDo){
            res.status(200).json({status:"success",data:"ToDo Has been Updated Successfully"});
        }
        else{
            res.status(401).json({status:"fail",data:"Update Failed"});
        }
    }catch (e) {
        res.status(400).json({status:"fail",data:e.toString()});
    }
}

exports.UpdateStatusToDo=async (req,res)=>{
    let UserName = req.headers['username'];
    let TodoStatus = req.body['TodoStatus'];
    let id = req.body['_id'];
    let TodoUpdateDate=Date.now();
    let PostBody={
        TodoStatus:TodoStatus,
        TodoUpdateDate:TodoUpdateDate
    }
    try{
      let UpdatedStatusTodo = await ToDoListModel.updateOne({_id:id,UserName:UserName},PostBody,{ runValidators: true });
      if(UpdatedStatusTodo){
          res.status(200).json({status:"success",data:"ToDo Status Has been Updated Successfully"});
      }
      else{
          res.status(401).json({status:"fail",data:"Status Update Failed"});
      }
    }catch (e) {
        res.status(400).json({status:"fail",data:e.toString()});
    }
}

exports.RemoveToDo = async (req,res)=>{
    let UserName = req.headers['username'];
    let id = req.body['_id'];
    try{
        let DeletedTodo = await ToDoListModel.deleteOne({_id:id,UserName:UserName});
        if(DeletedTodo){
            res.status(200).json({status:"success",data:"ToDo  Has been Deleted Successfully"});
        }
        else{
            res.status(401).json({status:"fail",data:"Todo Delete Failed"});
        }
    }catch (e) {
            res.status(400).json({status:"fail",data:e.toString()});
    }
}

exports.SelectToDoByStatus = async (req,res)=>{
    let UserName = req.headers['username'];
    let TodoStatus = req.body['TodoStatus'];
    try{
        let SelectedTodo = await ToDoListModel.find({UserName:UserName,TodoStatus:TodoStatus});
        if(SelectedTodo){
            res.status(200).json({status:"success",data:SelectedTodo});
        }
        else{
            res.status(401).json({status:"fail",data:"Not Found"});
        }
    }catch (e){
            res.status(400).json({status:"fail",data:e.toString()});
    }
}

exports.SelectToDoByDate = async (req,res)=>{
    let UserName = req.headers['username'];
    let FormDate = new Date(req.body['FormDate']+'T00:00:00.000Z');
    let ToDate =new Date(req.body['ToDate']+'T23:59:59.999Z');
    try{
        let SelectedTodo = await ToDoListModel.find({UserName:UserName,
            TodoCreateDate:{ $gte: FormDate, $lte: ToDate}});
        if(SelectedTodo){
            res.status(200).json({status:"success",data:SelectedTodo});
        }
        else{
            res.status(401).json({status:"fail",data:"Not Found"});
        }
    }catch (e) {
            res.status(400).json({status:"fail",data:e.toString()});
    }

}