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
app.use(express.static(path.join(__dirname, '..',"build")))

app.get('*', function (req, res) {app.use(express.json());

  res.sendFile(path.join(__dirname, '..',"build",'index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("Server is up on port " + port);
});