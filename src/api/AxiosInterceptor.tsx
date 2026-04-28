import React, { useEffect } from "react";
import api from ".";
import { useAuth } from "../hooks/useAuth";
import axios from "axios";

interface Props {
  children: React.ReactNode;
}

export const AxiosInterceptors = ({ children }: Props) => {
  const { logout } = useAuth();

  useEffect(() => {
    const responseInterceptors = api.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        const isRefreshRequest = originalRequest?.url?.includes(
          "/auth/refresh-token",
        );

        if (isRefreshRequest) {
          return Promise.reject(error);
        }

        if (error?.response?.status === 401 && !originalRequest?._retry) {
          originalRequest._retry = true;

          try {
            const { data } = await api.post(
              "/auth/refresh-token",
              {},
              { withCredentials: true },
            );

            api.defaults.headers.common["Authorization"] =
              `Bearer ${data.accessToken}`;

            originalRequest.headers["Authorization"] =
              `Bearer ${data.accessToken}`;

            return api(originalRequest);
          } catch (refreshError) {
            if (
              axios.isAxiosError(refreshError) &&
              (refreshError.response?.status === 401 ||
                refreshError.response?.status === 403)
            ) {
              await logout();
            }
            return Promise.reject(refreshError);
          }
        }

        return Promise.reject(error);
      },
    );

    return () => api.interceptors.response.eject(responseInterceptors);
  }, [logout]);

  return <>{children}</>;
};
