import axios from "axios";
import { getAccessToken } from "./interceptors/tokenStore";
import { serverBaseUrl } from "./server";

export const instance = axios.create({
  baseURL: serverBaseUrl,
  withCredentials: true,
});

instance.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});