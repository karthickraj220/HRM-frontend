import axios from "axios";

const API = axios.create({
    baseURL: "https://hrm-backend-api-ue97.onrender.com/api",
});

// Automatically include access token
API.interceptors.request.use((req) => {
    const token = localStorage.getItem("token");
    if (token) req.headers.Authorization = `Bearer ${token}`;
    return req;
});

export default API;
