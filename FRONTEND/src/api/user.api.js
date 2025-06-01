import axiosInstance from "../utils/axiosInstance";

export const loginUSer = async (email, password) => {
    const { data } = await axiosInstance.post("/api/auth/login", {
        email,
        password,
    });
    return data;
};

export const registerUser = async (name, email, password) => {
    const { data } = await axiosInstance.post("/api/auth/register", {
        name,
        email,
        password,
    });
    console.log("Registration sucess");
    
    return data;
};

export const logOutuser = async () => {
    const { data } = await axiosInstance.post("/api/auth/logout");
    console.log(data);
    
    return data;
};

export const getCurrentUser = async () => {
    const { data } = await axiosInstance.get("/api/auth/me");
    return data;
};

export const getAllUserUrls = async () => {
    const res = await axiosInstance.post("/api/user/urls");
    return res.data.urls;
};