"use strict";

/* Data Access Object (DAO) module for accessing tasks */

const db = require("./db");
const bcrypt = require("bcrypt");

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

exports.getUserById = (id) => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM users WHERE id = ?';
      db.get(sql, [id], (err, row) => {
        if (err) 
          reject(err);
        else if (row === undefined)
          resolve({error: 'User not found.'});
        else {
          // by default, the local strategy looks for "username": not to create confusion in server.js, we can create an object with that property
          const user = {id: row.id, username: row.email, name: row.name}
          resolve(user);
        }
    });
  });
};

exports.getUser = (username, password) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM users WHERE username = ?";
    db.get(sql, [username], (err, row) => {
      if (err) {
        reject(err);
      } else if (row === undefined) {
        resolve(false);
      } else {
        const user = { id: row.id, username: row.username, name: row.name };
        // check the hashes with an async call, given that the operation may be CPU-intensive (and we don't want to block the server)
        bcrypt.compare(password, row.password).then((result) => {
          if (result) resolve(user);
          else resolve(false);
        });
      }
    });
  });
};

// WARNING: all DB operations must check that the tasks belong to the loggedIn user, thus include a WHERE user=? check !!!

// get all public meme for user without Auth
exports.listPublicMemes = () => {
  return new Promise((resolve, reject) => {
    const sql =
      'SELECT * FROM memeList m, imgRule r where m.imgId = r.imgId and privacy="0"';
    db.all(sql, (err, rows) => {
      if (err) {
        reject(err);
        return;
      }
      if (rows == undefined) {
        resolve({ error: "There is not any meme." });
      } else {
        console.log(rows)
        // const memelist = { ...rows };
        // const memeList = rows.map(
        //   (row) =>
        //     {
        //       row.id,
        //       row.imgId,
        //       row.txtColor,
        //       row.title,
        //       row.text1,
        //       row.text2,
        //       row.text3,
        //       row.privacy,
        //       row.userId,
        //       row.txtFont,
        //       row.rId,
        //       row.position1,
        //       row.position2,
        //       row.position3,
        //       row.numTxt}
              
            
        // );
        resolve(rows);
      }
    });
  });
};

// get all meme for user creator
// get all public meme for user without Auth
exports.listAllMemes = () => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM memeList m, imgRule r where m.imgId = r.imgId";
    db.all(sql, (err, rows) => {
      if (err) {
        reject(err);
        return;
      }
      if (rows == undefined) {
        resolve({ error: "There is not any meme." });
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
    const sql = "SELECT * FROM Users ";
    db.get(sql, [], (err, row) => {
      if (err) {
        reject(err);
        return;
      }
      if (row == undefined) {
        resolve({ error: "Task not found." });
      } else {
        const task = { ...row };
        resolve(task);
      }
    });
  });
};

// generate new meme
exports.generateMeme = (meme) => {
  console.log(meme);
  return new Promise((resolve, reject) => {
    const sql =
      "INSERT INTO memeList (imgId, txtColor, title, text1, text2, text3, privacy, userId, txtFont) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)";
    db.run(
      sql,
      [
        meme.imgId,
        meme.txtColor,
        meme.title,
        meme.text1,
        meme.text2,
        meme.text3,
        meme.privacy,
        meme.userId,
        meme.txtFont,
      ],
      function (err) {
        if (err) {
          console.log("generate meme error: " + err);
          reject(err);
          return;
        }
        // resolve(this.changes);
        resolve(true);
      }
    );
  });
};

// exports.uploadFilledSurvey = async (survey, username, adminUsername, IDadminsurvey) => {
//   try {
//       console.log(username)
//       let id = await getMaxIDFilledSurvey();
//       id++;
//       return new Promise((resolve, reject) => {
//           const sql = "INSERT INTO FILLEDSURVEY (USERNAME, JSONSURVEY, IDsurvey, ADMINUSERNAME, IDadminsurvey) VALUES(?, ? ,? ,?, ?)";
//           db.run(sql, [username, survey, id, adminUsername, IDadminsurvey], (err) => {
//               if (err)
//                   reject(err);
//               else
//                   resolve(this.changes);
//           });
//       });
//   } catch (err) {
//       throw (err);
//   }

// }

// update an existing task
exports.updateTask = (user, id, task) => {
  return new Promise((resolve, reject) => {
    const sql =
      "UPDATE tasks SET description = ?, important = ?, private = ?, deadline = ?, completed = ? WHERE id = ? and user = ?";
    db.run(
      sql,
      [
        task.description,
        task.important,
        task.private,
        task.deadline,
        task.completed,
        id,
        user,
      ],
      function (err) {
        if (err) {
          reject(err);
          return;
        }
        resolve(exports.getTask(id)); // changed from resolve(exports.getTask(this.lastID) because of error "not found" (wrong lastID)
      }
    );
  });
};

// delete an existing task
exports.deleteTask = (user, id) => {
  return new Promise((resolve, reject) => {
    const sql = "DELETE FROM tasks WHERE id = ? and user = ?";
    db.run(sql, [id, user], (err) => {
      if (err) {
        reject(err);
        return;
      } else resolve(null);
    });
  });
};

class Meme{
  constructor(id, imgId, txtColor, title, text1, text2, text3, privacy, userId, txtFont, rId,position1, position2,position3,numTxt)
  {
      this.id = id;
      this.imgId = imgId;
      this.txtColor = txtColor;
      this.title = title;
      this.text1 = text1;
      this.text2 = text2;
      this.text3 = text3;
      this.privacy = privacy;
      this.userId = userId;
      this.txtFont = txtFont;
      this.rId = rId;
      this.position1 = position1;
      this.position2 = position2;
      this.position3 = position3;
      this.numTxt = numTxt;
  }
}
