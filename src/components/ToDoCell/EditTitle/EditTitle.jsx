import styles from "./EditTitle.module.css";

function EditTitle({ newTitle, handleInputChange, handleBlur, handleKeyDown }) {
  return (
    <>
      <input
        type="text"
        value={newTitle}
        onChange={handleInputChange}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        className={styles.main}
      />
    </>
  );
}

export default EditTitle;
