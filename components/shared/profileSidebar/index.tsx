"use client";
import React, { useState } from "react";
import { LogoutOutlined } from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import Button from "@/components/primitives/button";
import { ButtonTypes, ProfileTabKeys } from "@/constants/enums";
import { useProfileSidebarContext } from "@/contexts/profileSidebar";
import { useTheme } from "next-themes";

const { Sider } = Layout;

export default function ProfileSidebar() {
  const { tabs, handleTabChange, currentKey } = useProfileSidebarContext();
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
        <Button type={ButtonTypes.DANGER}>
          Log Out <LogoutOutlined />
        </Button>
      </Sider>
    </Layout>
  );
}
