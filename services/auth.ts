import { axiosInstance } from "./axiosInstance";

type SignupData = {
  name: string;
  surname: string;
  nickname: string;
  email: string;
  password: string;
};

type LoginData = {
  nickname: string;
  password: string;
};

export const AuthService = {
  signup: async (data: SignupData) => {
    try {
      const res = await axiosInstance.post("/auth/signup", data);
      return res.data;
    } catch {
      return "Network error.";
    }
  },
  login: async (data: LoginData) => {
    try {
      const res = await axiosInstance.post("/auth/login", data);
      return res.data;
    } catch {
      return "Network error.";
    }
  },
  checkAuthToken: async (token: string) => {
    try {
      const res = await axiosInstance.post(`/auth/authToken/${token}`);
      return res.data;
    } catch {
      return "Network error.";
    }
  },
};
