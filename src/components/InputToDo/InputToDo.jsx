import styles from "./InputToDo.module.css";

function InputToDo({ onClick, newToDoTitle, setNewToDoTitle }) {
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onClick();
    }
  };

  return (
    <>
      <div className={styles.main}>
        <input
          className={styles.input}
          type="text"
          placeholder="Введите задание"
          value={newToDoTitle}
          onChange={(e) => setNewToDoTitle(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button onClick={onClick} className={styles.btn}>
          Добавить
        </button>
      </div>
    </>
  );
}

export default InputToDo;
