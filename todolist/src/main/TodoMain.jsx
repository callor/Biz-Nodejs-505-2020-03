import React from "react";
import "./TodoMain.css";

const TodoMain = ({ form, todolist }) => {
  return (
    <main className="todoTemplete">
      <div className="title">할일</div>
      <div className="form-controller">{form}</div>
      <div className="todolist-controller">{todolist}</div>
    </main>
  );
};

export default TodoMain;
