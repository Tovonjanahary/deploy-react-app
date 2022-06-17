const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

const protection = async(req, res, next) => {
  let token;
  if(
    req.headers.authorization && 
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      // decoder le token
      const decoded = await jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      return res.status(401).json({error: "vous n'avez pas acces a cet ressource"});
    } 
  } else {
     return res.status(403).json({error: "vous n'avez pas acces a cet ressource"});
  }
}

module.exports = protection;