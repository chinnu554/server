import express from "express";
import authRouter from "./src/routers/auth.router.js";
import cors from "cors"

const app = express();
const allowedOrigin = [
    "http://localhost:5173",
    "https://collegechits.netlify.app"
]

app.use(express.json());
app.use(cors({
    origin:allowedOrigin,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"]
}));


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

app.use("/auth",authRouter);

export default app;