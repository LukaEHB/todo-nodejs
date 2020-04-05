const fs = require('fs');
const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(__dirname+'/public'));

console.log('hello world');

app.listen(PORT, ()=>{
  console.log("server is running on localhost:"+PORT);
})