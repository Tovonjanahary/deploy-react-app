const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const postSchema = new Schema({
  image: {
    type: String, 
    default: "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
  },
  description: {
    type: String,
    required: true
  },
  commentaire: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Commentaire'
    },
  ]
}, { timestamps: true });

const Post = mongoose.model('Post', postSchema);

module.exports = Post;