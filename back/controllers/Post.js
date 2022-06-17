const Post = require('../models/postModel');
const User = require('../models/userModel');
const serviceValidation = require('../validation/serviceValidation');

const service = {
  getPost: async (req, res) => {
    try {
      const post = await Post.find().sort({createdAt: 'DESC'});
      return res.status(200).json(post);
    } catch (error) {
      return res.status(404).json({ error: "donnees introuvable" });
    }
  },
  getSinglePost: async (req, res) => {
    try {
      let { id } = req.params;
      const post = await Post.findById(id).populate('user', "-password").sort({createdAt: 'DESC'});
      if(!post) return res.status(404).json({msg: "donnee introuvable"});
      return res.status(200).json(post);
    } catch (error) {
      return res.status(404).json({ error: "donnees introuvable" })
    }
  },
  addPost: async (req, res) => {
    try {
      const { description } = req.body;
      const image = req.file?.filename;
      const errMsg = serviceValidation(description);
      if(errMsg) return res.status(406).json({ error: errMsg });
      let userId = req.params.id;
      const post = await Post.create({ image, description });
      const userById = await User.findById(userId);
      userById.post.push(post);
      await userById.save();
      return res.status(201).json(post);
    } catch (error) {
      return res.status(400).json({error: error.message});
    }
  },
  deletePost: async (req, res) => {
    try {
      let postId = req.params.id;
      const userDeleted = await Post.findByIdAndDelete(postId);
      if(!userDeleted) return res.status(404).json({ error: "ce service n'existe pas" });
      return res.status(200).json({ msg: "service suprime avec succes" });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}

module.exports = service;