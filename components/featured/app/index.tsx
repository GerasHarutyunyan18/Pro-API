"use client";
import { useEffect, useState } from "react";

import styles from "./app.module.scss";
import { useAppContext } from "@/contexts/appContext";
import AppPageInfo from "@/components/shared/appPageInfo";
import AppPageApi from "@/components/shared/appPageApis";
import { useApiContext } from "@/contexts/apiContext";

interface AppPageProps {
  id: string;
}

export default function AppPage({ id }: AppPageProps) {
  const { fetchPageApp } = useAppContext();
  const { apis } = useApiContext();

  useEffect(() => {
    if (id) {
      fetchPageApp(id);
    }
  }, [id]);

  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <AppPageInfo />
      </div>
      <div className={styles.apiContainer}>
        {apis.map((el) => (
          <AppPageApi id={el._id} />
        ))}
      </div>
    </div>
  );
}
