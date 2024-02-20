import MyFriends from "../friends";
import MyApps from "../myApps";
import RecentlyViewedApis from "../recentlyViewedApis";

import styles from "./userActions.module.scss";

export default function UserActions() {
  return (
    <div className={styles.container}>
      <div className={styles.items}>
        <MyApps />
      </div>
      <div className={styles.items}>
        <RecentlyViewedApis />
      </div>
      <div className={styles.items}>
        <MyFriends />
      </div>
    </div>
  );
}
