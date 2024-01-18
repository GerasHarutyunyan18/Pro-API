"use client";
// import type { Metadata } from "next";
import { Inter } from "next/font/google";
import CustomHeader from "@/components/shared/header";
import Footer from "@/components/shared/footer";
import Icon from "../public/icon.svg";
import { ThemeProvider } from "next-themes";
import { AuthContextProvider } from "@/contexts/auth";
import { ApiContextProvider } from "@/contexts/apiContext";
import { ProfileSidebarContextProvider } from "@/contexts/profileSidebar";
import { NotificationContextProvider } from "@/contexts/notification";

import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";

const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "Pro - API",
//   description:
//     "Platform which will help to make your API understandable for others.",
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <link rel="icon" href={Icon.src} sizes="any" />
      <body className={inter.className}>
        <NotificationContextProvider>
          <AuthContextProvider>
            <ThemeProvider>
              <CustomHeader />
              <ProfileSidebarContextProvider>
                <ApiContextProvider>
                  <div className="contentContainer">{children}</div>
                </ApiContextProvider>
              </ProfileSidebarContextProvider>
              <Footer />
            </ThemeProvider>
          </AuthContextProvider>
        </NotificationContextProvider>
      </body>
    </html>
  );
}
