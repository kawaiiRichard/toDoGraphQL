import styles from "./ToDoCell.module.css";

import checked from "../../assets/svg/checkbox-check.svg";
import unchecked from "../../assets/svg/checkbox-unchecked.svg";
import cross from "../../assets/svg/cross.svg";
import { useState } from "react";

import EditTitle from "./EditTitle/EditTitle";

function ToDoCell({ title, completed, onDelete, onUpdate }) {
  const [completeStatus, setCompleteStatus] = useState(completed);
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(title);

  const changeCompleteStatus = () => {
    setCompleteStatus(!completeStatus);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleInputChange = (e) => {
    setNewTitle(e.target.value);
  };

  const handleBlur = () => {
    setIsEditing(false);
    onUpdate(newTitle);
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
          onClick={changeCompleteStatus}
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
        <img onClick={onDelete} className={styles.cross} src={cross} alt="" />
      </div>
    </>
  );
}

export default ToDoCell;
