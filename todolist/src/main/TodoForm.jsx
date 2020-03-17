import React from "react";
import "./TodoForm.css";

const TodoForm = ({ value, todoList }) => {
  const todo_insert = () => {
    let item = document.getElementById("item").value;
    // todoList.push({
    //   text: item,
    //   checked: false
    // });
    // // alert(item);
  };
  return (
    <div className="form">
      <input id="item" type="text" value={value}></input>
      <div className="todo-insert" onClick={todo_insert}>
        추가
      </div>
    </div>
  );
};

export default TodoForm;
