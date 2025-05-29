import axiosInstance from "../utils/axiosInstance";

export const createShortUrl = async (url,customUrl=null)=>{
    const {data} = await axiosInstance.post("/api/create", { url, customUrl });
    return data.shortUrl ;
}