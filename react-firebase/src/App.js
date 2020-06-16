import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import BBsMain from "./bbs/BBsMain";
import BBsWrite from "./bbs/BBsWrite";
import MainMenu from "./bbs/MainMenu";

function App() {
  const header_style = {
    marginBottom: 0,
    backgroundColor: "green",
    color: "white",
  };

  return (
    <div className="container-fluid">
      <header style={header_style} className="jumbotron text-center">
        <h2>REACT BBS 2020</h2>
        <p>React &amp; Firebase BBS</p>
      </header>
      <Router>
        <MainMenu />
        <Route exact path="/" component={BBsMain} />
        <Route path="/bbs" component={BBsWrite} />
      </Router>
    </div>
  );
}

export default App;
