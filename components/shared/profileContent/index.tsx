"use client";
import { ProfileTabKeys } from "@/constants/enums";
import { useProfileSidebarContext } from "@/contexts/profileSidebar";
import UserInfo from "../userInfo";

export default function ProfileContent() {
  const { currentKey } = useProfileSidebarContext();
  const renderTabs = () => {
    switch (currentKey) {
      case ProfileTabKeys.PROFILE:
        return <UserInfo />;
      default:
        <h1>{currentKey}</h1>;
    }
  };
  return renderTabs();
}
