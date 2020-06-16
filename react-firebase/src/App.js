import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import BBsMain from "./bbs/BBsMain";
import BBsWrite from "./bbs/BBsWrite";
import MainMenu from "./bbs/MainMenu";

function App() {
  const header_style = {
    marginBottom: 0,
    backgroundColor: "green",
    color: "white",
  };

  /*
    exact 또는 exact={true} 는 / 가 포함된 url이 아니라 
    정확히/ 로 들어왔을 때만 해당 컴포넌트를 그려주게 해주는 것이다. 
    이것을 안해주면 /about /posts 등등 다른 url에서도 / 을 포함하고 있기 때문에 
    의도치 않게 함께 그려지는 것을 방지해야 한다.

    BBsWrite를 insert와 update에서 모두 사용하기 위해
    Switch로 묶고 path varriable을 설정한다.


  */
  return (
    <div className="container-fluid">
      <header style={header_style} className="jumbotron text-center">
        <h2>REACT BBS 2020</h2>
        <p>React &amp; Firebase BBS</p>
      </header>
      <Router>
        <MainMenu />
        <Route exact path="/" component={BBsMain} />
        <Switch>
          <Route path="/bbsWrite/:seq" component={BBsWrite} />
          <Route path="/bbsWrite/" component={BBsWrite} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
