import { useState } from "react";
import { instance } from "../http/instance";
import useStorage from "./useStorage";

export const useAxios = () => {
  const [accessToken, setAccessToken] = useStorage("accessToken", null);
  const [refreshing, setRefreshing] = useState(false);
  const [refreshQueue, setRefreshQueue] = useState<Array<{ resolve: (value?: unknown) => void, reject: (reason?: any) => void }>>([]);

  const processQueue = (error: any, token: string | null = null) => {
    refreshQueue.forEach(({ resolve, reject }) => {
      if (error) {
        reject(error);
      } else {
        resolve(token);
      }
    });
    setRefreshQueue([]);
  };

  const refreshTokens = async () => {
    try {
      const response = await instance.get("/user/refresh", {
        withCredentials: true,
      });
      const newAccessToken = response.data.access_token;
      instance.defaults.headers["Authorization"] = `Bearer ${newAccessToken}`;
      setAccessToken(newAccessToken);
      processQueue(null, newAccessToken);
      return newAccessToken;
    } catch (error) {
      processQueue(error, null);
      setAccessToken(null);
      return Promise.reject(error);
    } finally {
      setRefreshing(false);
    }
  };

  instance.interceptors.response.use(
    (res) => res,
    async (error) => {
      const originalRequest = error.config;
      if (error.response && error.response.status === 401) {
        if (!refreshing) {
          setRefreshing(true);
          return refreshTokens()
            .then((newToken) => {
              originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
              return instance(originalRequest);
            })
            .catch((err) => {
              return Promise.reject(err);
            });
        } else {
          return new Promise((resolve, reject) => {
            setRefreshQueue(prevQueue => [...prevQueue, { resolve, reject }]);
          }).then((newToken) => {
            originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
            return instance(originalRequest);
          }).catch((err) => {
            return Promise.reject(err);
          });
        }
      }
      return Promise.reject(error);
    }
  );
};
