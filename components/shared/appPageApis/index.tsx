import { useApiContext } from "@/contexts/apiContext";
import { getMethodColor } from "@/constants/functions";
import ParamTab from "../appCreation/paramTab";
import BodyTab from "../appCreation/bodyTab";
import Button from "@/components/primitives/button";
import { ButtonTypes } from "@/constants/enums";
import copy from "clipboard";

import styles from "./appPageApis.module.scss";
import { useNotificationContext } from "@/contexts/notification";
import { CopyOutlined } from "@ant-design/icons";

interface AppPageApisProps {
  id: string;
}

export default function AppPageApi({ id }: AppPageApisProps) {
  const { getById } = useApiContext();
  const { openNotification } = useNotificationContext();
  const api = getById(id);

  const handleCopy = (value?: string): void => {
    copy.copy(value ?? "");
    openNotification("info", "Copied to clipboard.");
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <b
          style={{
            background: getMethodColor(api?.method),
            color: "white",
            padding: "4px 8px",
            borderRadius: 5,
          }}
        >
          {api?.method}
        </b>{" "}
        <b>{api?.endpoint}</b>
      </div>
      <div className={styles.content}>
        <Button
          type={ButtonTypes.SUCCESS}
          className={styles.copyBtn}
          onClick={() => handleCopy(api?.body)}
        >
          Copy as JSON <CopyOutlined/>
        </Button>
        <ParamTab id={id} view />
        <BodyTab id={id} view />
        {api?.headers.map((el) => {
          return (
            <div className={styles.headerItem}>
              <div className={styles.key}>{el.key}</div>
              <div className={styles.value}>{el.value}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
