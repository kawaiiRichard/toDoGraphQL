import styles from "./TotalCount.module.css";

function TotalCount({ length }) {
  return (
    <>
      <div className={styles.text}>Общее количество: {length}</div>
    </>
  );
}

export default TotalCount;

