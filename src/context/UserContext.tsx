import React, { createContext, useContext, useState } from "react";
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

  const login = async (credentials: { username: string; password: string }) => {
    setIsLoading(true);
    try {
      instance.defaults.headers["Content-Type"] =
        "application/x-wwww-form-urlencoded";

      const response = await instance.post("/user/login", credentials, {
        withCredentials: true,
      });
      console.log(response.data);

      instance.defaults.headers[
        "Authorization"
      ] = `Bearer ${response.data.access_token}`;
    } catch (error) {
      setError(error as AxiosError);
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
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
