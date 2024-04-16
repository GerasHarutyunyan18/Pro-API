"use client";
import {
  CloseOutlined,
  DashboardOutlined,
  HomeOutlined,
  LoginOutlined,
  MenuOutlined,
  MessageOutlined,
  QuestionCircleOutlined,
  UserOutlined,
} from "@ant-design/icons";
import Icon from "./../../../public/icon.svg";
import Button from "@/components/primitives/button";
import { ButtonTypes } from "@/constants/enums";
import { useTheme } from "next-themes";
import { Switch } from "antd";
import SunIcon from "./../../../public/sunIcon.svg";
import MoonIcon from "./../../../public/moonIcon.svg";
import { useAuthContext } from "@/contexts/auth";
import Link from "next/link";
import { useState } from "react";

import styles from "./header.module.scss";

export default function Header() {
  const { theme, setTheme } = useTheme();
  const { currentUser } = useAuthContext();
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const themeToggler = () => {
    if (theme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };

  const openMenu = () => {
    setShowMenu(true);
  };

  const closeMenu = () => {
    setShowMenu(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.leftSide}>
        <Link href="/" className={styles.headerLinks}>
          <img className={styles.logo} src={Icon.src} />
        </Link>
        <div className={`${styles.headerItem} ${styles.hideItem}`}>
          <Link href="/" className={styles.headerLinks}>
            Home <HomeOutlined />
          </Link>
        </div>
        <div className={`${styles.headerItem} ${styles.hideItem}`}>
          <Link href="" className={styles.headerLinks}>
            About <QuestionCircleOutlined />
          </Link>
        </div>
        {currentUser && (
          <div className={`${styles.headerItem} ${styles.hideItem}`}>
            <Link href="" className={styles.headerLinks}>
              Dashboard <DashboardOutlined />
            </Link>
          </div>
        )}
        <div className={`${styles.headerItem} ${styles.hideItem}`}>
          <Link href="/community" className={styles.headerLinks}>
            Community <MessageOutlined />
          </Link>
        </div>
      </div>
      <div className={styles.rightSide}>
        <div className={`${styles.headerItem} ${styles.hideItem}`}>
          <Switch
            checkedChildren={
              <div style={{ alignItems: "center", display: "flex" }}>
                <img width={20} src={MoonIcon.src} />
              </div>
            }
            unCheckedChildren={<img width={20} src={SunIcon.src} />}
            onChange={themeToggler}
            defaultChecked={theme === "dark"}
          />
        </div>

        {currentUser ? (
          <>
            <div className={`${styles.headerItem} ${styles.hideItem}`}>
              <Link href="/createApp">
                <Button
                  className={styles.addAppBtn}
                  type={ButtonTypes.PRIMARY}
                  text="Add App"
                ></Button>
              </Link>
            </div>
            <div className={`${styles.headerItem} ${styles.hideItem}`}>
              <Link href="/profile" className={styles.headerLinks}>
                Profile <UserOutlined />
              </Link>
            </div>
          </>
        ) : (
          <div className={`${styles.headerItem} ${styles.hideItem}`}>
            <Link href="/login" className={styles.headerLinks}>
              Sign In <LoginOutlined />
            </Link>
          </div>
        )}
        <div
          onClick={openMenu}
          className={`${styles.headerItem} ${styles.menuOpenBtn}`}
        >
          <MenuOutlined className={styles.menuIcon} />
        </div>
        {/* Sidebar menu */}
        <div
          className={`${styles.sidebarMenu} ${
            showMenu && styles.sidebarMenuShow
          }`}
        >
          <div className={styles.header}>
            <img width={100} className={styles.logo} src={Icon.src} />
            <Button
              onClick={closeMenu}
              className={styles.closeBtn}
              type={ButtonTypes.PRIMARY}
            >
              <CloseOutlined />
            </Button>
          </div>
          <div className={styles.headerItem}>
            <Link href="/" className={styles.headerLinks}>
              Home <HomeOutlined />
            </Link>
          </div>
          <div className={styles.headerItem}>
            <Link href="" className={styles.headerLinks}>
              About <QuestionCircleOutlined />
            </Link>
          </div>
          {currentUser ? (
            <>
              <div className={styles.headerItem}>
                <Link href="/profile" className={styles.headerLinks}>
                  Profile <UserOutlined />
                </Link>
              </div>
              <div className={styles.headerItem}>
                <Link href="/addApp">
                  <Button
                    className={styles.addAppBtn}
                    type={ButtonTypes.PRIMARY}
                    text="Add App"
                  ></Button>
                </Link>
              </div>
            </>
          ) : (
            <div className={styles.headerItem}>
              <Link href="/login" className={styles.headerLinks}>
                Sign In <LoginOutlined />
              </Link>
            </div>
          )}
          <div className={styles.headerItem}>
            <Switch
              checkedChildren={
                <div style={{ alignItems: "center", display: "flex" }}>
                  <img width={20} src={MoonIcon.src} />
                </div>
              }
              unCheckedChildren={<img width={20} src={SunIcon.src} />}
              onChange={themeToggler}
              defaultChecked={theme === "dark"}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
