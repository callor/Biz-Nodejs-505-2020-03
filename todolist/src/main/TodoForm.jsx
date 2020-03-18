import React from "react";
import "./TodoForm.css";

const TodoForm = ({ value, onClick }) => {
  return (
    <div className="form">
      <input id="item" type="text" value={value}></input>
      <div className="todo-insert" onClick={onClick}>
        추가
      </div>
    </div>
  );
};

export default TodoForm;
