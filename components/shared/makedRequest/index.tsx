import styles from "./makedRequest.module.scss";

interface MakedRequestProps {
  el: any;
}

export default function MakedRequest({ el }: MakedRequestProps) {
  const getType = () => {
    switch (el.success) {
      case true:
        return styles.success;
      default:
        return styles.error;
    }
  };

  return (
    <div className={`${styles.container} ${getType()}`}>
      <span>{el.success ? "Successfull" : "With error"}</span>
    </div>
  );
}
