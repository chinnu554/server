import {throwError} from "../utils/throwError.js";
import {registerService , loginService, meService} from "../services/auth.service.js";
export const register = async (req,res) =>{
    try{
        const registerResponse = await registerService(req.body);
        return res.status(201).json({
            message:"User registered successfully",
            success:true
        })
    }
    catch(err){
        res.status(err.statusCode || 500).json({
            message:err.message,
            success:err.success
        })
    }
}

export const login = async(req,res) =>{
    try{
    const loginResponse = await loginService(req.body);
    return res.status(200).json({
        message:"Login successful",
        success:true,
        data:loginResponse
    })        
    }
    catch(err){
        res.status(err.statusCode || 500).json({
            message:err.message,
            success : err.success
        })
    }
}

export const me = async(req,res) =>{
    try{
        const meResponse = await meService(req.user.userId);
        res.status(200).json({
            message:"Authentication successful",
            success:true,
            data:meResponse
        })
    }
    catch(err){
        res.status(err.statusCode || 500).json({
            message:err.message,
            success : err.success
        })
    }
}