const mongoose = require('mongoose');
const DataSchema = mongoose.Schema({

},{versionKey:false});
const ToDoListModel = mongoose.model('ToDoLists',DataSchema);
module.exports = ToDoListModel;