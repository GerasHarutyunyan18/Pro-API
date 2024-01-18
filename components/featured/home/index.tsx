import InfoSection from "@/components/shared/infoSection";
import UserActions from "@/components/shared/userActions";

import styles from "./home.module.scss";

export default function Home() {
  return (
    <div className={styles.container}>
      <InfoSection />
      <div className={styles.actions}>
        <UserActions />
      </div>
    </div>
  );
}
