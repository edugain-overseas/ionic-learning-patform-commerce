import { SignInWithAppleResponse } from "@capacitor-community/apple-sign-in";
import { Dispatch, SetStateAction } from "react";

export interface TestAttemptType {
  attempt_number: number;
  attempt_score: number;
  student_id: number;
  id: number;
  test_id: number;
}

export interface UserCourseType {
  course_id: number;
  status: string;
  progress: number;
  grade: number;
  testAttempts?: TestAttemptType[];
}

export interface PreviousAvatar {
  path: string;
  is_main: boolean;
  user_id: number;
  id: number;
}

export interface CourseCertificate {
  course_certificate_id: number | null;
  course_certificate_link: string | null;
  course_id: number;
  course_name: string;
  course_status: "in_progress" | "completed" | null;
}

export interface CategoryCertificate {
  category_certificate_id: number | null;
  category_certificate_link: string | null;
  category_id: number;
  category_name: string;
  course_certificate_data: CourseCertificate[];
}

export interface UserType {
  accessToken?: string | null | Promise<any>;
  userId: number | null;
  studentId: number | null;
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
  activeTime: number;
  courses: UserCourseType[];
  changedName: boolean;
  changedSurname: boolean;
  chats: any[];
  certificates: CategoryCertificate[];
}

export type UserInfoToUpdateType = {
  email?: string;
  password?: string;
  name?: string;
  surname?: string;
  phone?: string;
  country?: string;
};

export interface UserContextType {
  user: UserType & { accessToken: string | null } & { isTokenInit: boolean };
  setUser: Dispatch<SetStateAction<UserType>>;
  login: (credentials: { username: string; password: string }) => Promise<void>;
  singup: (credentials: Record<string, any>) => Promise<void>;
  verifyEmail: (credentials: {
    username: string;
    code: string;
  }) => Promise<void>;
  resendActivationCode: (username: string) => Promise<void>;
  loginWithGoogle: (
    googleToken: string
  ) => Promise<{ access_token: string; username: string }>;
  loginWithApple: (
    appleResponse: SignInWithAppleResponse,
    platform: string
  ) => Promise<{ access_token: string; username: string }>;
  resetPassword: (email: string) => Promise<void>;
  setNewPassword: (credentials: {
    code: string;
    new_pass: string;
    email: string;
  }) => Promise<void>;
  logout: () => Promise<void>;
  getUser: () => Promise<void>;
  updateUserInfo: (info: UserInfoToUpdateType) => Promise<void>;
  updateUsername: (username: string) => Promise<void>;
  updateUserImage: (formData: FormData) => Promise<void>;
  getLastUserImages: () => Promise<void>;
  setMainImage: (imageId: number) => Promise<void>;
}
