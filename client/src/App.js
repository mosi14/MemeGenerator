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
import API from "./API";

function App() {
  const [message, setMessage] = useState("");
  const [loggedIn, setLoggedIn] = useState(false); // at the beginning, no user is logged in
  const [currentUser, setCurrentUser] = useState([]);
  const [memeList, setMemeList] = useState([]);
  const [imgRule, setImgRule] = useState([]);
  const [dirty, setDirty] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // here you have the user info, if already logged in
        // TODO: store them somewhere and use them, if needed
        var currentUser = await API.getUserInfo();
        setCurrentUser(currentUser);

        setLoggedIn(true);
      } catch (err) {
        console.error(err.error);
      }
    };
    checkAuth();
  }, []);

  const logIn = async (credentials) => {
    try {
      const user = await API.logIn(credentials);
      setLoggedIn(true);
      setMessage({ msg: `Welcome, ${user}!`, type: "success" });
    } catch (err) {
      setMessage({ msg: err, type: "danger" });
    }
  };

  const logOut = async () => {
    await API.logOut();
    setLoggedIn(false);
    // clean up everything
    setMemeList([]);
  };

  useEffect(() => {
    const getMemes = async () => {
      setMemeList([]);
      if (loggedIn) {
        const memes = await API.getAllMemes();
        setMemeList(memes);
        //   setDirty(false);
      } else {
        const memesnoauth = await API.getMemes();
        setMemeList(memesnoauth);
        // setDirty(false);
      }
    };
    getMemes().catch((err) => {
      setMessage({
        msg: "Impossible to load your memes! Please, try again later...",
        type: "danger",
      });
      console.error(err);
    });
  }, [loggedIn]);

  // useEffect(() => {
  //   const getMemes = async () => {
  //     setMemeList([]);
  //     if (dirty) {
  //       const memes = await API.getMemes();
  //       setMemeList(memes);
  //       setDirty(false);
  //     }
  //   };
  //   getMemes().catch((err) => {
  //     setMessage({
  //       msg: "Impossible to load your memes! Please, try again later...",
  //       type: "danger",
  //     });
  //     console.error(err );
  //   });
  // }, [dirty]);

  useEffect(() => {
    const getRules = async () => {
      setImgRule([]);
      if (loggedIn && dirty) {
        const rules = await API.getRules();
        setImgRule(rules);
        setDirty(false);
      }
    };
    getRules().catch((err) => {
      setMessage({
        msg: "Impossible to load your rules! Please, try again later...",
        type: "danger",
      });
      console.error(err);
    });
  }, [loggedIn, dirty]);

  useEffect(() => {
 
  }, [memeList]);
  const deleteMeme = (id) => {
    API.deleteMeme(id)
      .then((data) => {
        if (data === null) {
          // TODO: show success message
          setDirty(true);
          var newMemeList = memeList.filter(ex => ex.id !== id);
          setMemeList(newMemeList);
        }
      })
      .catch((errorObj) => {

        setDirty(false);
      });
  };

  return (
    <Router>
      <>
        <Navak isLoggedIn={loggedIn} logOut={logOut} username={currentUser} />
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <Home
                username={currentUser}
                deleteMeme={deleteMeme}
                isLoggedIn={loggedIn}
                memeList={memeList}
              />
            )}
          />
          <Route
            exact
            path="/generator"
            render={() => (
              <>
                {loggedIn && currentUser.name === "Creator" ? (
                  <Generator imgRule={imgRule} username={currentUser} />
                ) : (
                  ""
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
                  <Redirect to={`/`} />
                ) : (
                  <MyLoginForm logIn={logIn} errMessage={message} />
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
