"use strict";

const express = require("express");
const morgan = require("morgan");
const dao = require("./dao"); // module for accessing the DB
const passport = require("passport"); // auth middleware
const LocalStrategy = require("passport-local").Strategy; // username and password for login
const { check, validationResult } = require("express-validator"); // validation middleware
const session = require("express-session"); // enable sessions

passport.use(
  new LocalStrategy((username, password, done) => {
    console.log("local strategy");
    /* HERE I HAVE TO IMPLEMENT THE FUNCTION WHO RETRIEVE THE LOGIN ON THE DB */
    dao
      .getUser(username, password)
      .then((user) => {
        if (!user) {
          done(null, false, { message: "Incorrect username and/or password" });
        } else {
          done(null, user);
        }
      })
      .catch((err) => {
        done(err);
      });
  })
);

// serialize and de-serialize the user (user object <-> session)
// we serialize the user id and we store it in the session: the session is very small in this way
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// starting from the data in the session, we extract the current (logged-in) user
passport.deserializeUser((id, done) => {
  console.log(`deserilize ${id}`);
  dao
    .getUserById(id)
    .then((user) => {
      done(null, user); // this will be available in req.user
    })
    .catch((err) => {
      done(err, null);
    });
});

const errorFormatter = ({ location, msg, param, value, nestedErrors }) => {
  // Format express-validate errors as strings
  return `${location}[${param}]: ${msg}`;
};

// init express
const app = new express();
const port = 3001;

// set-up the middlewares
app.use(morgan("dev"));
app.use(express.json());

// custom middleware: check if a given request is coming from an authenticated user
const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) return next();

  return res.status(401).json({ error: "Not authenticated" });
};

// set up the session
app.use(
  session({
    // by default, Passport uses a MemoryStore to keep track of the sessions
    secret: "- lorem ipsum dolor sit amet -",
    resave: false,
    saveUninitialized: false,
  })
);

// then, init passport
app.use(passport.initialize());
app.use(passport.session());

/*** Users APIs ***/

// POST /sessions
// login
app.post("/api/sessions", function (req, res, next) {
  console.log("server -> api/session");
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      console.log(err);
      return next(err);
    }
    if (!user) {
      console.log(`user does not exist ${user}`);
      // display wrong login messages
      return res.status(401).json(info);
    }
    // success, perform the login
    req.login(user, (err) => {
      if (err) return next(err);

      // req.user contains the authenticated user, we send all the user info back
      // this is coming from userDao.getUser()
      return res.json(req.user);
    });
  })(req, res, next);
});

// Logout --> DELETE /sessions/current
app.delete("/api/sessions/current", (req, res) => {
  req.logout();
  console.log("servetlpgout");


  
  res.end();
});

app.get("/api/sessions/current", (req, res) => {
  console.log("api/sessionssss");
  if (req.isAuthenticated()) {
    res.status(200).json(req.user);
  } else res.status(401).json({ error: "Unauthenticated user!" });
});

/*** Meme List APIs ***/

// GET /api/memePubliclist
app.get("/api/memeList", (req, res) => {
  dao
    .listPublicMemes()
    .then((memeslist) => {
      res.json(memeslist);
    })
    .catch(() => res.status(500).end());
});

// GET /api/memeAllList
app.get("/api/allMemeList", isLoggedIn, (req, res) => {
  dao
    .listAllMemes()
    .then((memeslist) => res.json(memeslist))
    .catch(() => res.status(500).end());
});

// GET /api/meme/<id>
app.get('/api/meme/:id', async (req, res) => {
  try {
    const result = await dao.getMeme(req.params.id);
    if(result.error)
      res.status(404).json(result);
    else
      res.json(result);
  } catch(err) {
    res.status(500).end();
  }
});

// DELETE /api/exams/<id>
app.delete('/api/meme/:id', isLoggedIn, async (req, res) => {
  try {
    await dao.deleteMeme(req.params.id, req.user.id);
    res.status(204).end();
  } catch(err) {
    res.status(503).json({ error: `Database error during the deletion of exam ${req.params.code}.`});
  }
});


// Post /api/create
app.post("/api/create", async (req, res) => {
  console.log("/api/create");
  console.log(req.body);
  try {
    const meme = {
      imgId: req.body.imgId,
      txtColor: req.body.txtColor,
      txtFont: req.body.txtFont,
      title: req.body.title,
      text1: req.body.text1,
      text2: req.body.text2,
      text3: req.body.text3,
      privacy: req.body.privacy,
      //userId: req.user.id, // WARN: user id in the req.body.user does not mean anything because the loggedIn user can change only its owns
    };
    await dao.generateMeme(meme);
    res.status(201).end();
  } catch (err) {
    console.log("error 500 " + err);
    res.status(500).end();
  }
});

// activate the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
