"use client";
import { useEffect } from "react";
import Link from "next/link";
import { Card, Empty } from "antd";
import { ApiOutlined } from "@ant-design/icons";
import { useAuthContext } from "@/contexts/auth";
import { useAppContext } from "@/contexts/appContext";
import testImg from "@/public/loginSidebarImg.png";

import styles from "./myApps.module.scss";

export default function MyApps() {
  const { currentUser } = useAuthContext();
  const { apps, fetchApps } = useAppContext();

  useEffect(() => {
    if (currentUser) fetchApps();
  }, [currentUser]);

  console.log("apps=>", apps);

  return (
    <Card
      title={
        <>
          My Apps <ApiOutlined />
        </>
      }
    >
      <div className={styles.container}>
        {apps.length ? (
          apps?.map((el) => (
            <Card
              key={el._id}
              className={styles.item}
              type="inner"
              title={el.name}
              extra={<Link href={`/app/${el._id}`}>View</Link>}
            >
              <div className={styles.infoContainer}>
                <div className={styles.appImg}>
                  <img width="100%" src={testImg.src} alt="" />
                </div>
                <div>
                  <p>{el.description ?? "Without description."}</p>
                  <p>{el.industry}</p>
                  <a href="#">{el.domain}</a>
                </div>
              </div>
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
