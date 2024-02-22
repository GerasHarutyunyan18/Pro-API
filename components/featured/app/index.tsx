"use client";
import { useEffect, useState } from "react";

import styles from "./app.module.scss";
import { useAppContext } from "@/contexts/appContext";
import AppPageInfo from "@/components/shared/appPageInfo";
import AppPageApi from "@/components/shared/appPageApis";
import { useApiContext } from "@/contexts/apiContext";
import { useRouter } from "next/navigation";

interface AppPageProps {
  id: string;
}

export default function AppPage({ id }: AppPageProps) {
  const { fetchPageApp } = useAppContext();
  const router = useRouter();
  const { apis } = useApiContext();

  const fetchApp = async () => {
    const res = await fetchPageApp(id);
    if (!res) {
      router.push("/404");
    }
  };

  useEffect(() => {
    if (id) {
      fetchApp();
    }
  }, [id]);

  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <AppPageInfo />
      </div>
      <div className={styles.apiContainer}>
        {apis.map((el) => (
          <AppPageApi key={el._id} id={el._id} />
        ))}
      </div>
    </div>
  );
}
