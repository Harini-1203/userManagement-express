require("dotenv").config()
const express=require("express");
const app=express();
app.use(express.json());

//databse
const DbConn=require("./config/DbConn");
DbConn();

//routes
const UserRouter=require("./routes/UserRoutes");
app.use('/',UserRouter);

//doc
const swaggerDocs = require("./config/swagger");
swaggerDocs(app);
module.exports=app;
app.listen(3000,()=>{
    console.log("on 3000 port");
})
