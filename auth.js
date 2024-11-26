//sets up passport using local strategy based on the person models
const passport=require('passport');
const LocalStrategy=require('passport-local').Strategy;
const Person=require('./models/person');
 
passport.use(new LocalStrategy(async(USERNAME,password,done)=>{
    //authentication logic here
    try{
        //console.log('Recieved credentials:',USERNAME,password);
        const user=await Person.findOne({username:USERNAME});
        if(!user)
            return done(null,false,{message:'Incorrect username.'});

        const isPasswordMatch=await user.comparePassword(password);
        if(isPasswordMatch){
            return done(null,user);
        }else{
            return done(null,false,{message:'Incorrect password'});
        }
    }
    catch(err){
        return done(err);
    }
}))

module.exports=passport;//export configured
