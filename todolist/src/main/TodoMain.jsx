import React from "react";
import "./TodoMain.css";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";

const TodoMain = ({ value }) => {
  const todoItems = [
    { text: "오늘할일", checked: false },
    { text: "오늘약속", checked: true },
    { text: "과제", checked: false },
    { text: "숙제", checked: true },
    { text: "Home work", checked: false }
  ];

  const todo_insert = () => {
    let item = document.getElementById("item").value;
    todoItems.push({
      text: item,
      checked: false
    });
    // alert(item);
  };

  return (
    <main className="todoTemplete">
      <div className="title">할일</div>
      <div className="form-controller">
        <TodoForm value={value} onClick={todo_insert} />
      </div>
      <div className="todolist-controller">
        <TodoList />
      </div>
    </main>
  );
};

export default TodoMain;
