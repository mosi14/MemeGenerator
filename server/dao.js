"use strict";

const db = require("./db");
const bcrypt = require("bcrypt");

exports.getUserById = (id) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM users WHERE id = ?";
    db.get(sql, [id], (err, row) => {
      if (err) reject(err);
      else if (row === undefined) resolve({ error: "User not found." });
      else {
       
        const user = { id: row.id, username: row.username, name: row.name };
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
       
        bcrypt.compare(password, row.password).then((result) => {
          if (result) resolve(user);
          else resolve(false);
        });
      }
    });
  });
};

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

        resolve(rows);
      }
    });
  });
};

// get all meme for user creator
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
       
        resolve(rows);
      }
    });
  });
};

// get the meme identified by {id}
exports.getMeme = (id) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM memeList WHERE id = ?";
    db.get(sql, [id], (err, row) => {
      if (err) {
        reject(err);
        return;
      }
      if (row == undefined) {
        resolve({ error: "There is not eny meme." });
      } else {
        resolve(row);
      }
    });
  });
};

// get all meme for user creator
exports.ImgRule = () => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM imgRule";
    db.all(sql, (err, rows) => {
      if (err) {
        reject(err);
        return;
      }
      if (rows == undefined) {
        console.log("sacasca");
        resolve({ error: "There is not any meme." });
      } else {

        resolve(rows);
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
        resolve(true);
      }
    );
  });
};

// delete an existing meme by user who created the meme
exports.deleteMeme = (id, userId) => {
  return new Promise((resolve, reject) => {
    console.log(`user id: ${userId} id: ${id}`);
    const sql = "DELETE FROM memeList WHERE id = ? and userId = ? ";
    db.run(sql, [id, userId], (err) => {
      if (err) {
        reject(err);
        return;
      } else {
        console.log("delete meme dao success!");
        resolve(null);
      };
    });
  });
};
