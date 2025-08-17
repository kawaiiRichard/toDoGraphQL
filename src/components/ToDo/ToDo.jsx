import styles from "./ToDo.module.css";

import InputToDo from "../InputToDo/InputToDo";
import ToDoList from "../ToDoList/ToDoList";

function ToDo() {
  return (
    <>
      <div className={styles.main}>
        <InputToDo />

        <ToDoList />
      </div>
    </>
  );
}

export default ToDo;
