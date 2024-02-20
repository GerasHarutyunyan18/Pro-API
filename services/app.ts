import { App } from "@/contexts/appContext/type";
import { axiosInstance } from "./axiosInstance";
import { Api } from "@/contexts/apiContext/type";

export const AppService = {
  create: async (app: App, apis: Api[], authToken?: string) => {
    try {
      const res = await axiosInstance.post(
        "/app/create",
        { app, apis },
        {
          headers: {
            authToken,
          },
        }
      );
      return res.data;
    } catch {
      return "Network error.";
    }
  },
  getUserApps: async (authToken?: string) => {
    try {
      const res = await axiosInstance.get("/app/getAll", {
        headers: {
          authToken,
        },
      });
      return res.data;
    } catch {
      return "Network error.";
    }
  },
  getAppById: async (id: string) => {
    try {
      const res = await axiosInstance.get(`/app/get/${id}`);
      return res.data;
    } catch {
      return "Network error.";
    }
  },
};
