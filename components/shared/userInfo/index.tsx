import UserActions from "../userActions";
import UserCard from "../userCard";
import UserInfoSection from "../userInfoSection";

import styles from "./userInfo.module.scss";

export default function UserInfo() {
  return (
    <div className={styles.container}>
      <div className={styles.topContainer}>
        <UserCard />
        <UserInfoSection />
      </div>
      <div className={styles.bottomContainer}>
        <UserActions />
      </div>
    </div>
  );
}
