import React from "react";
import "./TodoForm.css";

const TodoForm = ({ value, onCreate, onChange, onKeyPress }) => {
  return (
    <div className="form">
      <input
        id="item"
        value={value}
        onChange={onChange}
        onKeyPress={onKeyPress}
      />

      <div className="todo-insert" onClick={onCreate}>
        추가
      </div>
    </div>
  );
};

export default TodoForm;
