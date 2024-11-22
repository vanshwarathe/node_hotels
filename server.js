const express = require('express')
const app = express();//bleprint in app
const db=require('./db');
require('dotenv').config();

const bodyParser = require('body-parser');
app.use(bodyParser.json());//req.body
const PORT=process.env.PORT || 3000;
app.get('/', function (req, res) {
    res.send('welcome to my hotel how may i help you')
})

const menuRoutes=require('./routes/menuRoutes');
app.use('/menu',menuRoutes);//use the routers
    
  
const personRoutes=require('./routes/personRoutes');
app.use('/person',personRoutes);//use the routers



       

app.listen(PORT,()=>{
    console.log('listening on port 3000')
})