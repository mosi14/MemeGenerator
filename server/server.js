'use strict';

const express = require('express');
const morgan = require ('morgan');
const dao = require('./dao'); // module for accessing the DB
const passport = require('passport'); // auth middleware
const LocalStrategy = require('passport-local').Strategy; // username and password for login
const session = require('express-session'); // enable sessions


passport.use(new LocalStrategy((username, password, done) => {
  /* HERE I HAVE TO IMPLEMENT THE FUNCTION WHO RETRIEVE THE LOGIN ON THE DB */
  dao.getUser(username, password).then(user => {
    if (!user) {
      done(null, false, { message: 'Incorrect username and/or password' });
    }
    else {
      done(null, user);
    }
  }).catch(err => {
    done(err);
  });
}
));


/*** Set up Passport ***/
// set up the "username and password" login strategy
// by setting a function to verify username and password
// passport.use(new LocalStrategy(
//   function (username, password, done) {
//     userDao.getUser(username, password).then((user) => {
//       if (!user)
//         return done(null, false, { message: 'Incorrect username and/or password.' });

//       return done(null, user);
//     })
//   }
// ));

// serialize and de-serialize the user (user object <-> session)
// we serialize the user id and we store it in the session: the session is very small in this way
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// starting from the data in the session, we extract the current (logged-in) user
passport.deserializeUser((id, done) => {
  dao.getUserById(id)
    .then(user => {
      done(null, user); // this will be available in req.user
    }).catch(err => {
      done(err, null);
    });
});


// init express
const app = new express();
const port = 3001;

// custom middleware: check if a given request is coming from an authenticated user
const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated())
    return next();

  return res.status(401).json({ error: 'Not authenticated' });
}

// set up the session
app.use(session({
  // by default, Passport uses a MemoryStore to keep track of the sessions
  secret: '- lorem ipsum dolor sit amet -',
  resave: false,
  saveUninitialized: false
}));

// then, init passport
app.use(passport.initialize());
app.use(passport.session());


// Login --> POST /sessions
app.post('/api/sessions', function (req, res, next) {
  passport.authenticate('local', (err, user, info) => {
    if (err)
      return next(err);
    if (!user) {
      // display wrong login messages
      return res.status(401).json(info);
    }
    // success, perform the login
    req.login(user, (err) => {
      if (err)
        return next(err);

      // req.user contains the authenticated user, we send all the user info back
      // this is coming from userDao.getUser()
      return res.json(req.user);
    });
  })(req, res, next);
});

// Logout --> DELETE /sessions/current 
app.delete('/api/sessions/current', (req, res) => {
  req.logout();
  res.end();
});

app.get('/api/sessions/current', (req, res) => {
  if(req.isAuthenticated()) {
    res.status(200).json(req.user);}
  else
    res.status(401).json({error: 'Unauthenticated user!'});;
});



// GET /api/tasks - handles also filter=? query parameter
// app.get('/api/memeList', 
//  // isLoggedIn, 
//   [ ], 
//   (req, res) => {
//   // get tasks that match optional filter in the query
//   dao.listPublicMemes()
//     .then(memeslist => res.json(memeslist))
//     .catch(() => res.status(500).end());
// });

// GET /api/courses
app.get('/api/memeList', (req, res) => {
  dao.listPublicMemes()
    .then(memeslist => res.json(memeslist))
    .catch(() => res.status(500).end());
});


// GET /api/courses
app.get('/api/allMemeList',isLoggedIn,  (req, res) => {
  dao.listAllMemes()
    .then(memeslist => res.json(memeslist))
    .catch(() => res.status(500).end());
});

// activate the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});