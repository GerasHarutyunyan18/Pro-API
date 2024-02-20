import { notification } from "antd";
import { createContext, useContext } from "react";

export type NotificationType = "success" | "info" | "error" | "warning";

type NotificationContextData = {
  openNotification: (type: NotificationType, text: string) => void;
};

const NotificationContext = createContext<NotificationContextData | undefined>(
  undefined
);

export const NotificationContextProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [api, contextHolder] = notification.useNotification();

  const openNotification = (type: NotificationType, text: string) => {
    api[type]({
      message: "Notification",
      description: text,
      placement: "topLeft",
      type,
      duration: 1
    });
  };

  const contextValue = { openNotification };

  return (
    <NotificationContext.Provider value={contextValue}>
      {contextHolder}
      {children}
    </NotificationContext.Provider>
  );
};
export const useNotificationContext = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error("useApiContext must be used within a ApiContextProvider");
  }
  return context;
};
