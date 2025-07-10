// import React, { createContext, useContext, useEffect, useState } from "react";
// import { instance } from "../http/instance";
// import { AxiosError } from "axios";
// import useStorage from "../hooks/useStorage";
// import { SignInWithAppleResponse } from "@capacitor-community/apple-sign-in";

// interface UserProviderType {
//   children: React.ReactNode;
// }

// export interface TestAtteptType {
//   attempt_number: number;
//   attempt_score: number;
//   student_id: number;
//   id: number;
//   test_id: number;
// }

// interface UserCourseType {
//   course_id: number;
//   status: string;
//   progress: number;
//   grade: number;
//   testAttempts?: TestAtteptType[];
// }

// interface PreviousAvatar {
//   path: string;
//   is_main: boolean;
//   user_id: number;
//   id: number;
// }

// type CourseCertificate = {
//   course_certificate_id: number | null;
//   course_certificate_link: string | null;
//   course_id: number;
//   course_name: string;
// };

// type CategoryCetficate = {
//   category_certificate_id: number | null;
//   category_certificate_link: number | null;
//   category_id: number;
//   category_name: string;
//   course_certificate_data: CourseCertificate[];
// };

// export interface UserType {
//   accessToken?: string | null | Promise<any>;
//   userId: number | null;
//   studentId: number | null;
//   userType: string | null;
//   name: string;
//   surname: string;
//   username: string;
//   email: string;
//   phone: string;
//   country: string;
//   avatarURL: string;
//   balance: number;
//   previousAvatars: PreviousAvatar[];
//   activeTime: number;
//   courses: UserCourseType[];
//   changedName: boolean;
//   changedSurname: boolean;
//   chats: [];
//   certificates: CategoryCetficate[];
// }

// export type UserInfoToUpdateType = {
//   email?: string;
//   password?: string;
//   name?: string;
//   surname?: string;
//   phone?: string;
//   country?: string;
// };

// interface UserContextType {
//   user: UserType;
//   setUser: React.Dispatch<React.SetStateAction<UserType>>;
//   login: (credentials: { username: string; password: string }) => Promise<void>;
//   singup: (credentials: {
//     username: string;
//     password: string;
//     email: string;
//     firstname?: string;
//     lastname?: string;
//   }) => Promise<void>;
//   verifyEmail: (credentials: {
//     username: string;
//     code: string;
//   }) => Promise<void>;
//   loginWithGoogle: (googleToket: string) => Promise<{ username: string }>;
//   loginWithApple: (
//     appleResponse: SignInWithAppleResponse,
//     platform: string
//   ) => Promise<{ username: string }>;
//   resendActivationCode: (username: string) => Promise<void>;
//   resetPassword: (email: string) => Promise<void>;
//   setNewPassword: (credentials: {
//     code: string;
//     new_pass: string;
//     email: string;
//   }) => Promise<void>;
//   logout: () => Promise<void>;
//   getUser: () => Promise<void>;
//   updateUserInfo: (userInfo: UserInfoToUpdateType) => Promise<void>;
//   updateUsername: (username: string) => Promise<void>;
//   getLastUserImages: () => Promise<void>;
//   updateUserImage: (formData: FormData) => Promise<void>;
//   setMainImage: (imageId: number) => Promise<void>;
//   // getStudentTestData: (
//   //   testId: number | string,
//   //   courseId: number | string
//   // ) => Promise<void>;
// }

// const UserContext = createContext<UserContextType | null>(null);

// export const useUser = () => useContext(UserContext);

// const initialState: UserType = {
//   userId: null,
//   studentId: null,
//   userType: null,
//   name: "",
//   surname: "",
//   username: "",
//   email: "",
//   phone: "",
//   country: "",
//   avatarURL: "",
//   balance: 0,
//   previousAvatars: [],
//   activeTime: 0,
//   courses: [],
//   changedName: false,
//   changedSurname: false,
//   chats: [],
//   certificates: [],
// };

// export const UserProvider: React.FC<UserProviderType> = ({ children }) => {
//   const [accessToken, setAccessToken] = useStorage("accessToken", null);
//   const [user, setUser] = useState<UserType>(initialState);

//   const [error, setError] = useState<AxiosError | null>(null);
//   const [isLoading, setIsLoading] = useState<boolean>(false);

//   const login = async (credentials: { username: string; password: string }) => {
//     const credentialsFormData = new FormData();
//     credentialsFormData.append("username", credentials.username);
//     credentialsFormData.append("password", credentials.password);
//     try {
//       instance.defaults.headers["Content-Type"] =
//         "application/x-wwww-form-urlencoded";
//       const response = await instance.post("/user/login", credentialsFormData, {
//         withCredentials: true,
//       });

//       instance.defaults.headers[
//         "Authorization"
//       ] = `Bearer ${response.data.access_token}`;

//       setUser((prev) => ({
//         ...prev,
//         accessToken: response.data.access_token,
//         username: response.data.username,
//         userId: response.data.user_id,
//       }));
//       setAccessToken(response.data.access_token);
//       await getUser();
//     } catch (error) {
//       setError(error as AxiosError);
//       throw error;
//     } finally {
//       instance.defaults.headers["Content-Type"] = "application/json";
//     }
//   };

//   const singup = async (credentials: {
//     username: string;
//     password: string;
//     email: string;
//     firstname?: string;
//     lastname?: string;
//   }) => {
//     try {
//       const response = await instance.post("/user/create", credentials);
//       console.log(response.data);
//     } catch (error) {
//       setError(error as AxiosError);
//       throw error;
//     }
//   };

//   const verifyEmail = async (credentials: {
//     username: string;
//     code: string;
//   }) => {
//     try {
//       const response = await instance.post("/user/activate", credentials, {
//         withCredentials: true,
//       });
//       setUser((prev) => ({
//         ...prev,
//         username: response.data.username,
//         userId: response.data.user_id,
//       }));
//       setAccessToken(response.data.access_token);
//     } catch (error) {
//       setError(error as AxiosError);
//       throw error;
//     }
//   };

//   const resendActivationCode = async (username: string) => {
//     try {
//       const response = await instance.get("user/resend-activation-code", {
//         params: {
//           username,
//         },
//       });
//       console.log(response.data);
//     } catch (error) {
//       setError(error as AxiosError);
//       throw error;
//     }
//   };

//   const loginWithGoogle = async (googleToken: string) => {
//     try {
//       const { data } = await instance.post(
//         "/user/login-with-google",
//         {
//           google_token: googleToken,
//         },
//         { withCredentials: true }
//       );
//       setAccessToken(data.access_token);
//       return data;
//     } catch (error) {
//       throw error;
//     }
//   };

//   const loginWithApple = async (
//     appleResponse: SignInWithAppleResponse,
//     platform: string
//   ) => {
//     try {
//       const { data } = await instance.post(
//         "/user/login-with-apple",
//         {
//           platform,
//           code: appleResponse.response.authorizationCode,
//           name: appleResponse.response.givenName || null,
//           surname: appleResponse.response.familyName || null,
//         },
//         { withCredentials: true }
//       );
//       setAccessToken(data.access_token);
//       return data;
//     } catch (error) {
//       throw error;
//     }
//   };

//   const resetPassword = async (email: string) => {
//     try {
//       const response = await instance.post("/user/reset-pass", { email });
//       console.log(response);
//     } catch (error) {
//       setError(error as AxiosError);
//       throw error;
//     }
//   };

//   const setNewPassword = async (credentials: {
//     code: string;
//     new_pass: string;
//     email: string;
//   }) => {
//     try {
//       const response = await instance.post("/user/set-new-pass", credentials, {
//         withCredentials: true,
//       });
//       console.log(response.data);
//     } catch (error) {
//       setError(error as AxiosError);
//     }
//   };

//   const logout = async () => {
//     try {
//       await instance.get("/user/logout", {
//         withCredentials: true,
//       });
//     } catch (error) {
//       console.log(error);
//     } finally {
//       setAccessToken(null);
//       setUser(initialState);
//       instance.defaults.headers["Authorization"] = "";
//     }
//   };

//   const getUser = async () => {
//     setIsLoading(true);
//     try {
//       const response = await instance.get("/user/info/me");
//       const { data } = response;
//       setUser((prev) => ({
//         ...prev,
//         userId: data.user_id,
//         studentId: data.student_id,
//         userType: data.user_type,
//         username: data.username,
//         email: data.email,
//         name: data.name,
//         surname: data.surname,
//         phone: data.phone,
//         country: data.country,
//         balance: data.balance,
//         activeTime: data.studying_time,
//         avatarURL: data.image,
//         changedName: data.changed_name,
//         changedSurname: data.changed_surname,
//         courses: data.courses,
//         chats: data.chats,
//         certificates: data.certificates,
//       }));
//     } catch (error) {
//       setError(error as AxiosError);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const updateUserInfo = async (userInfo: UserInfoToUpdateType) => {
//     try {
//       await instance.put("/user/update/info", userInfo);
//       setUser((prev) => ({ ...prev, ...userInfo }));
//     } catch (error) {
//       throw error;
//     }
//   };

//   const updateUsername = async (username: string) => {
//     try {
//       const response = await instance.put(
//         "/user/update/username",
//         { username },
//         { withCredentials: true }
//       );
//       const newToken = response.data.access_token;
//       setAccessToken(newToken);
//       setUser((prev) => ({ ...prev, username }));
//     } catch (error) {
//       throw error;
//     }
//   };

//   const getLastUserImages = async () => {
//     try {
//       const response = await instance.get("user/my-images");
//       setUser((prev) => ({ ...prev, previousAvatars: response.data }));
//     } catch (error) {
//       throw error;
//     }
//   };

//   const updateUserImage = async (formData: FormData) => {
//     try {
//       const response = await instance.put("/user/update/image", formData, {
//         headers: { "Content-Type": "application/x-wwww-form-urlencoded" },
//       });
//       setUser((prev) => ({ ...prev, avatarURL: response.data.path }));
//     } catch (error) {
//       throw error;
//     }
//   };

//   const setMainImage = async (imageId: number) => {
//     try {
//       const response = await instance.put(
//         `/user/set-main-image?image_id=${imageId}`
//       );
//       setUser((prev) => {
//         let newAvatarImage = "";
//         const udatedPreviousAvatars = prev.previousAvatars.map((avatar) => {
//           if (avatar.id === imageId) {
//             newAvatarImage = avatar.path;
//           }
//           return {
//             ...avatar,
//             is_main: avatar.id === imageId,
//           };
//         });

//         return {
//           ...prev,
//           previousAvatars: udatedPreviousAvatars,
//           avatarURL: newAvatarImage,
//         };
//       });
//     } catch (error) {
//       throw error;
//     }
//   };

//   useEffect(() => {
//     if (accessToken && !user.userId) {
//       instance.defaults.headers["Authorization"] = `Bearer ${accessToken}`;
//       getUser();
//     }
//   }, [accessToken, user.userId]);

//   return (
//     <UserContext.Provider
//       value={{
//         user: { ...user, accessToken: accessToken },
//         setUser,
//         login,
//         singup,
//         verifyEmail,
//         resendActivationCode,
//         loginWithGoogle,
//         loginWithApple,
//         resetPassword,
//         setNewPassword,
//         logout,
//         getUser,
//         updateUserInfo,
//         updateUsername,
//         updateUserImage,
//         setMainImage,
//         getLastUserImages,
//       }}
//     >
//       {children}
//     </UserContext.Provider>
//   );
// };

// src/context/UserContext.tsx

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
  PreviousAvatar,
  TestAttemptType,
  UserCourseType,
  CategoryCertificate,
  CourseCertificate,
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
