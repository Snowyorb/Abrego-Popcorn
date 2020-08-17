import React from "react";
import Login from "./Login";
import Home from "./Home";
import Register from "./Register";
import { Account} from "./Accounts";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";

import "./App.css";

const App = () => {
  return (
    <Account>
      <title>Popcorn</title>
      <Router>
        <Switch>
          <Route exact path="/">
            <Login />
          </Route>
          <Route path="/home">
            <Home />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
        </Switch>
      </Router>
    </Account>
  );
};

export default App;

///backgroundImage: `url("https://wallpapercave.com/wp/wp2863967.gif")`,
// backgroundPosition: 'center', /* Center the image */
//backgroundRepeat: 'repeat', /* Do not repeat the image */
//backgroundColor: '#2a1b3c',}}
