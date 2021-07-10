import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import React, { useState, useEffect } from "react";
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
  const [dirty, setDirty] = useState(true);
  const [message, setMessage] = useState('');
  const [loggedIn, setLoggedIn] = useState(false); // at the beginning, no user is logged in
  const [currentUser, setCurrentUser] = useState([]);
  const [memeList, setMemeList] = useState([]);

  useEffect(()=> {
    const checkAuth = async() => {
      try {
        // here you have the user info, if already logged in
        // TODO: store them somewhere and use them, if needed
        var currentUser = await API.getUserInfo();
        setCurrentUser(currentUser);
        console.log(currentUser.name);
       
        setLoggedIn(true);
      } catch(err) {
        console.error(err.error);
      }
    };
    checkAuth();
  }, []);


  const logIn = async (credentials) => {
    try {
      const user = await API.logIn(credentials);
      setLoggedIn(true);
      setMessage({msg: `Welcome, ${user}!`, type: 'success'});
    } catch(err) {
      setMessage({msg: err, type: 'danger'});
    }
  }

  const logOut = async () => {
    await API.logOut();
    setLoggedIn(false);
    // clean up everything
    setMemeList([]);
  }

  useEffect(()=> {
    const getMemes = async () => {
      if(loggedIn) {
        const memes = await API.getMemes();
        setMemeList(memes);
        setDirty(true);
      }
    };
    getMemes()
      .catch(err => {
        setMessage({msg: "Impossible to load your exams! Please, try again later...", type: 'danger'});
        console.error(err);
      });
  }, [loggedIn]);

  return (
    <Router>
      <>
        <Navak  isLoggedIn={loggedIn} logOut={logOut} username={currentUser} />
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <>{loggedIn ? <Redirect to={`/admin`} /> : <Home memeList={memeList}/>}</>
            )}
          />
          <Route
            exact
            path="/generator"
            render={() => (
              <>
                {loggedIn ? (
                  <Redirect to={`/admin`} />
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
                {loggedIn ? (
                  <Redirect to={`/admin`} />
                ) : (
                  <MyLoginForm logIn={logIn} errMessage={message}  />
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
