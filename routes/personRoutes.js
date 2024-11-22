const express = require('express');
const router = express.Router();
const Person=require('./../models/person');
const { countDocuments } = require('../models/MenuItem');

router.post('/',async (req,res)=>{
    try {
        const data = req.body;//assuming the request body contains the person data

        //vreate a new person document using mongoose model
        const newPerson = new Person(data);
        
        // Save the new person to the database using await  
        const response = await newPerson.save();
        console.log('Saved person to database');
        res.status(200).json(response);
        } 
    catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error' });
        }
         
});

router.get('/',async(req,res)=>{
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
