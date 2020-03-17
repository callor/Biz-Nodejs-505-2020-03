import React from "react";
import Nav from "./Nav";
import LayoutBody from "./LayoutBody";
import "./LayoutMain.css";

const LayoutMain_01 = () => {
  return (
    <div>
      <header>
        <h2>MY BOOK</h2>
      </header>
      <Nav />
      <LayoutBody />
    </div>
  );
};

export default LayoutMain_01;
