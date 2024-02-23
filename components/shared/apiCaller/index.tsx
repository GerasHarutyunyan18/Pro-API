import { useApiContext } from "@/contexts/apiContext";
import styles from "./apiCaller.module.scss";

interface ApiCallerProps {
  id: string;
}

export default function ApiCaller({ id }: ApiCallerProps) {
  const { getById } = useApiContext();
  return <div className={styles.container}></div>;
}
