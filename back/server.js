const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const userRouter = require('./routes/userRoutes');
const postRouter = require('./routes/postRoutes');
const userJobRouter = require('./routes/userJobRoutes');
require('dotenv').config();
const DBConnection = require('./config/DBConnection');

// connect to the database
DBConnection();

// middleware
app.use(cors());
app.use(express.json());
app.use(userRouter);
app.use(postRouter);
app.use(userJobRouter);

// deployement
if(process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, '..',"build")));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..',"build",'index.html'));
  });
} else {
  app.get("/", (req, res) => {
    res.send("api is running successfuly");
  })
}

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("Server is up on port " + port);
});