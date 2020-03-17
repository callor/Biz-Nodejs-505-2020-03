import React from "react";
import "./App.css";
import TodoMain from "./main/TodoMain";
import TodoForm from "./main/TodoForm";

function App() {
  return <TodoMain form={<TodoForm value="오늘할일" />}></TodoMain>;
}

export default App;
