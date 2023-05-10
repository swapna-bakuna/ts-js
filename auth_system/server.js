const app = require('./app')
const dotenv = require('dotenv');
dotenv.config({path: './config.env'});
const mongoose = require("mongoose");
const DB = process.env.DATABASE_LOCAL
console.log(DB,"!!!!!!!!!!!!!")
mongoose.connect("mongodb://0.0.0.0:27017/admin")   
  .then(() =>{
    console.log("database is connected sucessfully");
  }).catch((e)=>{
    console.log("====error connecting db==",e)
  })
//creating a server
const port = process.env.PORT || 3000
app.listen(port, ()=>{
    console.log('server is running on port no 3000...');
})