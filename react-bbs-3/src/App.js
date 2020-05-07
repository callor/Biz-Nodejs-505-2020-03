import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import BBsMain from "./bbs/bbsMain";
import BBsWrite from "./bbs/bbsWrite";
import MainNav from "./MainNav";

function App() {
  const header_style = {
    marginBottom: 0,
    backgroundColor: "green",
    color: "white",
  };
  return (
    <div className="container-fluid">
      <header style={header_style} className="jumbotron text-center">
        <h2>MY BBS 2020</h2>
        <p>React &amp; Spring Boot BBS</p>
      </header>
      <Router>
        <MainNav />
        <Route exact path="/" component={BBsMain} />
        <Route path="/bbsWrite" component={BBsWrite} />
      </Router>
    </div>
  );
}

export default App;
