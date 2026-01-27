import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { instance } from "../http/instance";
import useStorage from "../hooks/useStorage";
import { SignInWithAppleResponse } from "@capacitor-community/apple-sign-in";

// Types
import {
  UserType,
  UserInfoToUpdateType,
  UserContextType,
} from "../types/user";
import { setupInterceptors } from "../http/interceptors/authInterceptor";

interface UserProviderType {
  children: ReactNode;
}

const UserContext = createContext<UserContextType | null>(null);
export const useUser = () => useContext(UserContext);

const initialState: UserType = {
  userId: null,
  studentId: null,
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
  activeTime: 0,
  courses: [],
  changedName: false,
  changedSurname: false,
  chats: [],
  certificates: [],
};

export const UserProvider: React.FC<UserProviderType> = ({ children }) => {
  const [accessToken, setAccessToken, isTokenInit] = useStorage(
    "accessToken",
    null
  );
  const [user, setUser] = useState<UserType>(initialState);

  useEffect(() => {
    if (accessToken && !user.userId) {
      instance.defaults.headers["Authorization"] = `Bearer ${accessToken}`;
      getUser();
    }
  }, [accessToken, user.userId]);

  useEffect(() => {
    setupInterceptors(logout, setAccessToken);
  }, []);

  const login = async ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) => {
    const formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);    

    try {
      instance.defaults.headers["Content-Type"] =
        "application/x-www-form-urlencoded";
      const { data } = await instance.post("/user/login", formData, {
        withCredentials: true,
      });
      instance.defaults.headers[
        "Authorization"
      ] = `Bearer ${data.access_token}`;
      setAccessToken(data.access_token);
      setUser((prev) => ({
        ...prev,
        username: data.username,
        userId: data.user_id,
      }));
      await getUser();
    } catch (error) {
      throw error;
    } finally {
      instance.defaults.headers["Content-Type"] = "application/json";
    }
  };

  const singup = async (credentials: Record<string, any>) => {
    await instance.post("/user/create", credentials);
  };

  const verifyEmail = async ({
    username,
    code,
  }: {
    username: string;
    code: string;
  }) => {
    const { data } = await instance.post(
      "/user/activate",
      { username, code },
      { withCredentials: true }
    );
    setUser((prev) => ({
      ...prev,
      username: data.username,
      userId: data.user_id,
    }));
    setAccessToken(data.access_token);
  };

  const resendActivationCode = async (username: string) => {
    await instance.get("user/resend-activation-code", { params: { username } });
  };

  const loginWithGoogle = async (googleToken: string) => {
    const { data } = await instance.post(
      "/user/login-with-google",
      { google_token: googleToken },
      { withCredentials: true }
    );
    setAccessToken(data.access_token);
    return data;
  };

  const loginWithApple = async (
    appleResponse: SignInWithAppleResponse,
    platform: string
  ) => {
    const { data } = await instance.post(
      "/user/login-with-apple",
      {
        platform,
        code: appleResponse.response.authorizationCode,
        name: appleResponse.response.givenName || null,
        surname: appleResponse.response.familyName || null,
      },
      { withCredentials: true }
    );
    setAccessToken(data.access_token);
    return data;
  };

  const resetPassword = async (email: string) => {
    await instance.post("/user/reset-pass", { email });
  };

  const setNewPassword = async (credentials: {
    code: string;
    new_pass: string;
    email: string;
  }) => {
    await instance.post("/user/set-new-pass", credentials, {
      withCredentials: true,
    });
  };

  const logout = async () => {
    await instance.get("/user/logout", { withCredentials: true });
    setAccessToken(null);
    setUser(initialState);
    instance.defaults.headers["Authorization"] = "";
  };

  const getUser = async () => {
    const { data } = await instance.get("/user/info/me");
    setUser((prev) => ({
      ...prev,
      userId: data.user_id,
      studentId: data.student_id,
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
      certificates: data.certificates,
    }));
  };

  const updateUserInfo = async (info: UserInfoToUpdateType) => {
    await instance.put("/user/update/info", info);
    setUser((prev) => ({ ...prev, ...info }));
  };

  const updateUsername = async (username: string) => {
    const { data } = await instance.put(
      "/user/update/username",
      { username },
      { withCredentials: true }
    );
    setAccessToken(data.access_token);
    setUser((prev) => ({ ...prev, username }));
  };

  const updateUserImage = async (formData: FormData) => {
    const { data } = await instance.put("/user/update/image", formData, {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });
    setUser((prev) => ({ ...prev, avatarURL: data.path }));
  };

  const getLastUserImages = async () => {
    const { data } = await instance.get("/user/my-images");
    setUser((prev) => ({ ...prev, previousAvatars: data }));
  };

  const setMainImage = async (imageId: number) => {
    await instance.put(`/user/set-main-image?image_id=${imageId}`);
    setUser((prev) => {
      const updatedAvatars = prev.previousAvatars.map((avatar) => ({
        ...avatar,
        is_main: avatar.id === imageId,
      }));
      const newAvatar =
        updatedAvatars.find((a) => a.id === imageId)?.path || "";
      return { ...prev, previousAvatars: updatedAvatars, avatarURL: newAvatar };
    });
  };

  const value = useMemo(
    () => ({
      user: { ...user, accessToken, isTokenInit },
      setUser,
      login,
      singup,
      verifyEmail,
      resendActivationCode,
      loginWithGoogle,
      loginWithApple,
      resetPassword,
      setNewPassword,
      logout,
      getUser,
      updateUserInfo,
      updateUsername,
      updateUserImage,
      setMainImage,
      getLastUserImages,
    }),
    [user, accessToken, isTokenInit]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
