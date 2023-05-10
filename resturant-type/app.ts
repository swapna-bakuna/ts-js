import express, { Application, Request, Response, NextFunction } from 'express';
import mongoose, { ConnectOptions } from 'mongoose';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import  userrouter  from './routes/userRouter';
import  menurouter from './routes/menuRouter';
import  billrouter from './routes/billRouter';

dotenv.config({ path: './config.env' });

const app: Application = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.connect('mongodb://0.0.0.0:27017/resturantts', {
  useNewUrlParser: true,
  //useUnifiedTopology: true,
  //useCreateIndex: true,
  //useFindAndModify: false
} as ConnectOptions)
  .then(() => {
    console.log('Database is connected successfully');
  }).catch((e) => {
    console.log('====Error connecting db==', e);
  });

app.use('/api', userrouter);
app.use('/api', menurouter);
app.use('/api', billrouter);
const port = process.env.PORT || 3003;
app.listen(port, () => {
  console.log(`server is running on port no ${port}`);
});
module.exports = app;