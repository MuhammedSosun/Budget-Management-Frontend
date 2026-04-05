import api from "../api";

export const login = async (credentials: { email: string, password: string }) => {
    const response = await api.post("/auth/login", credentials);
    return response.data;
}

export const register = async (credentials: { email: string, password: string }) => {
    const response = await api.post("/auth/register", credentials);
    return response.data;
}

export const logout = async () => {
    const response = await api.post("/auth/logout");
    return response.data;
}