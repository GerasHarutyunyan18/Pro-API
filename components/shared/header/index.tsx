import { DashboardOutlined, HomeOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import Icon from "./../../../public/icon.svg";

import styles from "./header.module.scss";

export default function Header() {
  return (
    <div className={styles.container}>
      <div className={styles.leftSide}>
        <img className={styles.logo} src={Icon.src} />
        <div className={styles.headerItem}>
          <a>Home <HomeOutlined/></a>
        </div>
        <div className={styles.headerItem}>
          <a>About <QuestionCircleOutlined/></a>
        </div>
        <div className={styles.headerItem}>
          <a>Dashboard <DashboardOutlined/></a>
        </div>
      </div>
    </div>
  );
}
