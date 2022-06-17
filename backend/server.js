const express = require('express');
const path = require('path');
require('dotenv').config();
// const userRouter = require('./routes/userRoutes');
// const postRouter = require('./routes/postRoutes');
// const userJobRouter = require('./routes/userJobRoutes');
// const DBConnection = require('./config/DBConnection');
const cors = require('cors');

// connect to the database
// DBConnection();
const app = express();

// middleware
app.use(cors());
app.use(express.json());
// app.use(userRouter);
// app.use(postRouter);
// app.use(userJobRouter)

// deployement
app.use(express.static(path.join(__dirname, '..',"build")))

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, '..',"build",'index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("Server is up on port " + port);
});
