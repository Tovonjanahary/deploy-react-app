const User = require('../models/userModel');
const userValidation = require('../validation/userValidation');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  });
}

const userController = {
  addUser: async (req, res) => {
    try {
      const { name, firstName, email, birthdate, phone, adresse, password } = req.body;
      const photo = req.file?.filename;
      const errMsg = userValidation(name, firstName, email, birthdate, phone, adresse, password);
      if (errMsg) return res.status(406).json({ error: errMsg });
      const userExist = await User.findOne({ email });
      if (userExist) {
        return res.status(400).json({ error: "cet email existe deja" })
      } else {
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);
        const user = await User.create({ name, firstName, email, photo, birthdate, phone, adresse, password: passwordHash });
        return res.status(201).json({
          _id: user._id,
          name: user.name,
          firstName: user.firstName,
          photo: user.photo,
          token: generateToken(user._id)
        });
      }
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },
  signin: async (req, res) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) return res.status(400).json({ error: "remplissez d'abord la formulaire" });
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ error: "email incorrecte" })
      } else {
        const passwordVerify = await bcrypt.compare(password, user.password);
        if (!passwordVerify) {
          return res.status(400).json({ error: "mot de passe incorrecte" })
        } else {
          return res.status(200).json({
            _id: user._id,
            name: user.name,
            firstName: user.firstName,
            photo: user.photo,
            jobTitle: user.jobTitle,
            token: generateToken(user._id)
          });
        }
      }
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
  getUser: async (req, res) => {
    try {
      const data = await User.find().sort({createdAt: 'DESC'});
      if(!data) return res.status(404).json({ error: "donnee introuvable"});
      return res.status(200).json(data);
    } catch (error) {
      return res.status(404).json("error:" + error.message);
    }
  },
  searchUser: async (req, res) => {
    const keyword = req.query.search
      ? {
        $or: [
          { name: { $regex: req.query.search, $options: 'i' } },
          { email: { $regex: req.query.search, $options: 'i' } },
          { jobTitle: { $regex: req.query.search, $options: 'i' } },
        ]
      }
      :
      {}
    const users = await User.find(keyword);
    return res.status(200).json(users);
  },
  getSingleUser: async (req, res) => {
    try {
      let userId = req.params.id;
      const user = await User.findById(userId, '-password').populate('post').sort({createdAt: 'DESC'});
      if (user) {
        return res.status(200).json(user);
      } else {
        return res.status(404).json({ error: "donnee introuvable" });
      }
    } catch (error) {
      return res.status(404).json({ error: "donnee introuvable" });
    }
  },
  deleteUser: async (req, res) => {
    try {
      const { id } = req.params;
      await User.findByIdAndDelete(id);
      return res.status(200).json({message: "supprime"});
    } catch(error) {
      return res.status(400).json({error: error.message});
    }
  },
  updateUser: async (req, res) => {
    try {
      const { id } = req.params;
      const { name, firstName, email, phone, adresse, birthdate } = req.body;
      if(!name || !firstName || !email || !phone || !adresse || !birthdate) {
        return res.status(406).json({error: "Remplissez la formulaire"});
      }
      const user = await User.findByIdAndUpdate(id, { name, firstName, email, phone, adresse, birthdate }, {
        new: true,
        runValidators:true
      });
      if(!user) {
        return res.status(400).json({error: "une erreur s'est produite"});
      }
      await user.save();
      return res.status(200).json(user);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}

module.exports = userController;