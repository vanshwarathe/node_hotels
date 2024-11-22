const mongoose=require ('mongoose');
//define the mongodb connection url
const mongourl='mongodb://localhost:27017/hotels'
mongoose.connect(mongourl,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
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