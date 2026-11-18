import express from "express";

const app = express();
app.use(express.json());


app.get("/",(req,res)=>{
    console.log("Server is opened");
    return res.status(200).json({
        message:"Server is opened",
        success:true
    })
})

app.get("/api/v1/test",(req,res)=>{
    console.log("Test API is working");
    return res.status(200).json({
        message:"Test API is working",
        success:true
    })
})

export default app;