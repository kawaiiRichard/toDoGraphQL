import "./ToDoList.module.css";

import ToDoCell from "../ToDoCell/ToDoCell";
import TotalCount from "../TotalCount/TotalCount";
import { useQuery } from "@apollo/client";
import { ALL_TODO } from "../../apollo/graphql/queries";

function ToDoList() {
  const { loading, error, data } = useQuery(ALL_TODO);

  if (loading) {
    return "Загрузка данных";
  }

  if (error) {
    return `Ошибка: ${error.message}`;
  }

  return (
    <>
      {data.todos.map((item) => (
        <ToDoCell key={item.id} title={item.title} completed={item.completed} />
      ))}

      <TotalCount length={data.todos.length} />
    </>
  );
}

export default ToDoList;
