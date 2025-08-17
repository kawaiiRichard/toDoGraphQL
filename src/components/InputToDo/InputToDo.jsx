import { ADD_TODO, ALL_TODO } from "../../apollo/graphql/queries";
import { useMutation } from "@apollo/client";
import styles from "./InputToDo.module.css";
import { useState } from "react";

function InputToDo() {
  const [text, setText] = useState("");
  const [addTodo, { error }] = useMutation(ADD_TODO, {
    update(cache, { data: { newTodo } }) {
      const { todos } = cache.readQuery({ query: ALL_TODO });

      cache.writeQuery({
        query: ALL_TODO,
        data: {
          todos: [newTodo, ...todos],
        },
      });
    },
  });

  const handleAddTodo = () => {
    if (text.trim().length) {
      addTodo({
        variables: {
          title: text,
          completed: false,
          userId: 123,
        },
      });
      setText("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleAddTodo();
    }
  };

  if (error) {
    return `Ошибка: ${error.message}`;
  }

  return (
    <>
      <div className={styles.main}>
        <input
          className={styles.input}
          type="text"
          placeholder="Введите задание"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button onClick={handleAddTodo} className={styles.btn}>
          Добавить
        </button>
      </div>
    </>
  );
}

export default InputToDo;
