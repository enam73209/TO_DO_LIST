//Basic Lib import
const express = require('express');
const router = require('./src/routes/api');
const app = new express();
const bodyParser = require('body-parser');

//Security Lib import
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const hpp = require('hpp');
const cors = require('cors');


//Database Lib import
const mongoose = require('mongoose');

//Body Parser Implement
app.use(bodyParser.json());

//Security Middleware Implement

app.use(cors());
app.use(helmet());
app.use(mongoSanitize());
app.use(hpp());
//rate Limit Implement
const limiter = rateLimit({windowMs:15*60*1000,max:3000});
app.use(limiter);

//Mongo DB Database Connection
let uri='mongodb://0.0.0.0:27017/ToDo';
let options = {user:'', pass:'',autoIndex:true}

mongoose.connect(uri,options)
    .then(() => {
        console.log('Connected to MongoDB');
        // Your code here
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });

//Routing Implement
app.use("/api/v1",router);

//Undefined Routing Implement
app.use("*",(req,res)=>{
  res.status(404).json({status:"Fail",data:"Not Found"})
})



module.exports = app
