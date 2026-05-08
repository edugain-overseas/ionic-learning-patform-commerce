import { AxiosError } from "axios";
import { instance } from "../instance";
import { Dispatch, SetStateAction } from "react";

let isRefreshing = false;

let failedQueue: {
  resolve: (token: string) => void;
  reject: (error: any) => void;
}[] = [];

let refreshPromise: Promise<string> | null = null;

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((p) => {
    if (error) {
      p.reject(error);
    } else {
      p.resolve(token!);
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
      const originalRequest: any = error.config;

      const status = error.response?.status;
      const detail = error.response?.data?.detail;

      const isRefreshRequest = originalRequest?.url?.includes(
        "/user/refresh-token"
      );

      // refresh token помер -> logout
      if (isRefreshRequest && status === 401) {
        logout();
        return Promise.reject(error);
      }

      const isAccessExpired =
        status === 401 && detail === "Access token expired";

      if (!isAccessExpired) {
        return Promise.reject(error);
      }

      // already retried
      if (originalRequest._retry) {
        return Promise.reject(error);
      }

      originalRequest._retry = true;

      // якщо refresh already running
      if (isRefreshing && refreshPromise) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return instance(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      isRefreshing = true;

      refreshPromise = new Promise(async (resolve, reject) => {
        try {
          const { data } = await instance.get("/user/refresh", {
            withCredentials: true,
          });

          const newToken = data.access_token;

          instance.defaults.headers.Authorization = `Bearer ${newToken}`;

          setAccessToken(newToken);

          processQueue(null, newToken);

          resolve(newToken);
        } catch (err) {
          processQueue(err, null);

          logout();

          reject(err);
        } finally {
          isRefreshing = false;
          refreshPromise = null;
        }
      });

      try {
        const token = await refreshPromise;

        originalRequest.headers.Authorization = `Bearer ${token}`;

        return instance(originalRequest);
      } catch (err) {
        return Promise.reject(err);
      }
    }
  );
};
