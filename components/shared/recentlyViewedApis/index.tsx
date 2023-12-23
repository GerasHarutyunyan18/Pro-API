"use client";
import { UserApp } from "@/constants/types";
import { FieldTimeOutlined } from "@ant-design/icons";
import { Card, Empty } from "antd";

import styles from "./recentlyView.module.scss";

export default function RecentlyViewedApis() {
  const myApps: UserApp[] = [
    // {
    //   id: 1,
    //   name: "Revhero",
    //   description: "Some thing.",
    // },
    // {
    //   id: 2,
    //   name: "Cryptopool",
    //   description: "Some thing.",
    // },
    // {
    //   id: 2,
    //   name: "Cryptopool",
    //   description: "Some thing.",
    // },
    // {
    //   id: 2,
    //   name: "Cryptopool",
    //   description: "Some thing.",
    // },
  ];

  return (
    <Card
      title={
        <>
          Recently viewed <FieldTimeOutlined />
        </>
      }
    >
      <div className={styles.container}>
        {myApps.length ? (
          myApps.map((el) => (
            <Card
              className={styles.item}
              type="inner"
              title={el.name}
              extra={<a href="#">See</a>}
            >
              {el.description}
            </Card>
          ))
        ) : (
          <div className={styles.notFoundContainer}>
            <Empty description={"Apps not found."} />
          </div>
        )}
      </div>
    </Card>
  );
}
