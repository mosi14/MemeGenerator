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
        // by default, the local strategy looks for "username": not to create confusion in server.js, we can create an object with that property
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
        // check the hashes with an async call, given that the operation may be CPU-intensive (and we don't want to block the server)
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
        console.log(rows);
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
        console.log(rows);
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
