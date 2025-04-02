const mongoose=require("mongoose");

const DbConn=async () => {
    try{
        const res=await mongoose.connect("mongodb+srv://hariniyadav1203:chikky1203@cluster0.crzsxdm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
        console.log("connected db");
    }catch(err){
        console.log(err);
    }
}

module.exports=DbConn;