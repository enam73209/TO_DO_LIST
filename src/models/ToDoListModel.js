const mongoose = require('mongoose');
const {now} = require("mongoose");
const DataSchema = mongoose.Schema({
    UserName:{type:String},
    TodoSubject:{type:String},
    TodoDes:{type:String},
    TodoStatus:{type:String,default:"New"},
    TodoDate:{type:String,default:now}
},{versionKey:false});
const ToDoListModel = mongoose.model('ToDoLists',DataSchema);
module.exports = ToDoListModel;