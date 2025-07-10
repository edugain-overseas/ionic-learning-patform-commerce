import axios, { AxiosError } from "axios";
import { instance } from "../instance";
import { Dispatch, SetStateAction } from "react";

let isRefreshing = false;
let failedQueue: {
  resolve: (token: string) => void;
  reject: (err: any) => void;
}[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token!);
    }
  });
  failedQueue = [];
};

export const setupInterceptors = (
  logout: () => void,
  setAccessToken: Dispatch<SetStateAction<null>>
) => {
  instance.interceptors.response.use(
    (response) => response,
    async (error: AxiosError<any>) => {
      const originalRequest = error.config as any;

      const isTokenExpired =
        error.response?.status === 401 &&
        error.response?.data?.detail === "Access token expired";

      if (isTokenExpired && !originalRequest._retry) {
        originalRequest._retry = true;

        if (isRefreshing) {
          // Wait until the ongoing refresh finishes
          return new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          }).then((token) => {
            originalRequest.headers["Authorization"] = `Bearer ${token}`;
            return instance(originalRequest);
          });
        }

        isRefreshing = true;

        try {
          const { data } = await instance.post("/user/refresh-token", null, {
            withCredentials: true,
          });

          const newAccessToken = data.access_token;

          instance.defaults.headers[
            "Authorization"
          ] = `Bearer ${newAccessToken}`;
          setAccessToken(newAccessToken);

          processQueue(null, newAccessToken);

          originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return instance(originalRequest);
        } catch (refreshError) {
          processQueue(refreshError, null);
          logout();
          return Promise.reject(refreshError);
        } finally {
          isRefreshing = false;
        }
      }

      return Promise.reject(error);
    }
  );
};
