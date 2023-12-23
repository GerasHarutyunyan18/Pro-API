"use client";
import { UserApp } from "@/constants/types";
import { Card, Empty } from "antd";
import { UserOutlined } from "@ant-design/icons";

import styles from "./friends.module.scss";

export default function MyFriends() {
  const myApps: UserApp[] = [
    {
      id: 1,
      name: "Revhero",
      description: "Revhero is a smm automation system.",
    },
    {
      id: 2,
      name: "Revhero",
      description: "Revhero is a smm automation system.",
    },
    {
      id: 3,
      name: "Revhero",
      description: "Revhero is a smm automation system.",
    },
    {
      id: 4,
      name: "Revhero",
      description: "Revhero is a smm automation system.",
    },
    {
      id: 5,
      name: "Revhero",
      description: "Revhero is a smm automation system.",
    },
    {
      id: 6,
      name: "Revhero",
      description: "Revhero is a smm automation system.",
    },
    {
      id: 7,
      name: "Revhero",
      description: "Revhero is a smm automation system.",
    },
  ];
  return (
    <Card
      title={
        <>
          Friends <UserOutlined />
        </>
      }
    >
      <div className={styles.container}>
        {[].length ? (
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