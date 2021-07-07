import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Home from "./components/home";
import Navak from "./components/nav";
import Generator from './components/generator';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <Router>
      <>
        <Navak />
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <>{isLoggedIn ? <Redirect to={`/Administrator`} /> : <Home />}</>
            )}
          />
          <Route
            exact
            path="/generator"
            render={() => (
              <>
                {isLoggedIn ? (
                  <Redirect to={`/Administrator`} />
                ) : (
                  <Generator/>
                )}
              </>
            )}
          />
        </Switch>
      </>
    </Router>
  );
}

export default App;
