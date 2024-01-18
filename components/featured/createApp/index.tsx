import AppInfo from "@/components/shared/appCreation/appInfo";
import styles from "./createApp.module.scss";
import APICreations from "@/components/shared/appCreation/apiCreations";

export default function CreateApp() {
  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <AppInfo />
      </div>
      <div className={styles.apis}>
        <APICreations />
      </div>
    </div>
  );
}
