import React, { useEffect } from "react";
import api from ".";
import { useAuth } from "../hooks/useAuth";

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

        console.log("[AxiosInterceptor] error caught");
        console.log("[AxiosInterceptor] url:", originalRequest?.url);
        console.log("[AxiosInterceptor] status:", error?.response?.status);
        console.log("[AxiosInterceptor] data:", error?.response?.data);

        const isRefreshRequest = originalRequest?.url?.includes(
          "/auth/refresh-token",
        );

        if (isRefreshRequest) {
          console.log(
            "[AxiosInterceptor] refresh request failed directly, skipping retry",
          );
          return Promise.reject(error);
        }

        if (error?.response?.status === 401 && !originalRequest?._retry) {
          originalRequest._retry = true;
          console.log("[AxiosInterceptor] trying refresh-token again");

          try {
            const { data } = await api.post(
              "/auth/refresh-token",
              {},
              { withCredentials: true },
            );

            console.log("[AxiosInterceptor] refresh success:", data);

            api.defaults.headers.common["Authorization"] =
              `Bearer ${data.accessToken}`;

            originalRequest.headers["Authorization"] =
              `Bearer ${data.accessToken}`;

            return api(originalRequest);
          } catch (refreshError) {
            console.log(
              "[AxiosInterceptor] refresh retry failed:",
              refreshError,
            );
            await logout();
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
