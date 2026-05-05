import api from "../api";
import { v4 as uuidv4 } from "uuid";
export const register = async (credentials: {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}) => {
  const response = await api.post("/auth/register", credentials, {
    headers: { "x-idempotency-key": uuidv4() },
  });
  return response.data;
};
export const login = async (credentials: {
  email: string;
  password: string;
}) => {
  const response = await api.post("/auth/login", credentials, {
    headers: { "x-idempotency-key": uuidv4() },
  });
  return response.data;
};
export const googleLogin = async (credential: string) => {
  const response = await api.post(
    "/auth/google",
    { credential },
    {
      headers: { "x-idempotency-key": uuidv4() },
    },
  );

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
