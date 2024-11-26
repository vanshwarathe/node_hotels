const express = require('express');
const router = express.Router();
const Person=require('./../models/person');
const { countDocuments } = require('../models/MenuItem');
const {jwtAuthMiddleware,generateToken}=require('./../jwt');

//signup
router.post('/signup',async (req,res)=>{
    try {
        const data = req.body;//assuming the request body contains the person data

        //vreate a new person document using mongoose model
        const newPerson = new Person(data);
        
        // Save the new person to the database using await  
        const response = await newPerson.save();
        console.log('Saved person to database');

        const payload={
            id:response.id,
            username:response.username
        }
        console.log(JSON.stringify(payload));

        const token=generateToken(response.username);
        console.log("Token is:",token);
        
        res.status(200).json({response:response,token:token});
        } 
    catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error' });
        }
         
});

//login route
router.post('/login',async(req,res)=>{
    try{
        //extract username and password from request body
        const {username,password}=req.body;

        //find user by username
        const user=await Person.findOne({username:username});

        //if user does not exist or password does not match return error
        if(!user||!(await user.comparePassword(password))){
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        //generate token 
        const payload={
            id:user.id,
            username:user.username
        }
        const token=generateToken(payload);

        //return token as response
        res.json({token})
    }
    catch(err)
    {
        console.log(err);
        res.status(500).json({ error: 'Internal server error' }); 
    }
})

//profile route
router.get('/profile',jwtAuthMiddleware,async(req,res)=>{
    try{
        const userData=req.user;
        console.log("User Data",userData);

        const userId=userData.id;
        const user=await Person.findById(userId);

        res.status(200).json({user});
    }
    catch(err){
        console.log(err);
        res.status(500).json({ error: 'Internal server error' });  
    }
})
//get method to get person
router.get('/',jwtAuthMiddleware,async(req,res)=>{
    try{
        const data=await Person.find();
        console.log('data fetched');
        res.status(200).json(data);
    }
    catch(err){
        console.log(err);
        res.status(500).json({ error: 'Internal server error' }); 
    }
});

router.get('/:workType', async (req, res) => {
    try {
        const workType = req.params.workType; // Extract the work type from the URL parameter
    
        if(workType=='chef'||workType=='manager'||workType=='waiter'){
            const response = await Person.find({ work: workType });
            console.log('response fetched');
            res.status(200).json(response);
        }
        else{
            res.status(404).json({error:"Invalid work type"});
        }
    } 
    catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
    }
});

router.put('/:id',async (req,res)=>{
    try{
        const personId=req.params.id;
        const updatedPersonData=req.body;

        const response= await Person.findByIdAndUpdate(personId,updatedPersonData,{
            new:true,//return updated doc
            runValidators:true,//run validators
        })
        if (!response) {
            return res.status(404).json({ error: 'Person not found' });
        }
        console.log('data updated');
        res.status(200).json(response);

    }
    catch(err){
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const personId = req.params.id; 

        const response = await Person.findByIdAndDelete(personId);

        if (!response) {
            return res.status(404).json({ error: 'Person not found' });
        }
        
        console.log('data deleted');
        res.json({ message: 'Person deleted successfully' });
    } 
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
    });

module.exports=router;
