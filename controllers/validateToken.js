const jwt=require('jsonwebtoken');
// const ah=require('express-async-handler');

const validateToken=(req,res,next)=>{
    const token=req.headers['authorization']?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: "No token provided" });
    }
    try{
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.user=decoded;
        next();
    }catch (err) {
        return res.status(401).send('User is not authorized');
    }
}
module.exports = validateToken;