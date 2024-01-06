import MyApis from "@/components/shared/myApis";
import styles from "./home.module.scss";
import RecentlyViewedApis from "@/components/shared/recentlyViewedApis";
import InfoSection from "@/components/shared/infoSection";
import MyFriends from "@/components/shared/friends";
import UserActions from "@/components/shared/userActions";

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
