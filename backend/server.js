const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://RiverSong:TheDoctor@cluster0-ostej.gcp.mongodb.net/test?retryWrites=true&w=majority"
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true });
mongoose.connection
.once('open',()=>console.log("Mongo DB database connection established successfully"))
.on('error',error =>console.log("BYE"));

const usersRouter = require('./routes/users');
const apiRouter = require('./routes/api');
const facultyRouter = require('./routes/faculty');
//const dashboard = require('./routes/dashboard')

app.use('/users', usersRouter);
app.use('/api', apiRouter);
app.use('/faculty', facultyRouter);
//app.use('/dashboard');

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
