const UserModel=require("../models/UserModel");
const bcrypt=require("bcryptjs");
const ah=require("express-async-handler");//asyncHandler
const jwt=require("jsonwebtoken");

const createUser=ah(async (req,res)=>{
    const {username,email,password}=req.body;
    if(!username || !email ||!password){
        res.status(400).json({message:"all fileds are required"});
    }

    const duplicates = await UserModel.findOne({
        $or: [{ username }, { email }]
    }).lean();
    if(duplicates){
        res.status(400).json({message:"username or email already exists"})
    }

    //password hasing
    const encryptedP=await bcrypt.hash(password,10);
    const userObj={username,email,password:encryptedP}
    const userCreated=await UserModel.create(userObj)
    if(userCreated){
        return res.status(200).json({message:"user created"})
    }
    else{
        res.status(400).json({message:"user data is not valid"});  
    }
})

const loginUser=ah(async (req,res)=>{
    const {username,password}=req.body;
    const userExists=await UserModel.findOne({username});
    // const hashedPassword=await bcrypt.hash(password,10)
    if(userExists && await bcrypt.compare(password,userExists.password)){
        const accesstoken=jwt.sign({
            user:{
                username,
                email:userExists.email,
                id:userExists._id
            },   
        },
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn:"7d"}
    );
   return res.status(200).json({username,accesstoken})
    }
    
    return res.status(400).json({"message":"invalid username or password"});  
    
})

const updateUser = ah(async (req, res) => {
    const { oldP, newP } = req.body;
    // console.log(req.user.user.id);
    if (!req.user || !req.user.user.id) {
        return res.status(401).json({ message: "No token provided" });
    }
    const user = await UserModel.findById(req.user.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    if (await bcrypt.compare(oldP, user.password)) {
        user.password = await bcrypt.hash(newP, 10);
        await user.save();
        return  res.status(200).json({ message: "Password changed successfully" });
    } 
    return  res.status(403).json({ message: "Incorrect password" });
});


const deleteUser=ah(async (req,res)=>{
    if (!req.user || !req.user.user.id) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    const user=req.user.user;
    const deleted=await UserModel.findByIdAndDelete(user.id);
    if(deleted){
        return res.status(204).json({message:"deleted succesfully"});
    }
    res.status(401).json({message:"Unauthorized"});
})

//check accesstoken
const getCurrent = ah(async (req, res) => {
    res.status(200).json({
        message: "User info",
        user: req.user
    });
});

module.exports={
    createUser,
    loginUser,
    updateUser,
    getCurrent,
    deleteUser
}