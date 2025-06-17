import axios, { isAxiosError } from "axios";

const axiosInstance = axios.create({
    baseURL: "https://linksnap-backend.vercel.app",
    // baseURL: "http://localhost:5000",
    timeout: 10000,
    withCredentials: true
});

// make error handler for axios
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if(error.response) {
            const { status, data } = error.response;
            switch(status) {
                case 401:
                    console.log("Unauthorized");
                    break;
                case 403:
                    console.log("Forbidden");
                    break;
                case 404:
                    console.log("Not Found");
                    break;
                case 500:
                    console.log("Server Error");
                    break;
            }
        }else if(error.request) {
            console.log("Network Error");
        }else {
            console.log("Something went wrong");
        }
        return Promise.reject({
            message: error.response?.data?.message || error.message || "Something went wrong",
            status: error.response?.status || 500,
            data: error.response?.data,
        });
    }
);

 

export default axiosInstance;