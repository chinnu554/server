import { hashPassword, comparePassword } from "../utils/bcrypt.utils.js";
import {
  registerValidator,
  loginValidator,
} from "../validators/auth.validator.js";
import { throwError } from "../utils/throwError.js";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const registerService = async (userData) => {
  const dataValidation = registerValidator.safeParse(userData);
  if (!dataValidation.success) {
    throwError(dataValidation.error.issues[0].message, 400, false);
  }
  const { username, email, password } = dataValidation.data;

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throwError("User already exists", 400, false);
  }

  const hashedPassword = await hashPassword(password);
  await User.create({
    username,
    email,
    password: hashedPassword,
  });
};

export const loginService = async (userData) => {
  const dataValidation = loginValidator.safeParse(userData);
  if (!dataValidation.success) {
    throwError(dataValidation.error.issues[0].message, 400, false);
  }
  const { email, password } = dataValidation.data;
  const existingUser = await User.findOne({ email });
  if (!existingUser) {
    throwError("Invalid email or password", 400, false);
  }
  const checkPassword = await comparePassword(password, existingUser.password);

  if (!checkPassword) {
    throwError("Invalid email or password", 400, false);
  }

  const secret = process.env.JWT_SECRET_KEY;

  const token = jwt.sign({ userId: existingUser._id }, secret, {
    expiresIn: "7d",
  });

  const user = {
    id: existingUser._id,
    username: existingUser.username,
    email: existingUser.email,
    token: token,
  };

  return user;
};

export const meService = async(userId) =>{
    const user = await User.findById(userId).select("-password");
    if(!user){
        throwError("Invalid User",400,false);
    }
    return user;
}
