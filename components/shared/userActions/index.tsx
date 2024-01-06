import MyFriends from "../friends";
import MyApis from "../myApis";
import RecentlyViewedApis from "../recentlyViewedApis";

import styles from "./userActions.module.scss";

export default function UserActions() {
  return (
    <div className={styles.container}>
      <div className={styles.items}>
        <MyApis />
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
