"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { MenuProps } from "antd";
import { LockOutlined, SettingOutlined, UserOutlined } from "@ant-design/icons";
import { ProfileTabKeys } from "@/constants/enums";

type ProfileSidebarContextData = {
  currentKey: ProfileTabKeys;
  handleTabChange: (key: ProfileTabKeys) => void;
  tabs: MenuProps["items"];
};

const ProfileSidebarContext = createContext<
  ProfileSidebarContextData | undefined
>(undefined);

const items: MenuProps["items"] = [
  {
    key: ProfileTabKeys.PROFILE,
    label: "Profile",
    icon: <UserOutlined />,
  },
  {
    key: ProfileTabKeys.SETTINGS,
    label: "Settings",
    icon: <SettingOutlined />,
  },
  {
    key: ProfileTabKeys.PRIVACY,
    label: "Privacy",
    icon: <LockOutlined />,
  },
];

export const ProfileSidebarContextProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [currentKey, setCurrentKey] = useState<ProfileTabKeys>(
    ProfileTabKeys.PROFILE
  );

  const handleTabChange = (key: ProfileTabKeys) => {
    setCurrentKey(key);
  };

  const contextValue: ProfileSidebarContextData = {
    currentKey,
    handleTabChange,
    tabs: items,
  };

  return (
    <ProfileSidebarContext.Provider value={contextValue}>
      {children}
    </ProfileSidebarContext.Provider>
  );
};

export const useProfileSidebarContext = () => {
  const context = useContext(ProfileSidebarContext);
  if (!context) {
    throw new Error(
      "useProfileSidebarContext must be used within a ProfileSidebarContextProvider"
    );
  }
  return context;
};
