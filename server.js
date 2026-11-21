import app from "./app.js";
import dotenv from "dotenv";
import connectDb from "./src/configs/mongoConnect.js";

dotenv.config();

const PORT = process.env.PORT;

connectDb();

app.listen(PORT,()=>{
    console.log(`Server is working on http://localhost:${PORT}`);
})

