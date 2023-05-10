import express, { Express } from "express";
import mongoose, { Mongoose } from "mongoose";
import path from 'path'
import userrouter from "./routers/userRouters";
import profilerouter from "./routers/profileRouter"
import * as dotenv from "dotenv";
dotenv.config();
let app = express();
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))
app.use('/uploads',express.static(path.join(__dirname, 'uploads')))
mongoose
  .connect("mongodb://0.0.0.0:27017/typescript")
  .then(() => {
    console.log("database is connected successfully");
  })
  .catch((e) => {
    console.log("====error connecting db==", e);
  });

  app.use('/api', userrouter);
  app.use('/api', profilerouter);
const port = process.env.PORT || 3030;
app.listen(port, () => {
  console.log(`server is running on port no ${port}`);
});
module.exports = app;