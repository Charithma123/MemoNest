const express = require("express");
const cors = require("cors");
const  app = express();
const AppError = require("./utils/appError");
const globalErrorHandler= require("./controller/errorController");

app.use(cors())

app.use(express.json({limit:"10kb"}));

// Routes for note

// Error handling
app.all("*splat",(req,res,next)=>{
    next(new AppError(`Can't find ${req.originalUrl} on this server!`,404));
});


app.use(globalErrorHandler);


module.exports = app;
