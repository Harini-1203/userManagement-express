const mongoose=require("mongoose");

const DbConn=async () => {
    try{
        const res=await mongoose.connect(process.env.TEST_DATABASE_URL);
        console.log("connected db");
    }catch(err){
        console.log(err);
    }
}

module.exports=DbConn;