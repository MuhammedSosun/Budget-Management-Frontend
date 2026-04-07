import api from "../api";
export const register = async (credentials: {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}) => {
  const response = await api.post("/auth/register", credentials);
  return response.data;
};
export const login = async (credentials: {
  email: string;
  password: string;
}) => {
  const response = await api.post("/auth/login", credentials);
  return response.data;
};

export const logout = async () => {
  const response = await api.post("/auth/logout");
  return response.data;
};

export const refreshToken = async () => {
  const response = await api.post(
    "/auth/refresh-token",
    {},
    {
      withCredentials: true,
    },
  );

  return response.data;
};
export const getMe = async () => {
  const response = await api.get("/auth/me");
  return response.data.user;
};
