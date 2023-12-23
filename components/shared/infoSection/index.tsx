import styles from "./infoSection.module.scss";

export default function InfoSection() {
  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        <div className={styles.infoSection}>
          <h2>Pro API</h2>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
          </p>
        </div>
      </div>
    </div>
  );
}
