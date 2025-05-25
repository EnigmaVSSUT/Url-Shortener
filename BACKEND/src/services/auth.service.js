import { createUser, findUserByEmail } from "../dao/user.dao.js";
import User from "../models/user.model.js";
import  jsonWebToken from "jsonwebtoken";
import { ConflictError } from "../utils/errorHandler.js";
import { signToken } from "../utils/helper.js";

export const registerUserService = async (name, email, password) => {
    const user = await findUserByEmail(email)
    if(user) throw new ConflictError("User already exists");
    const newUser = await createUser(name,email,password);
    const token = await signToken({id : newUser._id})
    return token
};

export const loginUserService = async (email,password) => {
    const user = await findUserByEmail(email)
    if(!user) throw new Error("User not found");
    if(user.password !== password) throw new Error("Invalid password");
    const token = signToken({id : user._id})
    return token
};