const express = require('express')
const app = express();//bleprint in app
const db=require('./db');
require('dotenv').config();
const passport=require('./auth');

const bodyParser = require('body-parser');
app.use(bodyParser.json());//req.body
const PORT=process.env.PORT || 3000;

//middleware function
const logRequest=(req,res,next)=>{
    console.log(`${new Date().toLocaleString()} Request made to: ${req.originalUrl}`);
    next();//move on next phase
}

app.use(logRequest);//logging time

app.use(passport.initialize());
const LocalAuthMiddleware=passport.authenticate('local',{session:false})

app.get('/',function (req, res) {
    res.send('welcome to my hotel how may i help you')
})
//import router files
const menuRoutes=require('./routes/menuRoutes');
//use router files
app.use('/menu',menuRoutes);//use the routers
      
const personRoutes=require('./routes/personRoutes');
app.use('/person',personRoutes);//use the routers

app.listen(PORT,()=>{
    console.log('listening on port 3000')
})