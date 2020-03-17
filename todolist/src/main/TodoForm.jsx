import React from "react";

const TodoForm = ({ value }) => {
  return (
    <div className="form">
      <input type="text" value={value}></input>
    </div>
  );
};

export default TodoForm;
