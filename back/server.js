const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
require('dotenv').config();

// middleware
app.use(cors());
app.use(express.json());

// deployement
app.use(express.static(path.join(__dirname, '..',"build")))

app.get('*', function (req, res) {app.use(express.json());

  res.sendFile(path.join(__dirname, '..',"build",'index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("Server is up on port " + port);
});