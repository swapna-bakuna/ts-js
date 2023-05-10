const express = require("express");
const  app = express();
const bodyParser = require("body-parser");
app.use(express.json());
//app.use(bodyParser.json)
app.use(bodyParser.urlencoded({extended: false}));
//app.use(bodyParser.raw({ type: 'application/vnd.custom-type' }))
const userrouter = require('./Routes/userRoutes');
const profilerouter = require('./Routes/profileRoutes')
const scorerouter = require('./Routes/scoreRouter')
app.use('/api',userrouter);
app.use('/api', profilerouter);
app.use('/api', scorerouter);
module.exports = app;