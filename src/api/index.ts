import axios from "axios";

const BASE_URL = "http://localhost:3000/api";


const api = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            console.log("Oturum süresi dolmuş, Login'e yönlendiriliyor...");
        }
        return Promise.reject(error);
    }
)

export default api;