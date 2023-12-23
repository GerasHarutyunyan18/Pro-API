import MyApis from "@/components/shared/myApis";
import styles from "./home.module.scss";
import RecentlyViewedApis from "@/components/shared/recentlyViewedApis";
import InfoSection from "@/components/shared/infoSection";
import MyFriends from "@/components/shared/friends";

export default function Home() {
  return (
    <div>
      <InfoSection />
      <div className={styles.topContainer}>
        <div className={styles.items}>
          <MyApis />
        </div>
        <div className={styles.items}>
          <RecentlyViewedApis />
        </div>
        <div className={styles.items}>
          <MyFriends/>
        </div>
      </div>
    </div>
  );
}
