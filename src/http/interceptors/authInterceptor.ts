import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { instance } from "../instance";
import { getAccessToken } from "./tokenStore";

type RetriableConfig = InternalAxiosRequestConfig & { _retry?: boolean };

const refreshClient = axios.create({
  baseURL: instance.defaults.baseURL,
  withCredentials: true,
});

const SKIP_REFRESH_URLS = [
  "/user/login",
  "/user/refresh",
  "/user/logout",
  "/user/activate",
  "/user/login-with-google",
  "/user/login-with-apple",
];

const shouldSkip = (url?: string) =>
  SKIP_REFRESH_URLS.some((u) => url?.includes(u));

let refreshPromise: Promise<string> | null = null;

export const setupInterceptors = (
  clearSession: () => void,
  onTokenRefreshed: (token: string) => void,
) => {
  const refreshAccessToken = () => {
    if (!refreshPromise) {
      refreshPromise = refreshClient
        .get<{ access_token: string }>("/user/refresh")
        .then(({ data }) => {
          onTokenRefreshed(data.access_token);
          return data.access_token;
        })
        .catch((error) => {
          clearSession();
          throw error;
        })
        .finally(() => {
          refreshPromise = null;
        });
    }
    return refreshPromise;
  };

  const interceptorId = instance.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      const original = error.config as RetriableConfig | undefined;

      if (
        !original ||
        error.response?.status !== 401 ||
        original._retry ||
        shouldSkip(original.url) ||
        !getAccessToken()
      ) {
        return Promise.reject(error);
      }

      original._retry = true;

      try {
        const token = await refreshAccessToken();
        original.headers.Authorization = `Bearer ${token}`;
        return instance(original);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    },
  );

  return () => instance.interceptors.response.eject(interceptorId);
};