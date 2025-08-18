import styles from "./ToDoList.module.css";

import ToDoCell from "../ToDoCell/ToDoCell";
import TotalCount from "../TotalCount/TotalCount";
import { useQuery, useMutation } from "@apollo/client";
import {
  ALL_TODO,
  UPDATE_TODO,
  DELETE_TODO,
} from "../../apollo/graphql/queries";

function ToDoList() {
  const { loading, error, data } = useQuery(ALL_TODO);
  const [updateTodo, { error: updateError }] = useMutation(UPDATE_TODO);

  const [deleteTodo, { error: deleteError }] = useMutation(DELETE_TODO, {
    update(cache, { data: { removeTodo } }) {
      cache.modify({
        fields: {
          allTodos(currentTodos = []) {
            return currentTodos.filter(
              (todo) => todo.__ref !== `Todo:${removeTodo.id}`
            );
          },
        },
      });
    },
  });

  if (loading) {
    return "Загрузка данных";
  }

  if (error || updateError || deleteError) {
    return <div className={styles.error}>Ошибка</div>;
  }

  return (
    <>
      {data.todos.map((item) => (
        <ToDoCell
          key={item.id}
          id={item.id}
          onToggle={updateTodo}
          onDelete={deleteTodo}
          title={item.title}
          completed={item.completed}
        />
      ))}

      <TotalCount length={data.todos.length} />
    </>
  );
}

export default ToDoList;
