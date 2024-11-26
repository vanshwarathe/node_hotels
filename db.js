const mongoose=require ('mongoose');
require('dotenv').config();
//define the mongodb connection url
//const mongourl=process.env.mongoDB_URL_local;
const mongourl=process.env.mongoDB_URL;
mongoose.connect(mongourl)
//get default connection
//mongoose maintains a default connection object representing mongodb connection
const db=mongoose.connection;

//define event listener for database connection
db.on('connected',() => {
    console.log('Connected to MongoDB server ');
});

db.on('error',(err) => {
    console.error('MongoDB Connection error',err);
});

db.on('disconnected',() => {
    console.log('MongoDB disconnected');
});

//export the database connection

module.exports=db;