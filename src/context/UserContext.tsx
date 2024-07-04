import React, { createContext, useContext, useEffect, useState } from "react";
import { instance } from "../http/instance";
import { AxiosError } from "axios";
import useStorage from "../hooks/useStorage";

interface UserProviderType {
  children: React.ReactNode;
}

export interface TestAtteptType {
  attempt_number: number;
  attempt_score: number;
  student_id: number;
  id: number;
  test_id: number;
}

interface UserCourseType {
  course_id: number;
  status: string;
  progress: number;
  grade: number;
  testAttempts?: TestAtteptType[];
}

interface PreviousAvatar {
  path: string;
  is_main: boolean;
  user_id: number;
  id: number;
}

export interface UserType {
  accessToken?: string | null | Promise<any>;
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
  previousAvatars: PreviousAvatar[];
  activeTime: null | number;
  courses: UserCourseType[];
  changedName: boolean;
  changedSurname: boolean;
  chats: [];
}

export type UserInfoToUpdateType = {
  email?: string;
  password?: string;
  name?: string;
  surname?: string;
  phone?: string;
  country?: string;
};

interface UserContextType {
  user: UserType;
  setUser: React.Dispatch<React.SetStateAction<UserType>>;
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
  updateUserInfo: (userInfo: UserInfoToUpdateType) => Promise<void>;
  updateUsername: (username: string) => Promise<void>;
  getLastUserImages: () => Promise<void>;
  updateUserImage: (formData: FormData) => Promise<void>;
  setMainImage: (imageId: number) => Promise<void>;
  getStudentTestData: (
    testId: number | string,
    courseId: number | string
  ) => Promise<void>;
}

const UserContext = createContext<UserContextType | null>(null);

export const useUser = () => useContext(UserContext);

const initialState: UserType = {
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

export const UserProvider: React.FC<UserProviderType> = ({ children }) => {
  const [accessToken, setAccessToken] = useStorage("accessToken", null);
  const [user, setUser] = useState<UserType>(initialState);

  const [error, setError] = useState<AxiosError | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // const refreshTokens = async () => {
  //   try {
  //     const response = await instance.get("/user/refresh", {
  //       withCredentials: true,
  //     });
  //     const newAccessToken = response.data.access_token;
  //     instance.defaults.headers["Authorization"] = `Bearer ${newAccessToken}`;
  //     setAccessToken(newAccessToken);
  //     return newAccessToken;
  //   } catch (error) {
  //     setUser(initialState);
  //     setAccessToken(null);
  //   }
  // };

  const login = async (credentials: { username: string; password: string }) => {
    const credentialsFormData = new FormData();
    credentialsFormData.append("username", credentials.username);
    credentialsFormData.append("password", credentials.password);
    try {
      instance.defaults.headers["Content-Type"] =
        "application/x-wwww-form-urlencoded";
      const response = await instance.post("/user/login", credentialsFormData, {
        withCredentials: true,
      });

      instance.defaults.headers[
        "Authorization"
      ] = `Bearer ${response.data.access_token}`;

      setUser((prev) => ({
        ...prev,
        accessToken: response.data.access_token,
        username: response.data.username,
        userId: response.data.user_id,
      }));
      setAccessToken(response.data.access_token);
      await getUser();
    } catch (error) {
      setError(error as AxiosError);
      throw error;
    } finally {
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
    try {
      const response = await instance.post("/user/create", credentials);
      console.log(response.data);
    } catch (error) {
      setError(error as AxiosError);
      throw error;
    }
  };

  const verifyEmail = async (credentials: {
    username: string;
    code: string;
  }) => {
    try {
      const response = await instance.post("/user/activate", credentials, {
        withCredentials: true,
      });
      setUser((prev) => ({
        ...prev,
        username: response.data.username,
        userId: response.data.user_id,
      }));
      setAccessToken(response.data.access_token);
    } catch (error) {
      setError(error as AxiosError);
      throw error;
    }
  };

  const resendActivationCode = async (username: string) => {
    try {
      const response = await instance.get("user/resend-activation-code", {
        params: {
          username,
        },
      });
      console.log(response.data);
    } catch (error) {
      setError(error as AxiosError);
      throw error;
    }
  };

  const resetPassword = async (email: string) => {
    try {
      const response = await instance.post("/user/reset-pass", { email });
      console.log(response);
    } catch (error) {
      setError(error as AxiosError);
      throw error;
    }
  };

  const setNewPassword = async (credentials: {
    code: string;
    new_pass: string;
    email: string;
  }) => {
    try {
      const response = await instance.post("/user/set-new-pass", credentials, {
        withCredentials: true,
      });
      console.log(response.data);
    } catch (error) {
      setError(error as AxiosError);
    }
  };

  const logout = async () => {
    try {
      await instance.get("/user/logout", {
        withCredentials: true,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setAccessToken(null);
      setUser(initialState);
      instance.defaults.headers["Authorization"] = "";
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

  const updateUserInfo = async (userInfo: UserInfoToUpdateType) => {
    try {
      await instance.put("/user/update/info", userInfo);
      setUser((prev) => ({ ...prev, ...userInfo }));
    } catch (error) {
      throw error;
    }
  };

  const updateUsername = async (username: string) => {
    try {
      const response = await instance.put(
        "/user/update/username",
        { username },
        { withCredentials: true }
      );
      const newToken = response.data.access_token;
      setAccessToken(newToken);
      setUser((prev) => ({ ...prev, username }));
    } catch (error) {
      throw error;
    }
  };

  const getLastUserImages = async () => {
    try {
      const response = await instance.get("user/my-images");
      setUser((prev) => ({ ...prev, previousAvatars: response.data }));
    } catch (error) {
      throw error;
    }
  };

  const updateUserImage = async (formData: FormData) => {
    try {
      const response = await instance.put("/user/update/image", formData, {
        headers: { "Content-Type": "application/x-wwww-form-urlencoded" },
      });
      setUser((prev) => ({ ...prev, avatarURL: response.data.path }));
    } catch (error) {
      throw error;
    }
  };

  const setMainImage = async (imageId: number) => {
    try {
      const response = await instance.put(
        `/user/set-main-image?image_id=${imageId}`
      );
      setUser((prev) => {
        let newAvatarImage = "";
        const udatedPreviousAvatars = prev.previousAvatars.map((avatar) => {
          if (avatar.id === imageId) {
            newAvatarImage = avatar.path;
          }
          return {
            ...avatar,
            is_main: avatar.id === imageId,
          };
        });

        return {
          ...prev,
          previousAvatars: udatedPreviousAvatars,
          avatarURL: newAvatarImage,
        };
      });
    } catch (error) {
      throw error;
    }
  };

  const getStudentTestData = async (
    testId: number | string,
    courseId: number | string
  ) => {
    try {
      const { data } = await instance.get("/student-test/attempts", {
        params: {
          test_id: testId,
        },
      });
      setUser((prev) => {
        const updatedCourses = prev.courses.map((course) => {
          if (course.course_id === +courseId) {
            return {
              ...course,
              testAttempts: course.testAttempts
                ? [
                    ...course.testAttempts.filter(
                      (attempt) => attempt.test_id !== +testId
                    ),
                    ...data,
                  ]
                : data,
            };
          }
          return course;
        });
        return { ...prev, courses: updatedCourses };
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (accessToken && !user.userId) {
      instance.defaults.headers["Authorization"] = `Bearer ${accessToken}`;
      getUser();
    }
  }, [accessToken, user.userId]);

  // useEffect(() => {
  //   instance.interceptors.response.use(
  //     (response) => response,
  //     async (error) => {
  //       const originalRequest = error.config;
  //       console.log(originalRequest);

  //       if (
  //         error.response &&
  //         error.response.status === 401 &&
  //         error.response.data.detail === "Access token expired"
  //       ) {
  //         // if (originalRequest.url.includes("/user/info/me")) {
  //         console.log("Access token expired. Attempting to refresh...");
  //         try {
  //           const newToken = await refreshTokens();
  //           originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
  //           return await instance.request(originalRequest);
  //         } catch (refreshError) {
  //           console.error("Error refreshing access token:", refreshError);
  //           return Promise.reject(refreshError);
  //         }
  //         // } else {
  //         //   try {
  //         //     await getUser();
  //         //     const token = instance.defaults.headers["Authorization"];
  //         //     originalRequest.headers["Authorization"] = token;
  //         //     return await instance.request(originalRequest);
  //         //   } catch (error) {
  //         //     return Promise.reject(error);
  //         //   }
  //         // }
  //       }
  //       return Promise.reject(error);
  //     }
  //   );
  // }, []);

  return (
    <UserContext.Provider
      value={{
        user: { ...user, accessToken: accessToken },
        setUser,
        login,
        singup,
        verifyEmail,
        resendActivationCode,
        resetPassword,
        setNewPassword,
        logout,
        updateUserInfo,
        updateUsername,
        getStudentTestData,
        updateUserImage,
        setMainImage,
        getLastUserImages,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
