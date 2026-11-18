import app from "./app.js";

const PORT = process.env.PORT || 61645;

app.listen(PORT,()=>{
    console.log(`Server is working on http://localhost:${PORT}`);
})

