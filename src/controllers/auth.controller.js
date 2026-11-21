import {throwError} from "../utils/throwError.js";
import {registerService} from "../services/auth.service.js";

export const register = async (req,res) =>{
    try{
        const registerResponse = await registerService(req.body);
        return res.status(201).json({
            message:"User registered successfully",
            success:true
        })
    }
    catch(err){
        res.status(err.statusCode).json({
            message:err.message,
            success:err.success
        })
    }
}