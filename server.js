const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
const nodemailer = require('nodemailer');
const sendMail = require(__dirname + '/'+ 'sendMail.js');
/*let Issue = require('../models/issue.model');
let User = require('../models/user.model');1*/

const app = express();
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://AQACigdtuw:juhimansi@aqac-ub6hv.gcp.mongodb.net/test?retryWrites=true&w=majority"
//old uri = "mongodb+srv://RiverSong:TheDoctor@cluster0-ostej.gcp.mongodb.net/test?retryWrites=true&w=majority"

mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true });
mongoose.connection
.once('open',()=>console.log("Mongo DB database connection established successfully"))
.on('error',error =>console.log("BYE"));

const usersRouter = require('./routes/users');
const apiRouter = require('./routes/api');
const facultyRouter = require('./routes/faculty');
const loginRouter = require('./routes/login');
const generatePDF = require('./routes/generatePDF');
//this is for the npm build
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

app.use('/users', usersRouter);
app.use('/api', apiRouter);
app.use('/faculty', facultyRouter);
app.use('/login', loginRouter);
app.use('/pdf', generatePDF);
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
