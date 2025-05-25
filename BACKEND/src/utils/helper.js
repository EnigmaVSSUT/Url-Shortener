import {nanoid} from "nanoid"
import { cookieOptions } from "../config/config.js";
import jsonWebToken from "jsonwebtoken";

export const generateNanoId = (length)=>{
    return nanoid(length)
} 

export const signToken = (payload) => {
    return jsonWebToken.sign(payload, process.env.JWT_SECRET_KEY, {expiresIn: "5m"});
}

export const verifyToken = (token) => {
    return jsonWebToken.verify(token, process.env.JWT_SECRET_KEY);
}