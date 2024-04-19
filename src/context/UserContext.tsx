import React, { createContext, useContext, useEffect, useState } from "react";
import { instance } from "../http/instance";
import { AxiosError } from "axios";

interface UserProviderType {
  children: React.ReactNode;
}

interface UserType {
  accessToken: string | null;
  userId: number | null;
  userType: string | null;
  name: string;
  surname: string;
  username: string;
  email: string;
  phone: string;
  country: string;
  avatarURL: string;
  balance: number;
  previousAvatars: [];
  activeTime: null | number;
  courses: [];
  changedName: boolean;
  changedSurname: boolean;
  chats: [];
}

interface UserContextType {
  user: UserType;
  login: (credentials: { username: string; password: string }) => Promise<void>;
  singup: (credentials: {
    username: string;
    password: string;
    email: string;
    firstname?: string;
    lastname?: string;
  }) => Promise<void>;
  verifyEmail: (credentials: {
    username: string;
    code: string;
  }) => Promise<void>;
  resendActivationCode: (username: string) => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  setNewPassword: (credentials: {
    code: string;
    new_pass: string;
    email: string;
  }) => Promise<void>;
  logout: () => Promise<void>;
}

const initialState: UserType = {
  accessToken: null,
  userId: null,
  userType: null,
  name: "",
  surname: "",
  username: "",
  email: "",
  phone: "",
  country: "",
  avatarURL: "",
  balance: 0,
  previousAvatars: [],
  activeTime: null,
  courses: [],
  changedName: false,
  changedSurname: false,
  chats: [],
};

const UserContext = createContext<UserContextType | null>(null);

export const useUser = () => useContext(UserContext);

export const UserProvider: React.FC<UserProviderType> = ({ children }) => {
  const [user, setUser] = useState<UserType>(initialState);
  const [error, setError] = useState<AxiosError | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const refreshTokens = async () => {
    setIsLoading(true);

    try {
      const response = await instance.get("/user/refresh", {
        withCredentials: true,
      });

      const newAccessToken = response.data.access_token;

      setUser((prev) => ({ ...prev, accessToken: newAccessToken }));
      instance.defaults.headers["Authorization"] = `Bearer ${newAccessToken}`;
      return newAccessToken;
    } catch (error) {
      setUser(initialState);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (credentials: { username: string; password: string }) => {
    setIsLoading(true);
    const credentialsFormData = new FormData();
    credentialsFormData.append("username", credentials.username);
    credentialsFormData.append("password", credentials.password);
    try {
      instance.defaults.headers["Content-Type"] =
        "application/x-wwww-form-urlencoded";
      const response = await instance.post("/user/login", credentialsFormData, {
        withCredentials: true,
      });
      console.log(response.data);

      instance.defaults.headers[
        "Authorization"
      ] = `Bearer ${response.data.access_token}`;

      setUser((prev) => ({
        ...prev,
        accessToken: response.data.access_token,
        username: response.data.username,
        userId: response.data.user_id,
      }));
    } catch (error) {
      setError(error as AxiosError);
      throw error;
    } finally {
      setIsLoading(false);
      instance.defaults.headers["Content-Type"] = "application/json";
    }
  };

  const singup = async (credentials: {
    username: string;
    password: string;
    email: string;
    firstname?: string;
    lastname?: string;
  }) => {
    setIsLoading(true);
    try {
      const response = await instance.post("/user/create", credentials);
      console.log(response.data);
    } catch (error) {
      setError(error as AxiosError);
    } finally {
      setIsLoading(false);
    }
  };

  const verifyEmail = async (credentials: {
    username: string;
    code: string;
  }) => {
    setIsLoading(true);
    try {
      const response = await instance.post("/user/activate", credentials, {
        withCredentials: true,
      });
      console.log(response.data);
    } catch (error) {
      setError(error as AxiosError);
    } finally {
      setIsLoading(false);
    }
  };

  const resendActivationCode = async (username: string) => {
    setIsLoading(true);
    try {
      const response = await instance.get("user/resend-activation-code", {
        params: {
          username,
        },
      });
      console.log(response.data);
    } catch (error) {
      setError(error as AxiosError);
    } finally {
      setIsLoading(false);
    }
  };

  const resetPassword = async (email: string) => {
    setIsLoading(true);
    try {
      const response = await instance.post("/user/reset-pass", { email });
      console.log(response);
    } catch (error) {
      setError(error as AxiosError);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const setNewPassword = async (credentials: {
    code: string;
    new_pass: string;
    email: string;
  }) => {
    setIsLoading(true);
    try {
      const response = await instance.post("/user/set-new-pass", credentials, {
        withCredentials: true,
      });
      console.log(response.data);
    } catch (error) {
      setError(error as AxiosError);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      await instance.get("/user/logout", {
        withCredentials: true,
      });
      setUser(initialState);
      instance.defaults.headers["Authorization"] = "";
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const getUser = async () => {
    setIsLoading(true);
    try {
      const response = await instance.get("/user/info/me");
      const { data } = response;
      setUser((prev) => ({
        ...prev,
        userId: data.user_id,
        userType: data.user_type,
        username: data.username,
        email: data.email,
        name: data.name,
        surname: data.surname,
        phone: data.phone,
        country: data.country,
        balance: data.balance,
        activeTime: data.studying_time,
        avatarURL: data.image,
        changedName: data.changed_name,
        changedSurname: data.changed_surname,
        courses: data.courses,
        chats: data.chats,
      }));
    } catch (error) {
      setError(error as AxiosError);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    user.accessToken && getUser();
  }, [user.accessToken]);

  useEffect(() => {
    instance.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (
          error.response &&
          error.response.status === 401 &&
          error.response.data.detail === "Access token expired"
        ) {
          console.log("Access token expired. Attempting to refresh...");
          try {
            const newToken = await refreshTokens();
            console.log(error.config);
            error.config.headers["Authorization"] = `Bearer ${newToken}`;
            return instance.request(error.config);
          } catch (refreshError) {
            console.error("Error refreshing access token:", refreshError);
            return Promise.reject(refreshError);
          }
        }
        return Promise.reject(error);
      }
    );
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        login,
        singup,
        verifyEmail,
        resendActivationCode,
        resetPassword,
        setNewPassword,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
