import styles from "./ToDoCell.module.css";

import checked from "../../assets/svg/checkbox-check.svg";
import unchecked from "../../assets/svg/checkbox-unchecked.svg";
import cross from "../../assets/svg/cross.svg";
import { useState } from "react";
import { useMutation } from "@apollo/client";

import EditTitle from "./EditTitle/EditTitle";
import { UPDATE_TITLE } from "../../apollo/graphql/queries";

function ToDoCell({ id, title, completed, onDelete, onUpdate, onToggle }) {
  const [completeStatus, setCompleteStatus] = useState(completed);
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(title);

  const [updateTitle, { error }] = useMutation(UPDATE_TITLE);

  const changeCompleteStatus = () => {
    setCompleteStatus(!completeStatus);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleInputChange = (e) => {
    setNewTitle(e.target.value);
  };

  const handleBlur = async () => {
    setIsEditing(false);
    if (newTitle !== title) {
      try {
        await updateTitle({
          variables: {
            id,
            title: newTitle,
          },
        });
        onUpdate(newTitle);
      } catch (err) {
        console.error("Failed to update title:", err);
        setNewTitle(title);
      }
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleBlur();
    }
  };

  return (
    <>
      <div className={styles.main}>
        <img
          className={styles.img}
          src={completeStatus ? checked : unchecked}
          alt=""
          onClick={() => {
            changeCompleteStatus();
            onToggle({
              variables: {
                id,
                completed: !completed,
              },
            });
          }}
        />
        {isEditing ? (
          <EditTitle
            newTitle={newTitle}
            handleInputChange={handleInputChange}
            handleBlur={handleBlur}
            handleKeyDown={handleKeyDown}
          />
        ) : (
          <div className={styles.title} onClick={handleEditClick}>
            {title}
          </div>
        )}
        <img
          onClick={() =>
            onDelete({
              variables: {
                id,
              },
            })
          }
          className={styles.cross}
          src={cross}
          alt=""
        />
      </div>
    </>
  );
}

export default ToDoCell;
