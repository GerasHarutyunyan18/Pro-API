"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { User } from "./type";
import { LocalStorageKeys } from "@/constants/localStorage";

type AuthContextData = {
  currentUser?: User | null;
};

const AuthContext = createContext<AuthContextData | undefined>(undefined);

export const AuthContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currentUser, setCurrentUser] = useState<User | null>();

  useEffect(() => {
    const token = localStorage.getItem(LocalStorageKeys.authToken);
    if (token) {
      // do call to BE and get user
      // if with token user not found set user null
    } else {
      // setCurrentUser({
      //   id: 1,
      //   name: "John",
      //   surname: "Doe",
      //   email: "john@doe.com",
      //   nickname: "johnDoe",
      //   url: "http://localhost:3000/account/johnDoe",
      // });
    }
  }, []);

  const contextValue: AuthContextData = {
    currentUser,
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
