import express from "express";
import mongodb ,{MongoClient} from'mongodb';
import path from 'path'
import userrouter from "./routes/userRouters";
import * as dotenv from "dotenv";
dotenv.config();
let app = express();
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))
app.use('/uploads',express.static(path.join(__dirname, 'uploads')))

const connectToDatabase = async () => {
  try {
    const options: any = {
      useNewUrlParser: true,
    };
    const client = await MongoClient.connect( "mongodb://0.0.0.0:27017/type-mongo", options);
    //console.log(client);
        //{useNewUrlParser: true},
    const db = client.db("mydatabase");
    console.log("Connected to database!");
    return db;
  } catch (err) {
    console.log("Failed to connect to database:", err);
    process.exit(1);
  }
};

const startServer = async () => {
  const db = await connectToDatabase();
  app.locals.db = db; 
}
startServer();

app.use('/api', userrouter);
const port = process.env.PORT || 8081
app.listen(port, () => {
  console.log(`server is running on port no ${port}`);
});
module.exports = app;