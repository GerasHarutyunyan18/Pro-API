import { useApiContext } from "@/contexts/apiContext";
import { getValueTypeColor } from "@/constants/functions";
import { ValueTypes } from "@/constants/enums";

import styles from "./paramTabView.module.scss";

interface ParamTabViewProps {
  id: string;
}

export default function ParamTabView({ id }: ParamTabViewProps) {
  const { getById } = useApiContext();
  const api = getById(id);

  return (
    <div className={styles.container}>
      Parameters
      <div>
        {api?.params.map((el) => {
          return (
            <div className={styles.item}>
              <p className={styles.name}>
                {el.name}{" "}
                <span
                  style={{ color: getValueTypeColor(el?.type as ValueTypes) }}
                >
                  {el.type}
                </span>
              </p>
              <span className={styles.descriptionTitle}>Description</span>
              <p className={styles.description}>
                {el?.description ?? "No description"}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
