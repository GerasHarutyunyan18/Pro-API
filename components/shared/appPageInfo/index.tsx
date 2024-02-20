import { useAppContext } from "@/contexts/appContext";
import testImg from "@/public/loginSidebarImg.png";

import styles from "./appPageInfo.module.scss";
import { CopyOutlined } from "@ant-design/icons";
import copy from "clipboard";
import { useNotificationContext } from "@/contexts/notification";
import { AppIndustries, AppTypesOptions } from "@/constants/options";

interface AppPageInfoProps {}

export default function AppPageInfo({}: AppPageInfoProps) {
  const { currentApp } = useAppContext();
  const { openNotification } = useNotificationContext();

  const handleDomainCopy = () => {
    copy.copy(currentApp?.domain ?? "");
    openNotification("info", "Copied to clipboard.");
  };

  const industry = AppIndustries.find(
    (el) => el.value === currentApp?.industry
  )?.label;

  const type = AppTypesOptions.find(
    (el) => el.value === currentApp?.type
  )?.label;

  return (
    <div className={styles.container}>
      <img width="100%" src={testImg.src} />
      <h1>{currentApp?.name}</h1>
      <p>
        Domain -{" "}
        <span>
          <b>{currentApp?.domain}</b>
        </span>{" "}
        <CopyOutlined onClick={handleDomainCopy} />
      </p>
      <p>
        Industry -{" "}
        <span>
          <b>{industry}</b>
        </span>
      </p>
      <p>
        Type -{" "}
        <span>
          <b>{type}</b>
        </span>
      </p>
    </div>
  );
}
