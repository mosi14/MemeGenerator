'use strict';

/* Data Access Object (DAO) module for accessing tasks */

const db = require('./db');
const bcrypt = require('bcrypt');

const dayjs = require("dayjs");


// exports.getUser = (username, password) => {
//   return new Promise((resolve, reject) => {
//       const sql = "SELECT * FROM users WHERE username = ?";
//       db.get(sql, [username], (err, row) => 
//           if (err)
//               reject(err);
//           else if (row === undefined)
//               resolve(false);
//           else {
//               bcrypt.compare(password, row.hash)
//                   .then(result => {
//                       if (result)
//                           resolve({ username: row.username });
//                       else
//                           resolve(false);
//                   });
//           }
//       })
//   });

exports.getUser = (username, password) => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM users WHERE username = ?';
      db.get(sql, [username], (err, row) => {
        if (err) {
          reject(err);
        } else if (row === undefined) {
          resolve(false);
        }
        else {
          
          const user = {id: row.id, username: row.username, name: row.name};

          // check the hashes with an async call, given that the operation may be CPU-intensive (and we don't want to block the server)
          bcrypt.compare(password, row.hash).then(result => {
            if(result) 
              resolve(user);
            else
              resolve(false);
          });
        }
    });
  });
};



// WARNING: all DB operations must check that the tasks belong to the loggedIn user, thus include a WHERE user=? check !!!

// get all public meme for user without Auth
exports.listPublicMemes = () => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM memeList WHERE privacy="0"';
    db.all(sql,  (err, rows) => {
      if (err) {
        reject(err);
        return;
      }
      if (rows == undefined) {
        resolve({ error: 'There is not any meme.' });
      } else {
        const memelist = { ...rows }; 
        resolve(memelist);
      }
    });
  });
};

// get all meme for user creator
// get all public meme for user without Auth
exports.listAllMemes = () => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM memeList';
    db.all(sql,  (err, rows) => {
      if (err) {
        reject(err);
        return;
      }
      if (rows == undefined) {
        resolve({ error: 'There is not any meme.' });
      } else {
        const memelist = { ...rows }; 
        resolve(memelist);
      }
    });
  });
};

// get the course identified by {code}
exports.getTask = () => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM Users ';
    db.get(sql, [], (err, row) => {
      if (err) {
        reject(err);
        return;
      }
      if (row == undefined) {
        resolve({ error: 'Task not found.' });
      } else {
        const task = { ...row }; 
        resolve(task);
      }
    });
  });
};


// add a new task
// the task id is added automatically by the DB, and it is returned as result
exports.createTask = (task) => {
  return new Promise((resolve, reject) => {
    const sql = 'INSERT INTO tasks (description, important, private, deadline, completed, user) VALUES(?, ?, ?, ?, ?, ?)';
    db.run(sql, [task.description, task.important, task.private, task.deadline, task.completed, task.user], function (err) {
      if (err) {
        reject(err);
        return;
      }
      resolve(exports.getTask(this.lastID));
    });
  });
};

// update an existing task
exports.updateTask = (user, id, task) => {
  return new Promise((resolve, reject) => {
    const sql = 'UPDATE tasks SET description = ?, important = ?, private = ?, deadline = ?, completed = ? WHERE id = ? and user = ?';
    db.run(sql, [task.description, task.important, task.private, task.deadline, task.completed, id, user], function (err) {
      if (err) {
        reject(err);
        return;
      }
      resolve(exports.getTask(id)); // changed from resolve(exports.getTask(this.lastID) because of error "not found" (wrong lastID)
    });
  });
};

// delete an existing task
exports.deleteTask = (user, id) => {
  return new Promise((resolve, reject) => {
    const sql = 'DELETE FROM tasks WHERE id = ? and user = ?';
    db.run(sql, [id, user], (err) => {
      if (err) {
        reject(err);
        return;
      } else
        resolve(null);
    });
  });
}

