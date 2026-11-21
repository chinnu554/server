import {hashPassword, comparePassword} from '../utils/bcrypt.utils.js';
import {registerValidator} from '../validators/auth.validator.js';
import {throwError} from '../utils/throwError.js';
import User from "../models/user.model.js";

export const registerService = async (userData) =>{
    
        const dataValidation = registerValidator.safeParse(userData);
        if(!dataValidation.success){
            throwError(dataValidation.error.issues[0].message, 400, false);
        }
        const {username,email,password} = dataValidation.data;

        const existingUser = await User.findOne({email});

        if(existingUser){
            throwError("User already exists", 400, false);
        }

        const hashedPassword = await hashPassword(password);
        await User.create({
            username,
            email,
            password:hashedPassword
        });
        
}