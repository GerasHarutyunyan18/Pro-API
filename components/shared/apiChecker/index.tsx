"use client";
import { useApiContext } from "@/contexts/apiContext";
import styles from "./apiChecker.module.scss";
import ApiCheckerItem from "../apiCheckerItem";

export default function ApiChecker() {
  const { apis } = useApiContext();

  return (
    <div className={styles.container}>
      <h3>Chek API`s (recomended)</h3>
      {apis.map((el) => (
        <ApiCheckerItem id={el._id} />
      ))}
    </div>
  );
}
