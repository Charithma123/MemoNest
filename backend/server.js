const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({path:"./config.env"});

const app = require("./app");


const DB = process.env.DB.replace("<PASSWORD>",process.env.DB_PASSWORD);
mongoose.connect(DB).then(()=>{
    console.log("DB connection successful!");
}).catch((err)=> console.log("DB connection error:",err));
const port = process.env.PORT || 3000


const server = app.listen(port,()=>{
    console.log(`App running on port ${port}...`);
});


// connect db later