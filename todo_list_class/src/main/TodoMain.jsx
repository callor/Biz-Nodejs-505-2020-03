import React from "react";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";
import "./TodoMain.css";

/*
함수형 컴포넌트
화살표 함수 형으로 코드가 시작되고
render() 함수 없고 바로 return ()
*/

const TodoMain = ({
  input,
  todoList,
  onCreate,
  onChange,
  onKeyPress,
  onToggle,
  onDelete
}) => {
  return (
    <main className="todoTemplete">
      <div className="title">할일</div>
      <div className="form-controller">
        <TodoForm
          value={input}
          onCreate={onCreate}
          onChange={onChange}
          onKeyPress={onKeyPress}
        />
      </div>
      <div className="todolist-controller">
        <TodoList todoList={todoList} onToggle={onToggle} onDelete={onDelete} />
      </div>
    </main>
  );
};

export default TodoMain;
