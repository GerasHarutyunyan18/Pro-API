"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { App } from "./type";
import { useAuthContext } from "../auth";
import { AppService } from "@/services/app";
import { Api } from "../apiContext/type";
import { useApiContext } from "../apiContext";

type AppContextData = {
  apps: App[];
  currentApp: App | null;
  fetchApps: () => Promise<void>;
  fetchPageApp: (id: string) => Promise<boolean>;
  isFetchingPageApp: boolean;
};

const AppContext = createContext<AppContextData | undefined>(undefined);

export const AppContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [apps, setApps] = useState<App[]>([]);
  const [currentApp, setCurrentApp] = useState<App | null>(null);
  const [isFetchingPageApp, setIsFetchingPageApp] = useState<boolean>(false);
  const { setApi } = useApiContext();
  const { currentUser } = useAuthContext();

  const fetchApps = async () => {
    const res = await AppService.getUserApps(currentUser?.personalAccessKey);

    if (res.success) {
      setApps(res.data);
    }
  };

  const fetchPageApp = async (id: string): Promise<boolean> => {
    setIsFetchingPageApp(true);
    const res = await AppService.getAppById(id);
    if (res.success) {
      setCurrentApp(res.data.app);
      setApi(res.data.apis);
      setIsFetchingPageApp(false);
      return true;
    }
    setIsFetchingPageApp(false);
    return false;
  };

  const contextValue: AppContextData = {
    apps,
    currentApp,
    fetchApps,
    fetchPageApp,
    isFetchingPageApp,
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within a AppContextProvider");
  }
  return context;
};
