"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AuthService } from "@/services/auth";
import { User } from "./type";
import { LocalStorageKeys } from "@/constants/objects";

type AuthContextData = {
  currentUser?: User | null;
  updateCurrentUser: (user: User) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextData | undefined>(undefined);

export const AuthContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currentUser, setCurrentUser] = useState<User | null>();
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem(LocalStorageKeys.authToken);
    if (token) {
      fetchUserByToken(token);
    } else {
      router.push("/login");
    }
  }, []);

  useEffect(() => {
    const path = window.location.pathname;
    if (currentUser && (path === "/login" || path === "/register")) {
      router.push("/");
    }
  }, [currentUser]);

  const updateCurrentUser = (user: User) => {
    setCurrentUser(user);
  };

  const fetchUserByToken = async (token: string) => {
    const res = await AuthService.checkAuthToken(token);
    if (res.success) {
      updateCurrentUser(res.user);
    } else {
      router.push("/login");
    }
  };

  const logout = () => {
    localStorage.removeItem(LocalStorageKeys.authToken);
    setCurrentUser(null);
  };

  const contextValue: AuthContextData = {
    currentUser,
    updateCurrentUser,
    logout,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within a AuthContextProvider");
  }
  return context;
};
