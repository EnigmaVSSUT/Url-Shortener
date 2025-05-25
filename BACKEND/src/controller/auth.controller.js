import { cookieOptions } from "../config/config.js";
import { loginUserService, registerUserService } from "../services/auth.service.js";
import wrapAsync from "../utils/tryCatchWrapper.js";

export const registerUser = wrapAsync(async (req, res, next) => {
    const {name,email,password} = req.body
    const token = await registerUserService(name,email,password);
    req.user = user;
    res.cookie("accessToken",token,cookieOptions)
    res.status(200).json("user creation success");
});

export const loginUser = wrapAsync(async (req, res, next) => {
    const {email,password} = req.body
    const token = await loginUserService(email,password);
    req.user = user;
    res.cookie("accessToken",token,cookieOptions)
    res.status(200).json("user login success");
});
