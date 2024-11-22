const express = require('express');
const router = express.Router();
const MenuItem=require('./../models/MenuItem');


router.post('/', async (req, res) => {
    try {
    const data = req.body; // Assuming the request body contains menu item data

    // Create a new menu item using the Mongoose model
    const newMenu = new MenuItem(data);

    // Save the new menu item to the database
    const response= await newMenu.save();
    console.log('Menu item saved');
    res.status(201).json(response);
    } 
    catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/', async (req, res) => {
    try {
    // Use the Mongoose model to find all menu items in the database
    const data = await MenuItem.find();
    console.log('data fetched');
    // Send the list of menu items as a JSON response
    res.json(data);
    } 
    catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
    }
});
router.get('/:tasteType', async (req, res) => {
    try {
        const  tasteType= req.params.tasteType; // Extract the work type from the URL parameter
    
        if(tasteType=='sweet'||workType=='sour'||workType=='spicy'){
            const response = await MenuItem.find({ taste: tasteType });
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
        const menuId=req.params.id;
        const updatedmenuData=req.body;

        const response= await MenuItem.findByIdAndUpdate(menuId,updatedmenuData,{
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
        const menuId = req.params.id; 

        const response = await Person.findByIdAndDelete(menuId);

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
//comment for testing ok
module.exports=router