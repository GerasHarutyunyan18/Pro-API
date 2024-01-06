import ProfileSidebar from "@/components/shared/profileSidebar";

import styles from "./profile.module.scss";
import ProfileContent from "@/components/shared/profileContent";

export default function Profile() {
  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        <ProfileSidebar />
        <ProfileContent/>
      </div>
    </div>
  );
}
