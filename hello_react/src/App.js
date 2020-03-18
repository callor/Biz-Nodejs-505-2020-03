import React from "react";
import logo from "./logo.svg";
import "./App.css";
// 콤포넌트를 사용하기 위해서 import 하기

import RCC from "./component/RCC";
import RSC from "./component/RSC";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>대한민국만세</p>
        <RCC />
        <RSC />
      </header>
    </div>
  );
}

export default App;
