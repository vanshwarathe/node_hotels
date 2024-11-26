const jwt=require('jsonwebtoken');

const jwtAuthMiddleware=(req,res,next)=>{
    //first check the request headers has authorisation or not
    const authorization=req.headers.authorization;
    if(!authorization) return res.status(401).json({error:'Token not found'});
    //extract jwt token from request headers 
    const token=req.headers.authorization.split(' ')[1];
    if(!token) return res.status(401).json({error:'unauthorized'});

    try{
        //verify the token
        const decoded=jwt.verify(token,process.env.JWT_SECRET);

        //attach user info to thre request object
        req.user=decoded;
        next();
    }
    catch(err){
        console.error(err);
        res.status(401).json({error:'Invalid token'});
    }
}

//function to generate JWT token
const generateToken=(userData)=>{
    //generate a new JWT token using user data
    return jwt.sign(userData,process.env.JWT_SECRET);
}

module.exports={jwtAuthMiddleware,generateToken};