import styles from "./ToDo.module.css";

import InputToDo from "../InputToDo/InputToDo";
import ToDoCell from "../ToDoCell/ToDoCell";
import { useState } from "react";

function ToDo() {
  const toDo1 = {
    id: 1,
    title: "Поесть",
    isComplete: true,
  };

  const toDo2 = {
    id: 2,
    title: "Поспать",
    isComplete: true,
  };

  const [toDosArr, setToDosArr] = useState([toDo1, toDo2]);
  const [newToDoTitle, setNewToDoTitle] = useState("");

  const addNewToDo = () => {
    if (newToDoTitle.trim() === "") return;

    const newToDo = {
      id: toDosArr.length + 1,
      title: newToDoTitle,
      isComplete: false,
    };

    setToDosArr([...toDosArr, newToDo]);
    setNewToDoTitle("");
  };

  const deleteToDo = (id) => {
    setToDosArr(toDosArr.filter((item) => item.id !== id));
  };

  const updateToDoTitle = (id, newTitle) => {
    setToDosArr(
      toDosArr.map((item) =>
        item.id === id ? { ...item, title: newTitle } : item
      )
    );
  };

  return (
    <>
      <div className={styles.main}>
        <InputToDo
          onClick={addNewToDo}
          newToDoTitle={newToDoTitle}
          setNewToDoTitle={setNewToDoTitle}
        />
        {toDosArr.map((item) => (
          <ToDoCell
            key={item.id}
            title={item.title}
            isComplete={item.isComplete}
            onDelete={() => deleteToDo(item.id)}
            onUpdate={(newTitle) => updateToDoTitle(item.id, newTitle)}
          />
        ))}
      </div>
    </>
  );
}

export default ToDo;
