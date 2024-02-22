import { useApiContext } from "@/contexts/apiContext";
import { getMethodColor } from "@/constants/functions";
import ParamTabView from "../paramTabView";
import BodyTab from "../appCreation/bodyTab";

import styles from "./appPageApis.module.scss";

interface AppPageApisProps {
  id: string;
}

export default function AppPageApi({ id }: AppPageApisProps) {
  const { getById } = useApiContext();
  const api = getById(id);


  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <b
          style={{
            background: getMethodColor(api?.method),
            color: "white",
            padding: "4px 8px",
            borderRadius: 5,
          }}
        >
          {api?.method}
        </b>{" "}
        <b>{api?.endpoint}</b>
      </div>
      <div className={styles.content}>
        <ParamTabView id={id} />
        <BodyTab id={id} view />
        {api?.headers.map((el) => {
          return (
            <div key={el.id} className={styles.headerItem}>
              <div className={styles.key}>{el.key}</div>
              <div className={styles.value}>{el.value}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
