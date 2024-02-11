"use client";
import React from "react";
import { useTheme } from "next-themes";
import { Layout, Menu, theme } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import Button from "@/components/primitives/button";
import { ButtonTypes, ProfileTabKeys } from "@/constants/enums";
import { useProfileSidebarContext } from "@/contexts/profileSidebar";
import { useAuthContext } from "@/contexts/auth";

const { Sider } = Layout;

export default function ProfileSidebar() {
  const { tabs, handleTabChange, currentKey } = useProfileSidebarContext();
  const { logout } = useAuthContext();
  const { theme } = useTheme();

  const handleMenuSelect = ({ key }: { key: React.Key }) => {
    handleTabChange(key as ProfileTabKeys);
  };

  return (
    <Layout hasSider style={{ flex: "none" }}>
      <Sider
        style={{
          display: "flex !important",
          flexDirection: "column",
          justifyContent: "space-between",
          overflow: "auto",
          height: "100vh",
        }}
      >
        <Menu
          theme={theme as any}
          mode="inline"
          selectedKeys={[currentKey]}
          onSelect={handleMenuSelect}
          items={tabs}
        />
        <Button type={ButtonTypes.DANGER} onClick={logout}>
          Log Out <LogoutOutlined />
        </Button>
      </Sider>
    </Layout>
  );
}
