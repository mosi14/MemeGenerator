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
import Generator from "./components/generator";
import { MyLoginForm } from "./components/logIn";
import API from './API';

function App() {
  const [errMessage, seterrMessage] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedUsername, setLoggedUsername] = useState('');

  const logIn = async (credentials) => {
    try {
      const username = await API.logIn(credentials);
      setLoggedUsername(username);
      seterrMessage('');
      setIsLoggedIn(true);
    } catch (err) {
      seterrMessage(err);
    }
  }

  const logOut = async () => {
    await API.logOut();
    setIsLoggedIn(false);
    setLoggedUsername('');
  }

  return (
    <Router>
      <>
        <Navak  isLoggedIn={isLoggedIn} logOut={logOut} username={loggedUsername} />
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
                  <Generator />
                )}
              </>
            )}
          />

          <Route
            exact
            path="/login"
            render={() => (
              <>
                {isLoggedIn ? (
                  <Redirect to={`/Administrator`} />
                ) : (
                  // <MyLoginForm />
                  <MyLoginForm logIn={logIn} errMessage={errMessage} seterrMessage={seterrMessage} />
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
