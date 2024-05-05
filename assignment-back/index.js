const app = require("./app");
const db = require("./config/db");
require("dotenv").config();
const ws = require('ws');


const port = process.env.PORT || 3030;

const server = app.listen(port, () => {
  console.log("Server Listening on Port http://localhost:" + port);
});


  // read username and id form the cookie for this connection
  // const cookies = req.headers;
  // console.log(cookies);

  // if (cookies) {
  //   const userId  = cookies.split(';')[1].split('=')[1];
  //   const username = cookies.split(';')[0].split('}')[0].split('=')[1];
    
  //   console.log(userId+" -> "+username)
  //   connection.userId = userId;
  //   connection.username = username;
  // }
  
