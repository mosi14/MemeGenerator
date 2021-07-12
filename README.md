# Exam #2: "Meme generator"
## Student: s289832 ASADOLLAHY MOSTAFA 

## React Client Application Routes

- Route `/login`: Shows the login page in order to login by username and password
- Route `/generator`: Create new meme 
- Route `/`: page content 


## API Server

- POST `/api/login`
  - request parameters and request body content
  - response body content
- POST /api/logout
  - request parameters: 
  - response body content: clears token cookie
- GET `/api/rule`
  - request parameters
  - response body content
  - - GET `/api/allMemeList`
  - request parameters
  - response body content
  - - GET `/api/memeList`
  - request parameters
  - response body content
- POST `/api/create`
  - request parameters and request body content
  - response body content
- DELETE `/api/meme/:id`


## Database Tables

- Table `users` - contains id, username, password, name
- Table `imgRule` - contains imgId, rId,position1x,position1y, position2x, position2y,position3x,position3y,numTxt
- Table `memeList` - contains id, imgid, txtColor, txtFont, title, text1, text2, text3, userId, privacy

## Main React Components

- `meme` (in `meme.js`): component it will be use to show the meme to users
- `generator` (in `generator.js`): component use for create new meme
- ...

(only _main_ components, minor ones may be skipped)

## Screenshot

![Configurator Screenshot](/home.jpg)

![Configurator Screenshot](/generator.jpg)

## Users Credentials

- Mosi, 1234 
- Creator, 1234 
