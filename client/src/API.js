import Meme from "./classes/Meme";


async function logIn(credentials) {
  let response = await fetch(`/api/sessions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });
  if (response.ok) {
    console.log("Ok api client");
    const user = await response.json();
    return user.username;
  } else {
    console.log(response);
    try {
      const errDetail = await response.json();
      throw errDetail.message;
    } catch (err) {
      throw err;
    }
  }
}

async function logOut() {
  await fetch('/api/sessions/current', { method: 'DELETE' });
}

async function getUserInfo() {
  const response = await fetch( 'api/sessions/current');
  const userInfo = await response.json();
  if (response.ok) {
    return userInfo;
  } else {
    throw userInfo;  // an object with the error coming from the server
  }
}




async function getMemes() {
  const response = await fetch("/api/memeList");
  if (!response.ok) throw new Error(response.statusText);
  const memesJson = await response.json();
  //return memesJson.map((m) => Meme.from(m));
  const memes = memesJson.map(
    (l) =>
      new Meme(
        l.id,
        l.imgId,
        l.txtColor,
        l.title,
        l.text1,
        l.text2,
        l.text3,
        l.privacy,
        l.userId,
        l.txtFont,
        l.rId,
        l.position1,
        l.position2,
        l.position3,
        l.numTxt
      )
  );
 return memes;
}

async function getAllMemes() {
  const response = await fetch("/api/allMemeList");
  if (!response.ok) throw new Error(response.statusText);
  const memesJson = await response.json();
  //return memesJson.map((m) => Meme.from(m));
  const memes = memesJson.map(
    (l) =>
      new Meme(
        l.id,
        l.imgId,
        l.txtColor,
        l.title,
        l.text1,
        l.text2,
        l.text3,
        l.privacy,
        l.userId,
        l.txtFont,
        l.rId,
        l.position1,
        l.position2,
        l.position3,
        l.numTxt
      )
  );
 return memes;
}


async function createMeme(params) {
  return new Promise((resolve, reject) => {
      fetch("/api/create", {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: params,
      }).then((response) => {
          if (response.ok) {
              resolve(response.json());
          } else {
              response.json()
                  .then((obj) => { reject(obj); }) // error msg in the response body
                  .catch((err) => { reject({ errors: [{ param: "Application", msg: "Cannot parse server response" }] }) }); // something else
          }
      }).catch((err) => { reject({ errors: [{ param: "Server", msg: "Cannot communicate" }] }) }); // connection errors
  });
}


const API = { logIn, logOut, getMemes, getAllMemes, createMeme, getUserInfo };
export default API;
